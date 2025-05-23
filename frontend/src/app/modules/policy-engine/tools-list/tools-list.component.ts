import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenerateUUIDv4, IUser, SchemaHelper, TagType, UserPermissions } from '@guardian/interfaces';
import { forkJoin } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/modules/common/confirmation-dialog/confirmation-dialog.component';
import { InformService } from 'src/app/services/inform.service';
import { ProfileService } from 'src/app/services/profile.service';
import { TagsService } from 'src/app/services/tag.service';
import { ToolsService } from 'src/app/services/tools.service';
import { CompareModulesDialogComponent } from '../dialogs/compare-modules-dialog/compare-modules-dialog.component';
import { ExportPolicyDialog } from '../dialogs/export-policy-dialog/export-policy-dialog.component';
import { NewModuleDialog } from '../dialogs/new-module-dialog/new-module-dialog.component';
import { PreviewPolicyDialog } from '../dialogs/preview-policy-dialog/preview-policy-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { IImportEntityResult, ImportEntityDialog, ImportEntityType } from '../../common/import-entity-dialog/import-entity-dialog.component';

enum OperationMode {
    None,
    Create,
    Import,
    Publish,
    Delete
}

/**
 * Component for choosing a policy and
 * display blocks of the selected policy
 */
@Component({
    selector: 'app-tools-list',
    templateUrl: './tools-list.component.html',
    styleUrls: ['./tools-list.component.scss']
})
export class ToolsListComponent implements OnInit, OnDestroy {
    public loading: boolean = true;
    public user: UserPermissions = new UserPermissions();
    public isConfirmed: boolean = false;
    public tools: any[] | null;
    public toolsCount: any;
    public pageIndex: number;
    public pageSize: number;
    public columns: string[] = [
        'name',
        'description',
        'topic',
        'tags',
        'schemas',
        'status',
        'operation',
        'operations'
    ];
    public mode: OperationMode = OperationMode.None;
    public taskId: string | undefined = undefined;
    public expectedTaskMessages: number = 0;
    public tagEntity = TagType.Tool;
    public owner: any;
    public tagSchemas: any[] = [];
    public canPublishAnyTool: boolean = false;

    constructor(
        public tagsService: TagsService,
        private profileService: ProfileService,
        private toolsService: ToolsService,
        private dialog: DialogService,
        private dialogService: DialogService,
        private informService: InformService,
        private router: Router,
    ) {
        this.tools = null;
        this.pageIndex = 0;
        this.pageSize = 10;
        this.toolsCount = 0;
    }

    ngOnInit() {
        this.loading = true;
        this.loadTools();
    }

    ngOnDestroy() {

    }

    private loadTools() {
        this.tools = null;
        this.isConfirmed = false;
        this.loading = true;
        forkJoin([
            this.profileService.getProfile(),
            this.tagsService.getPublishedSchemas()
        ]).subscribe((value) => {
            const profile: IUser | null = value[0];
            const tagSchemas: any[] = value[1] || [];

            this.isConfirmed = !!(profile && profile.confirmed);
            this.owner = profile?.did;
            this.tagSchemas = SchemaHelper.map(tagSchemas);
            this.user = new UserPermissions(profile);

            if (this.isConfirmed) {
                this.loadAllTools();
            } else {
                setTimeout(() => {
                    this.loading = false;
                }, 500);
            }
        }, (e) => {
            this.loading = false;
        });
    }

    private loadAllTools() {
        this.loading = true;
        this.toolsService.page(this.pageIndex, this.pageSize).subscribe((policiesResponse) => {
            this.tools = policiesResponse.body || [];
            this.toolsCount = policiesResponse.headers.get('X-Total-Count') || this.tools.length;
            this.canPublishAnyTool = this.tools.some(tool => tool.status === 'DRAFT');
            this.loadTagsData();
        }, (e) => {
            this.loading = false;
        });
    }

    private loadTagsData() {
        if (this.user.TAGS_TAG_READ) {
            const ids = this.tools?.map(e => e.id) || [];
            this.tagsService.search(this.tagEntity, ids).subscribe((data) => {
                if (this.tools) {
                    for (const policy of this.tools) {
                        (policy as any)._tags = data[policy.id];
                    }
                }
                setTimeout(() => {
                    this.loading = false;
                }, 500);
            }, (e) => {
                console.error(e.error);
                this.loading = false;
            });
        } else {
            setTimeout(() => {
                this.loading = false;
            }, 500);
        }
    }

