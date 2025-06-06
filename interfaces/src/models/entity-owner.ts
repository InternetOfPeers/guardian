import { UserPermissions } from '../helpers/permissions-helper.js';
import { IOwner } from '../interface/owner.interface.js';
import { IUser } from '../interface/user.interface.js';
import { AccessType } from '../type/access.type.js';
import { LocationType } from '../type/location.type.js';
import { Permissions } from '../type/permissions.type.js';
import { UserRole } from '../type/user-role.type.js';

export class EntityOwner implements IOwner {
    public readonly id: string;
    public readonly parent: string;
    public readonly creator: string;
    public readonly owner: string;
    public readonly username: string;
    public readonly access: AccessType;
    public readonly location: LocationType;

    constructor(user?: IUser) {
        if (user) {
            this.parent = user.parent;
            this.username = user.username;
            this.id = user.id?.toString();
            this.location = user.location;
            if (user.role === UserRole.USER) {
                this.creator = user.did;
                this.owner = user.parent;
                const assigned = UserPermissions.has(user, Permissions.ACCESS_POLICY_ASSIGNED);
                const published = UserPermissions.has(user, Permissions.ACCESS_POLICY_PUBLISHED);
                const assignedAndPublished = UserPermissions.has(user, Permissions.ACCESS_POLICY_ASSIGNED_AND_PUBLISHED)
                const all = UserPermissions.has(user, Permissions.ACCESS_POLICY_ALL);
                if (all) {
                    this.access = AccessType.ALL;
                } else if (assigned && published) {
                    this.access = AccessType.ASSIGNED_OR_PUBLISHED;
                } else if (assigned) {
                    this.access = AccessType.ASSIGNED;
                } else if (published) {
                    this.access = AccessType.PUBLISHED;
                } else if (assignedAndPublished) {
                    this.access = AccessType.ASSIGNED_AND_PUBLISHED;
                } else {
                    this.access = AccessType.NONE;
                }
            } else if (user.role === UserRole.STANDARD_REGISTRY) {
                this.creator = user.did;
                this.owner = user.did;
                this.access = AccessType.ALL;
            } else {
                this.creator = null;
                this.owner = null;
                this.access = AccessType.NONE;
            }
        } else {
            this.id = null;
            this.creator = null;
            this.owner = null;
            this.access = AccessType.NONE;
            this.location = LocationType.LOCAL;
        }
    }

    public static sr(userId: string, did: string): IOwner {
        return {
            id: userId,
            creator: did,
            owner: did,
            username: null,
            access: AccessType.NONE,
            location: LocationType.LOCAL
        }
    }
}