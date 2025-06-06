import {
    DidDocument as DidDocumentCollection,
    DIDMessage,
    KeyType,
    MessageServer,
    MessageType,
    Policy as PolicyCollection,
    Schema as SchemaCollection,
    Singleton,
    Token,
    Topic,
    TopicMessage,
    Users,
    VcDocument as VcDocumentCollection,
    VcDocumentDefinition as VcDocument,
    VCMessage,
    VpDocument as VpDocumentCollection,
    VpDocumentDefinition as VpDocument,
    VPMessage,
    Wallet,
    Workers,
    PolicyImportExport,
    HederaDid,
    CommonDidDocument,
    Message,
    RegistrationMessage,
    PolicyMessage,
    IAuthUser,
    TokenMessage,
    SchemaMessage,
    MessageAction,
    VcHelper,
    UrlType,
    RoleMessage,
    GuardianRoleMessage,
    UserPermissionsMessage, PinoLogger, DatabaseServer,
} from '@guardian/common';
import {
    DidDocumentStatus,
    EntityOwner,
    ISchema,
    PolicyStatus,
    SchemaCategory,
    SchemaEntity,
    SchemaStatus,
    TopicType,
    UserRole,
    WorkerTaskType
} from '@guardian/interfaces';
import { PolicyEngine } from '../policy-engine/policy-engine.js';

/**
 * Restore data from hedera class
 */
@Singleton
export class RestoreDataFromHedera {
    /**
     * Workers
     * @private
     */
    private readonly workers: Workers;

    /**
     * Hello world topic id
     * @private
     */
    private readonly MAIN_TOPIC_ID = process.env.INITIALIZATION_TOPIC_ID;
    /**
     * Users service
     * @private
     */
    private readonly users: Users;
    /**
     * Wallet service
     * @private
     */
    private readonly wallet: Wallet;

    /**
     * Main topic update interval
     * @private
     */
    private readonly UPDATE_INTERVAL = 2 * 60 * 1000;

    /**
     * Last update
     * @private
     */
    private mainTopicLastUpdate = 0;

    /**
     * MainTopicMessages
     * @private
     */
    private mainTopicMessages: Message[] = [];

    constructor() {
        this.workers = new Workers();
        this.users = new Users();
        this.wallet = new Wallet();
    }

    /**
     * Read topic
     * @param topicId
     * @param userId
     * @private
     */
    private async readTopicMessages(topicId: string, userId: string | null): Promise<Message[]> {
        if (typeof topicId !== 'string') {
            throw new Error('Bad topicId');
        }

        const messages = await this.workers.addRetryableTask(
            {
                type: WorkerTaskType.GET_TOPIC_MESSAGES,
                data: {
                    dryRun: false,
                    topic: topicId,
                    payload: { userId }
                },
            },
            10
        );
        const result = [];
        let errors = 0;
        for (const m of messages) {
            try {
                const r = MessageServer.fromMessage<Message>(m.message, userId);
                r.setAccount(m.payer_account_id);
                r.setTopicId(topicId);
                r.setId(m.id);
                result.push(r);
            } catch (e) {
                ++errors;
            }
        }
        if (errors) {
            console.error(`Error: ${errors}/${result.length}`);
        }
        return result;
    }

