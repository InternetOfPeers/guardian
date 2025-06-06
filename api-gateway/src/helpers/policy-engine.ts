import { ExportMessageDTO, PoliciesValidationDTO, PolicyDTO, PolicyPreviewDTO, PolicyRequestCountDTO, PolicyValidationDTO, PolicyVersionDTO } from '#middlewares';
import { IAuthUser, NatsService } from '@guardian/common';
import { DocumentType, GenerateUUIDv4, IOwner, MigrationConfig, PolicyEngineEvents, PolicyToolMetadata } from '@guardian/interfaces';
import { Singleton } from '../helpers/decorators/singleton.js';
import { NewTask } from './task-manager.js';

/**
 * Policy engine service
 */
@Singleton
export class PolicyEngine extends NatsService {
    /**
     * Message queue name
     */
    public messageQueueName = 'ipfs-queue';

    /**
     * Reply subject
     * @private
     */
    public replySubject = 'ipfs-reply-' + GenerateUUIDv4();

    /**
     * Get policy
     * @param filters
     */
    public async getPolicy(options: any, owner: IOwner): Promise<PolicyDTO | null> {
        return await this.sendMessage(PolicyEngineEvents.GET_POLICY, { options, owner });
    }

    /**
     * Get policy
     * @param policyId
     */
    public async accessPolicy(
        policyId: string,
        owner: IOwner,
        action: string
    ): Promise<PolicyDTO> {
        return await this.sendMessage(PolicyEngineEvents.ACCESS_POLICY, { policyId, owner, action });
    }

    /**
     * Get policies
     * @param filters
     * @param owner
     */
    public async getPolicies<T extends {
        /**
         * Policies array
         */
        policies: PolicyDTO[],
        /**
         * Total count
         */
        count: number
    }>(options: any, owner: IOwner): Promise<T> {
        return await this.sendMessage<T>(PolicyEngineEvents.GET_POLICIES, { options, owner });
    }

    /**
     * Get policies V2 05.06.2024
     * @param filters
     * @param owner
     */
    public async getPoliciesV2<T extends {
        /**
         * Policies array
         */
        policies: PolicyDTO[],
        /**
         * Total count
         */
        count: number
    }>(options: any, owner: IOwner): Promise<T> {
        return await this.sendMessage<T>(PolicyEngineEvents.GET_POLICIES_V2, { options, owner });
    }

    /**
     * Get Tokens Map
     * @param owner
     * @param status
     */
    public async getTokensMap(
        owner: IOwner,
        status?: string | string[]
    ): Promise<any> {
        return await this.sendMessage<any>(PolicyEngineEvents.GET_TOKENS_MAP, { owner, status });
    }

    /**
     * Create policy
     * @param model
     * @param owner
     */
    public async createPolicy(
        model: PolicyDTO,
        owner: IOwner
    ): Promise<PolicyDTO> {
        return await this.sendMessage(PolicyEngineEvents.CREATE_POLICIES, { model, owner });
    }

    /**
     * Async create policy
     * @param model
     * @param owner
     * @param task
     */
    public async createPolicyAsync(
        model: PolicyDTO,
        owner: IOwner,
        task: NewTask
    ): Promise<NewTask> {
        return await this.sendMessage(PolicyEngineEvents.CREATE_POLICIES_ASYNC, { model, owner, task });
    }

    /**
     * Async clone policy
     * @param policyId Policy identifier
     * @param model Policy configuration
     * @param owner User
     * @param task Task
     */
    public async clonePolicyAsync(
        policyId: string,
        model: PolicyDTO,
        owner: IOwner,
        task: NewTask
    ): Promise<NewTask> {
        return await this.sendMessage(PolicyEngineEvents.CLONE_POLICY_ASYNC, { policyId, model, owner, task });
    }

    /**
     * Async delete policy
     * @param policyId Policy identifier
     * @param owner User
     * @param task Task
     */
    public async deletePolicyAsync(
        policyId: string,
        owner: IOwner,
        task: NewTask
    ): Promise<NewTask> {
        return await this.sendMessage(PolicyEngineEvents.DELETE_POLICY_ASYNC, { policyId, owner, task });
    }

