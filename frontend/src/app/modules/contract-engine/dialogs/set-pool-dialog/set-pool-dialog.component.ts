import { Component, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import {
    AbstractControl,
    UntypedFormArray,
    UntypedFormControl,
    UntypedFormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { moreThanZeroValidator } from 'src/app/validators/more-than-zero.validator';
import { MAT_LEGACY_RADIO_DEFAULT_OPTIONS as MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/legacy-radio';
import { Token } from '@guardian/interfaces';
import { TokenService } from 'src/app/services/token.service';
/**
 * Dialog for creating pair.
 */
@Component({
    selector: 'set-pool-dialog',
    templateUrl: './set-pool-dialog.component.html',
    styleUrls: ['./set-pool-dialog.component.scss'],
    providers: [
        {
            provide: MAT_RADIO_DEFAULT_OPTIONS,
            useValue: { color: 'primary' },
        },
    ],
})
export class SetPoolDialogComponent {
    loading: boolean = false;
    _tokenList: Token[] = [];
    immediately: UntypedFormControl;
    tokens: UntypedFormArray;

    form: UntypedFormGroup;

    get tokenControls() {
        return (this.tokens?.controls || []) as UntypedFormGroup[];
    }

    constructor(
        public dialogRef: MatDialogRef<SetPoolDialogComponent>,
        public tokenService: TokenService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
        this.loading = true;
        this.tokenService.getTokens().subscribe((data: any) => {
            this._tokenList = data
                .map((e: any) => new Token(e))
                .filter(
                    (token: Token) => !token.draftToken && token.wipeContractId
                );
            this.loading = false;
        });
        const tokens = new UntypedFormArray(
            [],
            [Validators.required, this.moreThanTokensZeroValidator()]
        );
        const immediately = new UntypedFormControl(true, Validators.required);
        this.form = new UntypedFormGroup(
            {
                tokens,
                immediately,
            },
            Validators.required
        );
        this.tokens = tokens;
        this.immediately = immediately;
    }

    onNoClick(): void {
        this.dialogRef.close(null);
    }

    onCreate() {
        this.dialogRef.close(this.form.value);
    }

    addToken() {
        this.tokens.push(
            new UntypedFormGroup({
                token: new UntypedFormControl('', Validators.required),
                count: new UntypedFormControl(0, [
                    Validators.required,
                    moreThanZeroValidator(),
                ]),
            })
        );
    }

    removeToken(index: number) {
        this.tokens.removeAt(index);
    }

    getTokenList(tokenId: string) {
        const tokens =
            this.tokens.value
                ?.filter((item: { token: string }) => item.token !== tokenId)
                .map((item: { token: any }) => item.token) || [];
        return this._tokenList.filter((item) => !tokens.includes(item.tokenId));
    }

    moreThanTokensZeroValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value || [];
            for (const token of value) {
                const tokenConfig = this._tokenList.find(
                    (item) => item.tokenId === token.token
                );
                if (
                    Math.floor(
                        token.count *
                            Math.pow(10, Number(tokenConfig?.decimals))
                    ) <= 0
                ) {
                    return {
                        lessThanZero: {
                            valid: false,
                        },
                    };
                }
            }
            return null;
        };
    }
}
