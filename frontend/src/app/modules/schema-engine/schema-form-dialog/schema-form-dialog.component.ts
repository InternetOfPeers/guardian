import { Component, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { DocumentGenerator, Schema } from '@guardian/interfaces';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { SchemaService } from '../../../services/schema.service';

/**
 * Dialog for creating and editing schemas.
 */
@Component({
    selector: 'schema-form-dialog',
    templateUrl: './schema-form-dialog.component.html',
    styleUrls: ['./schema-form-dialog.component.scss']
})
export class SchemaFormDialog {
    public schema: Schema;
    public started: boolean = false;
    public dataForm: UntypedFormGroup;
    public presetDocument: any;
    public hideFields: any;
    public example: boolean = false;

    public category: string;

    constructor(
        public dialogRef: MatDialogRef<SchemaFormDialog>,
        private fb: UntypedFormBuilder,
        private schemaService: SchemaService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.schema = data.schema || null;
        this.example = data.example || false;
        this.dataForm = fb.group({});
        this.hideFields = {};
        this.category = data.category
    }

    ngOnInit(): void {
        this.getSubSchemes()
    }

    onClose() {
        this.dialogRef.close(null);
    }

    onSave() {
        this.dialogRef.close({exampleDate: this.dataForm?.value, currentSchema: this.schema});
    }

    getSubSchemes() {
        const { topicId, id} = this.schema ?? {};

        this.schemaService.getSchemaWithSubSchemas(this.category, id, topicId).subscribe((data) => {
            if(this.schema && data.schema) {
                this.schema = new Schema(data.schema)
            }

            if (this.example) {
                this.presetDocument = DocumentGenerator.generateDocument(this.schema);
            } else {
                this.presetDocument = null
            }

            this.started = true
        });
    }
}