    /**
     * Save policy
     * @param model
     * @param owner
     * @param policyId
     */
    public async savePolicy(
        model: PolicyDTO,
        owner: IOwner,
        policyId: string
    ): Promise<PolicyDTO> {
        return await this.sendMessage(PolicyEngineEvents.SAVE_POLICIES, { model, owner, policyId });
    }

    /**
     * Publish policy
     * @param model
     * @param owner
     * @param policyId
     */
    public async publishPolicy(
        options: PolicyVersionDTO,
        owner: IOwner,
        policyId: string
    ): Promise<PoliciesValidationDTO> {
        return await this.sendMessage(PolicyEngineEvents.PUBLISH_POLICIES, { options, owner, policyId });
    }

    /**
     * Async publish policy
     * @param model
     * @param owner
     * @param policyId
     * @param task
     */
    public async publishPolicyAsync(
        options: PolicyVersionDTO,
        owner: IOwner,
        policyId: string,
        task: NewTask
    ): Promise<NewTask> {
        return await this.sendMessage(PolicyEngineEvents.PUBLISH_POLICIES_ASYNC, { options, owner, policyId, task });
    }

    /**
     * Dry-run policy
     * @param policyId
     * @param owner
     */
    public async dryRunPolicy(
        policyId: string,
        owner: IOwner,
    ): Promise<PoliciesValidationDTO> {
        return await this.sendMessage(PolicyEngineEvents.DRY_RUN_POLICIES, { policyId, owner });
    }

    /**
     * Dry-run policy
     * @param policyId
     * @param owner
     */
    public async draft(
        policyId: string,
        owner: IOwner
    ): Promise<boolean> {
        return await this.sendMessage(PolicyEngineEvents.DRAFT_POLICIES, { policyId, owner });
    }

    /**
     * Restart policy
     * @param user
     * @param policyId
     */
    public async restartPolicyInstance(user: IAuthUser, policyId: string) {
        return await this.sendMessage(PolicyEngineEvents.RESTART_POLICY_INSTANCE, { user, policyId });
    }

    /**
     * Validate policy
     * @param model
     * @param owner
     * @param policyId
     */
    public async validatePolicy(
        model: PolicyDTO,
        owner: IOwner,
        policyId?: string
    ): Promise<PolicyValidationDTO> {
        return await this.sendMessage(PolicyEngineEvents.VALIDATE_POLICIES, { model, owner, policyId });
    }

    /**
     * Get policy blocks
     * @param user
     * @param policyId
     */
    public async getPolicyBlocks(user: IAuthUser, policyId: string): Promise<any> {
        return await this.sendMessage(PolicyEngineEvents.POLICY_BLOCKS, { user, policyId });
    }

    /**
     * Get policies by category Id
     * @param categoryIds
     * @param text
     */
    public async getPoliciesByCategoriesAndText(
        categoryIds: string[],
        text: string
    ): Promise<PolicyDTO[]> {
        return await this.sendMessage(PolicyEngineEvents.GET_POLICIES_BY_CATEGORY, { categoryIds, text });
    }

    /**
     * Get block data
     * @param user
     * @param policyId
     * @param blockId
     * @param params
     */
    public async getBlockData(
        user: IAuthUser,
        policyId: string,
        blockId: string,
        params?: any
    ): Promise<any> {
        return await this.sendMessage(PolicyEngineEvents.GET_BLOCK_DATA, { user, blockId, policyId, params });
    }

    /**
     * Get block data by tag name
     * @param user
     * @param policyId
     * @param tag
     * @param params
     */
    public async getBlockDataByTag(
        user: IAuthUser,
        policyId: string,
        tag: string,
        params?: any
    ): Promise<any> {
        return await this.sendMessage(PolicyEngineEvents.GET_BLOCK_DATA_BY_TAG, { user, tag, policyId, params });
    }