    public onPage(event: any) {
        if (this.pageSize != event.pageSize) {
            this.pageIndex = 0;
            this.pageSize = event.pageSize;
        } else {
            this.pageIndex = event.pageIndex;
            this.pageSize = event.pageSize;
        }
        this.loadAllTools();
    }

    private importDetails(result: IImportEntityResult) {
        const { type, data, tool } = result;
        const dialogRef = this.dialogService.open(PreviewPolicyDialog, {
            header: 'Import tool',
            width: '720px',
            styleClass: 'guardian-dialog',
            showHeader: false,
            data: {
                title: 'Import tool',
                tool: tool,
                isFile: type === 'file'
            }
        });
        dialogRef.onClose.subscribe(async (result) => {
            if (result) {
                if (type === 'message') {
                    this.loading = true;
                    this.toolsService.importByMessage(data, {
                        tools: result.tools
                    }).subscribe(
                        (result) => {
                            this.loadAllTools();
                        }, (e) => {
                            this.loading = false;
                        });
                } else if (type === 'file') {
                    this.loading = true;
                    this.toolsService.importByFile(data, {
                        tools: result.tools
                    }).subscribe(
                        (result) => {
                            this.loadAllTools();
                        }, (e) => {
                            this.loading = false;
                        });
                }
            }
        });
    }

    public importTool(messageId?: string) {
        const dialogRef = this.dialogService.open(ImportEntityDialog, {
            showHeader: false,
            width: '720px',
            styleClass: 'guardian-dialog',
            data: {
                type: ImportEntityType.Tool,
                timeStamp: messageId
            }
        });
        dialogRef.onClose.subscribe(async (result: IImportEntityResult | null) => {
            if (result) {
                this.importDetails(result);
            }
        });
    }

    public compareTools(element?: any) {
        const dialogRef = this.dialogService.open(CompareModulesDialogComponent, {
            width: '650px',
            header: 'Compare Tools',
            styleClass: 'custom-dialog',
            closable: true,
            data: {
                type: 'Tool',
                tools: this.tools,
            }
        });
        dialogRef.onClose.subscribe(async (result) => {
            if (result && result.itemId1 && result.itemId2) {
                const items = btoa(JSON.stringify({
                    parent: null,
                    items: [
                        result.itemId1,
                        result.itemId2
                    ].map((id) => {
                        return {
                            type: 'id',
                            value: id
                        }
                    })
                }));
                this.router.navigate(['/compare'], {
                    queryParams: {
                        type: 'tool',
                        items
                    }
                });
            }
        });
    }

    public exportTool(element: any) {
        this.loading = true;
        this.toolsService.exportInMessage(element.id)
            .subscribe(tool => {
                this.loading = false;
                this.dialogService.open(ExportPolicyDialog, {
                    showHeader: false,
                    header: 'Export Tool',
                    width: '700px',
                    styleClass: 'guardian-dialog',
                    data: {
                        tool
                    },
                })
            });
    }

    public newTool() {
        const dialogRef = this.dialogService.open(NewModuleDialog, {
            width: '650px',
            styleClass: 'custom-dialog',
            header: 'New Tool',
            closable: true,
            data: {
                type: 'tool'
            }
        });
        dialogRef.onClose.subscribe(async (result) => {
            if (result) {
                const tool = {
                    name: result.name,
                    description: result.description,
                    menu: "show",
                    config: {
                        id: GenerateUUIDv4(),
                        blockType: 'tool'
                    }
                }
                this.loading = true;
                this.toolsService.pushCreate(tool).subscribe((result) => {
                    const { taskId, expectation } = result;
                    this.router.navigate(['/task', taskId]);
                }, (e) => {
                    this.loading = false;
                });
            }
        });
    }

    public deleteTool(element: any) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                dialogTitle: 'Delete tool',
                dialogText: 'Are you sure to delete tool?'
            },
            modal: true,
            closable: false,
        });
        dialogRef.onClose.subscribe((result) => {
            if (!result) {
                return;
            }
            this.loading = true;
            this.toolsService.delete(element.id).subscribe((result) => {
                this.loadAllTools();
            }, (e) => {
                this.loading = false;
            });
        });
    }

    public publishTool(element: any) {
        this.loading = true;
        this.toolsService.pushPublish(element.id).subscribe((result) => {
            const { taskId, expectation } = result;
            this.router.navigate(['task', taskId], {
                queryParams: {
                    last: btoa(location.href)
                }
            });
        }, (e) => {
            this.loading = false;
        });
    }
}