    /**
     * Load documents
     * @param topicId
     * @param loadIPFS
     * @private
     */
    private async loadIPFS<T extends Message>(message: T): Promise<T> {
        try {
            console.log(`Load file: ${message.type}.`);
            return await MessageServer.loadIPFS(message);
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    /**
     * Restore schema
     * @param s
     * @private
     */
    private async restoreSchema(s: SchemaMessage): Promise<void> {
        const [schema, context] = s.documents;
        const schemaObj: Partial<ISchema> = {
            uuid: s.uuid,
            name: s.name,
            description: s.description,
            entity: s.entity as any,
            status: SchemaStatus.PUBLISHED,
            readonly: false,
            document: schema,
            context,
            version: s.version,
            creator: s.owner,
            owner: s.owner,
            topicId: s.topicId?.toString(),
            messageId: s.id,
            documentURL: s.getDocumentUrl(UrlType.url),
            contextURL: s.getContextUrl(UrlType.url),
            iri: `#${s.uuid}&${s.version}`, // restore iri
            isOwner: true,
            isCreator: true,
            system: false,
            active: true,
            category: SchemaCategory.POLICY,
            codeVersion: s.codeVersion
        };
        const dataBaseServer = new DatabaseServer();

        const result = dataBaseServer.create(SchemaCollection, schemaObj);
        await dataBaseServer.save(SchemaCollection, result);
    }

    /**
     * Restore policy documents
     * @param topicMessages
     * @param owner
     * @param policyId
     * @param user
     * @param hederaAccountKey
     * @private
     */
    private async restorePolicyDocuments(
        topicMessages: Message[],
        owner: string,
        policyId: string,
        uuid: string,
        user: IAuthUser,
        hederaAccountKey: string
    ): Promise<void> {
        const dataBaseServer = new DatabaseServer();

        const didDocumentObjects = []
        const vcDocumentObjects = []
        const vpDocumentObjects = []

        for (const row of topicMessages) {
            await this.loadIPFS(row);
            switch (row.constructor) {
                case DIDMessage: {
                    const message = row as DIDMessage;

                    didDocumentObjects.push({
                        did: message.document.id,
                        document: message.document,
                        status: DidDocumentStatus.CREATE,
                        messageId: message.id,
                        topicId: message.topicId,
                    });

                    break;
                }

                case VCMessage: {
                    const message = row as VCMessage;
                    const vcDoc = VcDocument.fromJsonTree(message.document);

                    vcDocumentObjects.push({
                        hash: vcDoc.toCredentialHash(),
                        owner,
                        messageId: message.id,
                        policyId,
                        topicId: message.topicId,
                        document: vcDoc.toJsonTree(),
                        type: undefined,
                    });

                    break;
                }

                case VPMessage: {
                    const message = row as VPMessage;
                    const vpDoc = VpDocument.fromJsonTree(message.document);

                    vpDocumentObjects.push({
                        hash: vpDoc.toCredentialHash(),
                        policyId,
                        owner,
                        messageId: message.id,
                        topicId: message.topicId,
                        document: vpDoc.toJsonTree(),
                        type: undefined,
                    });

                    break;
                }

                case TopicMessage: {
                    const message = row as TopicMessage;
                    if (
                        message.messageType === 'DYNAMIC_TOPIC' &&
                        message.childId
                    ) {
                        const messages = await this.readTopicMessages(message.childId, user.id);
                        const childTopicMessage = messages[0] as TopicMessage;
                        await this.restoreTopic(
                            {
                                topicId: message.childId,
                                name: childTopicMessage.name,
                                description: childTopicMessage.description,
                                owner: childTopicMessage.owner,
                                type: TopicType.DynamicTopic,
                                policyId,
                                policyUUID: uuid,
                            },
                            user,
                            null,
                            null
                        );

                        await this.restorePolicyDocuments(
                            messages,
                            owner,
                            policyId,
                            uuid,
                            user,
                            hederaAccountKey
                        );
                    }
                    break;
                }

                case RoleMessage: {
                    //Skip message
                    break;
                }

                case GuardianRoleMessage: {
                    //Skip message
                    break;
                }

                case UserPermissionsMessage: {
                    //Skip message
                    break;
                }

                default:
                    console.error('Unknown message type', row);
            }
        }

        await dataBaseServer.saveMany(DidDocumentCollection, didDocumentObjects);

        await dataBaseServer.saveMany(VcDocumentCollection, vcDocumentObjects);

        await dataBaseServer.saveMany(VpDocumentCollection, vpDocumentObjects);
    }

    /**
     * Restore policy
     * @param policyTopicId
     * @param owner
     * @param user
     * @param hederaAccountID
     * @param hederaAccountKey
     * @param logger
     * @private
     */
    private async restorePolicy(
        policyTopicId: string,
        owner: string,
        user: IAuthUser,
        hederaAccountID: string,
        hederaAccountKey: string,
        logger: PinoLogger
    ): Promise<void> {
        try {
            const policyMessages = await this.readTopicMessages(policyTopicId, user.id);
            const policyTopicMessage = policyMessages[0] as TopicMessage;
            await this.restoreTopic(
                {
                    topicId: policyTopicId,
                    name: policyTopicMessage.name,
                    description: policyTopicMessage.description,
                    owner,
                    type: TopicType.PolicyTopic,
                    policyId: null,
                    policyUUID: null,
                },
                user,
                hederaAccountKey,
                hederaAccountKey
            );

            const dataBaseServer = new DatabaseServer();

            // Restore tokens
            for (const {
                tokenId,
                tokenName,
                tokenSymbol,
                tokenType,
                decimals,
            } of this.findMessagesByType<TokenMessage>(MessageType.Token, policyMessages)) {
                await dataBaseServer.save(Token, {
                    tokenId,
                    tokenName,
                    tokenSymbol,
                    tokenType,
                    decimals,
                    initialSupply: 0,
                    adminId: hederaAccountID,
                    changeSupply: false,
                    enableAdmin: false,
                    enableKYC: false,
                    enableFreeze: false,
                    enableWipe: false,
                    owner,
                });
            }

            const publishedSchemas = this.findMessagesByType<SchemaMessage>(MessageType.Schema, policyMessages)
                .filter((m) => m.action === MessageAction.PublishSchema);

            // Restore schemas
            for (const s of publishedSchemas) {
                await this.loadIPFS(s);
                await this.restoreSchema(s);
            }

            // Restore policy
            const publishedPolicies = this.findMessagesByType<PolicyMessage>(MessageType.InstancePolicy, policyMessages)
                .filter((m) => m.action === MessageAction.PublishPolicy);

            for (const policy of publishedPolicies) {
                await this.loadIPFS(policy);
                const parsedPolicyFile = await PolicyImportExport.parseZipFile(policy.document);
                const policyObject = parsedPolicyFile.policy;

                policyObject.instanceTopicId = policy.instanceTopicId;
                policyObject.synchronizationTopicId =
                    policy.synchronizationTopicId;
                policyObject.status = PolicyStatus.PUBLISH;
                policyObject.topicId = policyTopicId;

                if (!policyObject.instanceTopicId) {
                    const policyInstanceTopicMessage =
                        this.findMessagesByType<TopicMessage>(MessageType.Topic, policyMessages)
                            .find((m) => m.rationale === policy.id);
                    policyObject.instanceTopicId = policyInstanceTopicMessage.childId;
                }

                const policyInstanceMessages = await this.readTopicMessages(policyObject.instanceTopicId, user.id);
                const p = dataBaseServer.create(PolicyCollection, policyObject);
                const r = await dataBaseServer.save(PolicyCollection, p);

                const policyInstanceTopic = policyInstanceMessages[0] as TopicMessage;
                await this.restoreTopic(
                    {
                        topicId: policyObject.instanceTopicId,
                        name: policyInstanceTopic.name,
                        description: policyInstanceTopic.description,
                        owner,
                        type: TopicType.InstancePolicyTopic,
                        policyId: r.id.toString(),
                        policyUUID: r.uuid,
                    },
                    user,
                    hederaAccountKey,
                    hederaAccountKey
                );

                await this.restorePolicyDocuments(
                    policyInstanceMessages,
                    owner,
                    r.id.toString(),
                    r.uuid,
                    user,
                    hederaAccountKey
                );

                await new PolicyEngine(logger).generateModel(r.id.toString());
                // await new BlockTreeGenerator().generate(r.id.toString());
            }
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * Find message by type
     * @param type
     * @param messages
     * @private
     */
    private findMessageByType<T extends Message>(type: MessageType, messages: Message[]): T {
        return messages.find((m) => m.type === type) as T;
    }

    /**
     * Find messages by type
     * @param type
     * @param messages
     * @private
     */
    private findMessagesByType<T extends Message>(type: MessageType, messages: Message[]): T[] {
        return (messages?.filter((m) => m.type === type) || []) as T[];
    }

    /**
     * Restore topic
     * @param topic
     * @param user
     * @param topicAdminKey
     * @param topicSubmitKey
     * @private
     */
    private async restoreTopic(
        topic: any,
        user: IAuthUser,
        topicAdminKey: string,
        topicSubmitKey: string
    ): Promise<void> {
        await new DatabaseServer().save(Topic, topic);
        await Promise.all([
            this.wallet.setKey(
                user.walletToken,
                KeyType.TOPIC_SUBMIT_KEY,
                topic.topicId,
                topicAdminKey
            ),
            this.wallet.setKey(
                user.walletToken,
                KeyType.TOPIC_ADMIN_KEY,
                topic.topicId,
                topicSubmitKey
            ),
        ]);
    }

    /**
     * Get main topic messages
     * @private
     */
    private async getMainTopicMessages(userId: string | null): Promise<Message[]> {
        const currentTime = Date.now();
        if (currentTime - this.mainTopicLastUpdate > this.UPDATE_INTERVAL) {
            this.mainTopicMessages = await this.readTopicMessages(this.MAIN_TOPIC_ID, userId);
            this.mainTopicLastUpdate = currentTime;
        }

        return this.mainTopicMessages;
    }

    /**
     * FindAllUserTopics
     * @param username
     * @param hederaAccountID
     * @param hederaAccountKey
     * @param did
     * @param userId
     */
    async findAllUserTopics(
        username: string,
        hederaAccountID: string,
        hederaAccountKey: string,
        did: string,
        userId: string | null
    ): Promise<any[]> {
        const mainTopicMessages = await this.getMainTopicMessages(userId);
        return mainTopicMessages
            .filter((m: Message) => m.type === MessageType.StandardRegistry)
            .filter((m: RegistrationMessage) => m.did?.includes(did))
            .map((m: RegistrationMessage) => {
                let registrantTopicId = m.registrantTopicId;
                if (!registrantTopicId && HederaDid.implement(m.did)) {
                    const { topicId } = HederaDid.parse(m.did);
                    registrantTopicId = topicId;
                }
                return {
                    did: m.did,
                    topicId: registrantTopicId,
                    timestamp: Math.floor(parseFloat(m.id) * 1000),
                };
            });
    }

    /**
     * Restore standard registry
     * @param username
     * @param hederaAccountID
     * @param hederaAccountKey
     * @param registrantTopicId
     * @param didDocument
     * @param logger
     * @param userId
     */
    async restoreRootAuthority(
        username: string,
        hederaAccountID: string,
        hederaAccountKey: string,
        registrantTopicId: string,
        didDocument: CommonDidDocument,
        logger: PinoLogger,
        userId: string | null
    ): Promise<void> {
        const did = didDocument.getDid();
        const user = await this.users.getUser(username, userId);

        if (user.role !== UserRole.STANDARD_REGISTRY) {
            throw new Error('User is not a Standard Registry.');
        }

        const mainTopicMessages = await this.getMainTopicMessages(user.id);
        const registrationMessage = mainTopicMessages
            .filter((m: Message) => m.type === MessageType.StandardRegistry)
            .filter((m: RegistrationMessage) => m.did === did)
            .find((m: RegistrationMessage) => {
                if (m.registrantTopicId) {
                    return m.registrantTopicId === registrantTopicId
                } else if (HederaDid.implement(m.did)) {
                    const { topicId } = HederaDid.parse(m.did);
                    return topicId === registrantTopicId
                } else {
                    return false;
                }
            });

        if (!registrationMessage) {
            throw new Error('User not found.');
        }

        const allMessages = await this.readTopicMessages(registrantTopicId, user.id);

        // Restore account
        const topicMessage = this.findMessageByType<TopicMessage>(MessageType.Topic, allMessages);
        const didDocumentMessage = this.findMessageByType<DIDMessage>(MessageType.DIDDocument, allMessages);
        const vcDocumentMessage = this.findMessageByType<VCMessage>(MessageType.VCDocument, allMessages);
        const allPolicies = this.findMessagesByType(MessageType.Policy, allMessages) as PolicyMessage[];

        if (!didDocumentMessage) {
            throw new Error('Couldn\'t find DID document.');
        }

        await this.loadIPFS(didDocumentMessage);

        const dataBaseServer = new DatabaseServer();

        const existingUser = await dataBaseServer.findOne(DidDocumentCollection, { did });

        if (existingUser) {
            throw new Error('The DID document already exists.');
        }

        if (!didDocument.compare(didDocumentMessage.document)) {
            throw new Error('The DID documents don\'t match.');
        }

        const vcHelper = new VcHelper();
        const didRow = await vcHelper.saveDidDocument(didDocument, user);
        didRow.status = DidDocumentStatus.CREATE;
        didRow.messageId = didDocumentMessage.id;
        didRow.topicId = didDocumentMessage.topicId.toString();
        await dataBaseServer.update(DidDocumentCollection, null, didRow);

        if (vcDocumentMessage) {
            await this.loadIPFS(vcDocumentMessage);
            const vcDoc = VcDocument.fromJsonTree(vcDocumentMessage.document);
            await dataBaseServer.save(VcDocumentCollection, {
                hash: vcDoc.toCredentialHash(),
                owner: did,
                document: vcDoc.toJsonTree(),
                type: 'STANDARD_REGISTRY',
            });
        }

        await this.users.updateCurrentUser(username, {
            did,
            parent: undefined,
            hederaAccountId: hederaAccountID,
        }, userId);

        await this.restoreUsers(allMessages, did, userId);
        await this.restorePermissions(allMessages, did, user, hederaAccountID, userId);

        await this.restoreTopic(
            {
                topicId: registrantTopicId,
                name: topicMessage?.name,
                description: topicMessage?.description,
                owner: did,
                type: TopicType.UserTopic,
                policyId: null,
                policyUUID: null,
                parent: registrationMessage.topicId
            },
            user,
            hederaAccountKey,
            hederaAccountKey
        );

        await this.wallet.setKey(
            user.walletToken,
            KeyType.KEY,
            did,
            hederaAccountKey
        );

        // Restore policies
        for (const policyMessage of allPolicies) {
            await this.restorePolicy(
                policyMessage.policyTopicId,
                did,
                user,
                hederaAccountID,
                hederaAccountKey,
                logger
            );
        }
    }

    private async restoreUsers(messages: Message[], owner: string, userId: string | null) {
        const userDIDs = this.findMessagesByType<DIDMessage>(MessageType.DIDDocument, messages);
        userDIDs.shift();

        for (const message of userDIDs) {
            await this.loadIPFS(message);
            const did = message.document.id;
            await new DatabaseServer().save(DidDocumentCollection, {
                did,
                document: message.document,
                status: DidDocumentStatus.CREATE,
                messageId: message.id,
                topicId: message.topicId,
            });
            this.users.generateNewTemplate(UserRole.USER, did, owner, userId);
        }
    }

    private async restorePermissions(
        messages: Message[],
        parentDid: string,
        parent: IAuthUser,
        hederaAccountID: string,
        userId: string | null
    ) {
        const guardianRoles = this.findMessagesByType<GuardianRoleMessage>(MessageType.GuardianRole, messages);
        const _guardianRoles = new Map<string, GuardianRoleMessage>();
        for (const message of guardianRoles) {
            if (message.payer === hederaAccountID) {
                _guardianRoles.set(message.uuid, message);
            }
        }

        const _owner = EntityOwner.sr(parent.id?.toString(), parentDid);
        const _roleMap = new Map<string, any>();
        for (const message of _guardianRoles.values()) {
            await this.loadIPFS(message);
            const vcDoc = VcDocument.fromJsonTree(message.document);
            const uuid = vcDoc.getField<string>('uuid');
            const role = await this.users.createRole({
                uuid,
                name: vcDoc.getField<string>('name'),
                description: vcDoc.getField<string>('description'),
                permissions: vcDoc.getField<string[]>('permissions')
            }, _owner, true);
            await new DatabaseServer().save(VcDocumentCollection, {
                hash: vcDoc.toCredentialHash(),
                owner: parentDid,
                messageId: message.id,
                topicId: message.topicId,
                document: vcDoc.toJsonTree(),
                type: SchemaEntity.ROLE
            });
            _roleMap.set(uuid, role)
        }

        const permissions = this.findMessagesByType<UserPermissionsMessage>(MessageType.UserPermissions, messages);
        const _permissions = new Map<string, UserPermissionsMessage>();
        for (const message of permissions) {
            if (message.payer === hederaAccountID) {
                _permissions.set(message.user, message);
            }
        }

        for (const message of _permissions.values()) {
            await this.loadIPFS(message);
            const vcDoc = VcDocument.fromJsonTree(message.document);
            const userRoles = vcDoc.getField<{
                uuid: string,
                name: string,
                owner: string
            }[]>('roles');
            const userDid = vcDoc.getField<string>('userId');
            const template = await this.users.getUserById(userDid, userId);
            if (
                template &&
                template.role === UserRole.USER &&
                template.parent === parentDid
            ) {
                const roleIds: string[] = [];
                for (const item of userRoles) {
                    const role = _roleMap.get(item.uuid);
                    if (role) {
                        roleIds.push(role.id);
                        await this.users.updateUserRole(template.username, roleIds, _owner);
                        await new DatabaseServer().save(VcDocumentCollection, {
                            hash: vcDoc.toCredentialHash(),
                            owner: parentDid,
                            messageId: message.id,
                            topicId: message.topicId,
                            document: vcDoc.toJsonTree(),
                            type: SchemaEntity.USER_PERMISSIONS
                        });
                    }
                }
            }
        }
    }
}