    /**
     * Set block data
     * @param user
     * @param policyId
     * @param blockId
     * @param data
     */
    public async setBlockData(
        user: IAuthUser,
        policyId: string,
        blockId: string,
        data: any
    ): Promise<any> {
        return await this.sendMessage(PolicyEngineEvents.SET_BLOCK_DATA, { user, blockId, policyId, data });
    }

    /**
     * Set block data
     * @param user
     * @param policyId
     * @param blockId
     * @param data
     */
    public async setBlockDataByTag(
        user: IAuthUser,
        policyId: string,
        tag: string,
        data: any
    ): Promise<any> {
        return await this.sendMessage(PolicyEngineEvents.SET_BLOCK_DATA_BY_TAG, { user, tag, policyId, data });
    }

    /**
     * Get block by tag name
     * @param user
     * @param policyId
     * @param tag
     */
    public async getBlockByTagName(
        user: IAuthUser,
        policyId: string,
        tag: string
    ): Promise<any> {
        return await this.sendMessage(PolicyEngineEvents.BLOCK_BY_TAG, { user, tag, policyId });
    }

    /**
     * Get block parents
     * @param user
     * @param policyId
     * @param blockId
     */
    public async getBlockParents(
        user: IAuthUser,
        policyId: string,
        blockId: string
    ): Promise<any> {
        return await this.sendMessage(PolicyEngineEvents.GET_BLOCK_PARENTS, { user, blockId, policyId });
    }

    /**
     * Get policy export file
     * @param policyId
     * @param owner
     */
    public async exportFile(
        policyId: string,
        owner: IOwner
    ): Promise<ArrayBuffer> {
        const file = await this.sendMessage(PolicyEngineEvents.POLICY_EXPORT_FILE, { policyId, owner }) as any;
        return Buffer.from(file, 'base64');
    }

    /**
     * Get policy export message id
     * @param policyId
     * @param owner
     */
    public async exportMessage(
        policyId: string,
        owner: IOwner
    ): Promise<ExportMessageDTO> {
        return await this.sendMessage(PolicyEngineEvents.POLICY_EXPORT_MESSAGE, { policyId, owner });
    }

    /**
     * Get policy export xlsx
     * @param policyId
     * @param owner
     */
    public async exportXlsx(
        policyId: string,
        owner: IOwner
    ): Promise<ArrayBuffer> {
        const file = await this.sendMessage(PolicyEngineEvents.POLICY_EXPORT_XLSX, { policyId, owner }) as any;
        return Buffer.from(file, 'base64');
    }

    /**
     * Load policy file for import
     * @param zip
     * @param owner
     * @param versionOfTopicId
     * @param metadata
     * @param demo
     */
    public async importFile(
        zip: Buffer,
        owner: IOwner,
        versionOfTopicId?: string,
        metadata?: PolicyToolMetadata,
        demo?: boolean
    ): Promise<boolean> {
        return await this.sendMessage(PolicyEngineEvents.POLICY_IMPORT_FILE, {
            zip,
            owner,
            versionOfTopicId,
            metadata,
            demo
        });
    }

    /**
     * Async load policy file for import
     * @param zip
     * @param owner
     * @param task
     * @param versionOfTopicId
     * @param metadata
     * @param demo
     */
    public async importFileAsync(
        zip: Buffer,
        owner: IOwner,
        task: NewTask,
        versionOfTopicId?: string,
        metadata?: PolicyToolMetadata,
        demo?: boolean
    ) {
        return await this.sendMessage(
            PolicyEngineEvents.POLICY_IMPORT_FILE_ASYNC,
            { zip, owner, task, versionOfTopicId, metadata, demo }
        );
    }

    /**
     * Import policy from message
     * @param messageId
     * @param owner
     * @param versionOfTopicId
     * @param metadata
     * @param demo
     */
    public async importMessage(
        messageId: string,
        owner: IOwner,
        versionOfTopicId?: string,
        metadata?: PolicyToolMetadata,
        demo?: boolean
    ): Promise<boolean> {
        return await this.sendMessage(
            PolicyEngineEvents.POLICY_IMPORT_MESSAGE,
            { messageId, owner, versionOfTopicId, metadata, demo }
        );
    }

