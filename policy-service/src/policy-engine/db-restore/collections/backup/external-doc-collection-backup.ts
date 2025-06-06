import { FindCursor } from 'mongodb';
import { DataBaseHelper, DeleteCache, ExternalDocument } from '@guardian/common';
import { CollectionBackup } from '../collection-backup.js';
import { IDiffAction } from '../../interfaces/action.interface.js';

export class ExternalCollectionBackup extends CollectionBackup<ExternalDocument> {
    private readonly collectionName: string = 'ExternalDocument';

    protected override async findDocument(row: ExternalDocument): Promise<ExternalDocument> {
        const vcCollection = DataBaseHelper.orm.em.getCollection(this.collectionName);
        const vcRow = await vcCollection.findOne<any>({ policyId: this.policyId, _id: row._id });
        return vcRow;
    }

    protected override findDocuments(lastUpdate?: Date): FindCursor<ExternalDocument> {
        const vcCollection = DataBaseHelper.orm.em.getCollection(this.collectionName);
        const vcRows = vcCollection.find<any>({ policyId: this.policyId });
        return vcRows;
    }

    protected override findDeletedDocuments(): FindCursor<DeleteCache> {
        const collection = DataBaseHelper.orm.em.getCollection('DeleteCache');
        const rows = collection.find<any>({
            policyId: this.policyId,
            collection: this.collectionName
        });
        return rows;
    }

    protected override createBackupData(row: ExternalDocument): any {
        return {
            _propHash: row._propHash,
            _docHash: row._docHash
        }
    }

    protected override createDiffData(newRow: ExternalDocument, oldRow?: ExternalDocument): any {
        const diff: any = this.compareData(newRow, oldRow);
        delete diff.documentFileId;
        return diff;
    }

    protected override checkDocument(newRow: ExternalDocument, oldRow: ExternalDocument): boolean {
        return (newRow._docHash !== oldRow._docHash) || (newRow._propHash !== oldRow._propHash);
    }

    protected override needLoadFile(newRow: ExternalDocument, oldRow?: ExternalDocument): boolean {
        return false;
    }

    protected override async loadFile(row: ExternalDocument, i: number = 0): Promise<any> {
        return row;
    }

    protected override async clearFile(row: ExternalDocument): Promise<ExternalDocument> {
        return row;
    }

    protected override actionHash(hash: string, action: IDiffAction<ExternalDocument>, row?: ExternalDocument): string {
        if (row) {
            return this.sumHash(hash, action.type, action.id, row._propHash, row._docHash);
        } else {
            return this.sumHash(hash, action.type, action.id);
        }
    }
}