    /**
     * Async import policy from message
     * @param messageId
     * @param owner
     * @param versionOfTopicId
     * @param task
     * @param metadata
     * @param demo
     */
    public async importMessageAsync(
        messageId: string,
        owner: IOwner,
        task: NewTask,
        versionOfTopicId?: string,
        metadata?: PolicyToolMetadata,
        demo?: boolean
    ) {
        return await this.sendMessage(
            PolicyEngineEvents.POLICY_IMPORT_MESSAGE_ASYNC,
            { messageId, owner, versionOfTopicId, task, metadata, demo }
        );
    }

    /**
     * Get policy info from file
     * @param zip
     * @param owner
     */
    public async importFilePreview(
        zip: ArrayBuffer,
        owner: IOwner
    ): Promise<PolicyPreviewDTO> {
        return await this.sendMessage(PolicyEngineEvents.POLICY_IMPORT_FILE_PREVIEW, { zip, owner });
    }

    /**
     * Load xlsx file for import
     * @param xlsx
     * @param owner
     * @param policyId
     */
    public async importXlsx(
        xlsx: ArrayBuffer,
        owner: IOwner,
        policyId: string
    ): Promise<any> {
        return await this.sendMessage(PolicyEngineEvents.POLICY_IMPORT_XLSX, { xlsx, owner, policyId });
    }

    /**
     * Async load xlsx file for import
     * @param xlsx
     * @param owner
     * @param policyId
     * @param task
     */
    public async importXlsxAsync(
        xlsx: ArrayBuffer,
        owner: IOwner,
        policyId: string,
        task: NewTask
    ) {
        return await this.sendMessage(PolicyEngineEvents.POLICY_IMPORT_XLSX_ASYNC, { xlsx, owner, policyId, task });
    }

    /**
     * Get policy info from xlsx file
     * @param zip
     * @param owner
     */
    public async importXlsxPreview(
        xlsx: ArrayBuffer,
        owner: IOwner
    ): Promise<any> {
        return await this.sendMessage(PolicyEngineEvents.POLICY_IMPORT_XLSX_FILE_PREVIEW, { owner, xlsx });
    }

    /**
     * Get policy info from message
     * @param messageId
     * @param owner
     */
    public async importMessagePreview(
        messageId: string,
        owner: IOwner
    ): Promise<any> {
        return await this.sendMessage(PolicyEngineEvents.POLICY_IMPORT_MESSAGE_PREVIEW, { messageId, owner });
    }

    /**
     * Async get policy info from message
     * @param messageId
     * @param owner
     * @param task
     */
    public async importMessagePreviewAsync(
        messageId: string,
        owner: IOwner,
        task: NewTask
    ): Promise<NewTask> {
        return await this.sendMessage(PolicyEngineEvents.POLICY_IMPORT_MESSAGE_PREVIEW_ASYNC, { messageId, owner, task });
    }

    /**
     * Receive external data
     * @param data
     */
    public async receiveExternalData(data: any) {
        return await this.sendMessage(PolicyEngineEvents.RECEIVE_EXTERNAL_DATA, data);
    }

    /**
     * Receive external data
     * @param data
     * @param policyId
     * @param blockTag
     */
    public async receiveExternalDataCustom(data: any, policyId: string, blockTag: string): Promise<any> {
        return await this.sendMessage(PolicyEngineEvents.RECEIVE_EXTERNAL_DATA_CUSTOM, { data, policyId, blockTag });
    }

    /**
     * Get block about information
     */
    public async blockAbout(user: IAuthUser) {
        return await this.sendMessage(PolicyEngineEvents.BLOCK_ABOUT, { user });
    }

    /**
     * Get Virtual Users by policy id
     * @param policyId
     */
    public async getVirtualUsers(
        policyId: string,
        owner: IOwner
    ) {
        return await this.sendMessage(PolicyEngineEvents.GET_VIRTUAL_USERS, { policyId, owner });
    }

    /**
     * Create new Virtual User
     * @param policyId
     * @param owner
     */
    public async createVirtualUser(
        policyId: string,
        owner: IOwner
    ) {
        return await this.sendMessage(PolicyEngineEvents.CREATE_VIRTUAL_USER, { policyId, owner });
    }

    /**
     * Select Virtual User
     * @param policyId
     * @param did
     */
    public async loginVirtualUser(
        policyId: string,
        virtualDID: string,
        owner: IOwner
    ) {
        return await this.sendMessage(PolicyEngineEvents.SET_VIRTUAL_USER, { policyId, virtualDID, owner });
    }

    /**
     * Restart Dry-run policy
     * @param model
     * @param owner
     * @param policyId
     */
    public async restartDryRun(
        model: any,
        owner: IOwner,
        policyId: string
    ) {
        return await this.sendMessage(PolicyEngineEvents.RESTART_DRY_RUN, { model, owner, policyId });
    }

    /**
     * Create savepoint
     * @param model
     * @param owner
     * @param policyId
     */
    public async createSavepoint(
        model: any,
        owner: IOwner,
        policyId: string
    ) {
        return await this.sendMessage(PolicyEngineEvents.CREATE_SAVEPOINT, { model, owner, policyId });
    }

    /**
     * Delete savepoint
     * @param model
     * @param owner
     * @param policyId
     */
    public async deleteSavepoint(
        model: any,
        owner: IOwner,
        policyId: string
    ) {
        return await this.sendMessage(PolicyEngineEvents.DELETE_SAVEPOINT, { model, owner, policyId });
    }

    /**
     * Restore savepoint
     * @param model
     * @param owner
     * @param policyId
     */
    public async restoreSavepoint(
        model: any,
        owner: IOwner,
        policyId: string
    ) {
        return await this.sendMessage(PolicyEngineEvents.RESTORE_SAVEPOINT, { model, owner, policyId });
    }

    /**
     * Get savepoint state
     * @param owner
     * @param policyId
     */
    public async getSavepointState(
        owner: IOwner,
        policyId: string
    ) {
        return await this.sendMessage(PolicyEngineEvents.GET_SAVEPOINT, { owner, policyId });
    }

    /**
     * Get Virtual Documents
     * @param policyId
     * @param type
     * @param pageIndex
     * @param pageSize
     */
    public async getVirtualDocuments(
        policyId: string,
        type: string,
        owner: IOwner,
        pageIndex?: number,
        pageSize?: number
    ): Promise<[any[], number]> {
        return await this.sendMessage(PolicyEngineEvents.GET_VIRTUAL_DOCUMENTS, {
            policyId,
            type,
            owner,
            pageIndex,
            pageSize
        });
    }

    /**
     * Get policy navigation
     *
     * @param user
     * @param policyId
     */
    public async getNavigation(
        user: IAuthUser,
        policyId: string
    ): Promise<any> {
        return await this.sendMessage(PolicyEngineEvents.GET_POLICY_NAVIGATION, { user, policyId });
    }

    /**
     * Get policy groups
     *
     * @param user
     * @param policyId
     */
    public async getGroups(
        user: IAuthUser,
        policyId: string
    ): Promise<any> {
        return await this.sendMessage(PolicyEngineEvents.GET_POLICY_GROUPS, { user, policyId });
    }

    /**
     * Select policy group
     *
     * @param user
     * @param policyId
     * @param uuid
     */
    public async selectGroup(
        user: IAuthUser,
        policyId: string,
        uuid: string
    ): Promise<any> {
        return await this.sendMessage(PolicyEngineEvents.SELECT_POLICY_GROUP, { user, policyId, uuid });
    }

    /**
     * Get block data
     * @param user
     * @param policyId
     */
    public async getMultiPolicy(
        owner: IOwner,
        policyId: string
    ) {
        return await this.sendMessage(PolicyEngineEvents.GET_MULTI_POLICY, { owner, policyId });
    }

    /**
     * Set block data
     * @param user
     * @param policyId
     * @param data
     */
    public async setMultiPolicy(
        owner: IOwner,
        policyId: string,
        data: any
    ) {
        return await this.sendMessage(PolicyEngineEvents.SET_MULTI_POLICY, { owner, policyId, data });
    }

    /**
     * Discontinue policy
     * @param policyId
     * @param owner
     * @param date
     */
    public async discontinuePolicy(
        policyId: string,
        owner: IOwner,
        date?: string
    ): Promise<boolean> {
        return await this.sendMessage(PolicyEngineEvents.DISCONTINUE_POLICY, { policyId, owner, date });
    }

    /**
     * Get policy documents
     * @param owner Owner
     * @param policyId Policy identifier
     * @param includeDocument Include document
     * @param type Type
     * @param pageIndex Page index
     * @param pageSize Page size
     * @returns Documents and count
     */
    public async getDocuments(
        owner: IOwner,
        policyId: string,
        includeDocument: boolean = false,
        type?: DocumentType,
        pageIndex?: number | string,
        pageSize?: number | string
    ): Promise<[any[], number]> {
        return await this.sendMessage(PolicyEngineEvents.GET_POLICY_DOCUMENTS,
            { owner, policyId, includeDocument, type, pageIndex, pageSize });
    }

    /**
     * Migrate data
     * @param owner Owner
     * @param migrationConfig Migration config
     * @returns Errors
     */
    public async migrateData(
        owner: IOwner,
        migrationConfig: MigrationConfig,
    ): Promise<{ error: string, id: string }[]> {
        return await this.sendMessage(PolicyEngineEvents.MIGRATE_DATA, { owner, migrationConfig });
    }

    /**
     * Migrate data async
     * @param owner Owner
     * @param migrationConfig Migration config
     * @param task Task
     */
    public async migrateDataAsync(
        owner: IOwner,
        migrationConfig: MigrationConfig,
        task: NewTask
    ): Promise<NewTask> {
        return await this.sendMessage(PolicyEngineEvents.MIGRATE_DATA_ASYNC, { owner, migrationConfig, task });
    }

    /**
     * Download policy date
     * @param policyId Policy identifier
     * @param owner Owner
     * @returns Data
     */
    public async downloadPolicyData(
        policyId: string,
        owner: IOwner
    ) {
        return Buffer.from(
            (await this.sendMessage(PolicyEngineEvents.DOWNLOAD_POLICY_DATA, {
                policyId,
                owner,
            })) as string,
            'base64'
        );
    }

    /**
     * Download virtual keys
     * @param policyId Policy identifier
     * @param owner Owner
     * @returns Virtual keys
     */
    public async downloadVirtualKeys(policyId: string, owner: IOwner) {
        return Buffer.from(
            (await this.sendMessage(PolicyEngineEvents.DOWNLOAD_VIRTUAL_KEYS, {
                policyId,
                owner,
            })) as string,
            'base64'
        );
    }

    /**
     * Upload policy data
     * @param user User
     * @param data Data
     * @returns Uploaded policy
     */
    public async uploadPolicyData(
        owner: IOwner,
        data: any
    ) {
        return await this.sendMessage(PolicyEngineEvents.UPLOAD_POLICY_DATA, {
            owner,
            data,
        });
    }

    /**
     * Upload virtual keys
     * @param owner Owner
     * @param data Data
     * @param policyId Policy identifier
     * @returns Operation completed
     */
    public async uploadVirtualKeys(
        owner: IOwner,
        data: any,
        policyId: string
    ) {
        return await this.sendMessage(PolicyEngineEvents.UPLOAD_VIRTUAL_KEYS, {
            owner,
            data,
            policyId
        });
    }

    /**
     * Get tag block map
     * @param policyId Policy identifier
     * @param owner Owner
     * @returns Tag block map
     */
    public async getTagBlockMap(
        policyId: string,
        owner: IOwner
    ): Promise<any> {
        return await this.sendMessage(PolicyEngineEvents.GET_TAG_BLOCK_MAP, {
            policyId,
            owner,
        })
    }

    /**
     * Add policy test
     * @param policyId
     * @param zip
     * @param owner
     */
    public async addPolicyTest(
        policyId: string,
        file: any,
        owner: IOwner
    ): Promise<boolean> {
        return await this.sendMessage(PolicyEngineEvents.ADD_POLICY_TEST, {
            policyId,
            file,
            owner
        });
    }

    /**
     * Start policy test
     * @param policyId
     * @param testId
     * @param owner
     */
    public async getPolicyTest(
        policyId: string,
        testId: string,
        owner: IOwner
    ): Promise<boolean> {
        return await this.sendMessage(PolicyEngineEvents.GET_POLICY_TEST, {
            policyId,
            testId,
            owner
        });
    }

    /**
     * Start policy test
     * @param policyId
     * @param testId
     * @param owner
     */
    public async startPolicyTest(
        policyId: string,
        testId: string,
        owner: IOwner
    ): Promise<boolean> {
        return await this.sendMessage(PolicyEngineEvents.START_POLICY_TEST, {
            policyId,
            testId,
            owner
        });
    }

    /**
     * Stop policy test
     * @param policyId
     * @param testId
     * @param owner
     */
    public async stopPolicyTest(
        policyId: string,
        testId: string,
        owner: IOwner
    ): Promise<boolean> {
        return await this.sendMessage(PolicyEngineEvents.STOP_POLICY_TEST, {
            policyId,
            testId,
            owner
        });
    }

    /**
     * Delete policy test
     * @param policyId
     * @param testId
     * @param owner
     */
    public async deletePolicyTest(
        policyId: string,
        testId: string,
        owner: IOwner
    ): Promise<boolean> {
        return await this.sendMessage(PolicyEngineEvents.DELETE_POLICY_TEST, {
            policyId,
            testId,
            owner
        });
    }

    /**
     * Get test details
     * @param policyId
     * @param testId
     * @param owner
     */
    public async getTestDetails(
        policyId: string,
        testId: string,
        owner: IOwner
    ): Promise<boolean> {
        return await this.sendMessage(PolicyEngineEvents.GET_POLICY_TEST_DETAILS, {
            policyId,
            testId,
            owner
        });
    }

    /**
     * Get policies
     * @param filters
     * @param owner
     */
    public async getRemoteRequests<T extends {
        /**
         * Policies array
         */
        items: any[],
        /**
         * Total count
         */
        count: number
    }>(options: any, user: IAuthUser): Promise<T> {
        return await this.sendMessage<T>(PolicyEngineEvents.GET_REMOTE_REQUESTS, { options, user });
    }

    /**
     * Get policies requests count
     * @param filters
     * @param owner
     */
    public async getRemoteRequestsCount(options: any, user: IAuthUser): Promise<PolicyRequestCountDTO> {
        return await this.sendMessage(PolicyEngineEvents.GET_REMOTE_REQUESTS_COUNT, { options, user });
    }

    /**
     * Approve remote request
     * @param policyId
     * @param messageId
     * @param user
     */
    public async approveRemoteRequest(
        messageId: string,
        user: IAuthUser
    ) {
        return await this.sendMessage(PolicyEngineEvents.APPROVE_REMOTE_REQUEST, { messageId, user });
    }

    /**
     * Reject remote request
     * @param policyId
     * @param messageId
     * @param user
     */
    public async rejectRemoteRequest(
        messageId: string,
        user: IAuthUser
    ) {
        return await this.sendMessage(PolicyEngineEvents.REJECT_REMOTE_REQUEST, { messageId, user });
    }

    /**
     * Cancel remote request
     * @param policyId
     * @param messageId
     * @param user
     */
    public async cancelRemoteRequest(
        messageId: string,
        user: IAuthUser
    ) {
        return await this.sendMessage(PolicyEngineEvents.CANCEL_REMOTE_ACTION, { messageId, user });
    }

    /**
     * Cancel remote request
     * @param policyId
     * @param messageId
     * @param user
     */
    public async loadRemoteRequest(
        messageId: string,
        user: IAuthUser
    ) {
        return await this.sendMessage(PolicyEngineEvents.RELOAD_REMOTE_ACTION, { messageId, user });
    }
}
