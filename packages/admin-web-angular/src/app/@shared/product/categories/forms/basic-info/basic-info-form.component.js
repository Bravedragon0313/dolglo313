import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild, ElementRef, Input, } from '@angular/core';
import { Validators, FormBuilder, } from '@angular/forms';
import isUrl from 'is-url';
import _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
let BasicInfoFormComponent = class BasicInfoFormComponent {
    constructor(fb, _langTranslateService) {
        this.fb = fb;
        this._langTranslateService = _langTranslateService;
        this.form = this.fb.group({
            name: ['', Validators.required],
            image: [
                '',
                [
                    (control) => {
                        const imageUrl = control.value;
                        if (!isUrl(imageUrl) && !_.isEmpty(imageUrl)) {
                            return { invalidUrl: true };
                        }
                        return null;
                    },
                ],
            ],
        });
    }
    get image() {
        return this.form.get('image');
    }
    get name() {
        return this.form.get('name');
    }
    get isFormModelValid() {
        return this.form.valid;
    }
    get showImageMeta() {
        return this.image && this.image.value !== '';
    }
    get usedLanguage() {
        const usedLanguage = this._langTranslateService.currentLang;
        switch (usedLanguage) {
            case 'en-US':
                return 'en-US';
            case 'bg-BG':
                return 'bg-BG';
            case 'he-IL':
                return 'he-IL';
            case 'ru-RU':
                return 'ru-RU';
            case 'es-ES':
                return 'es-ES';
            case 'it-IT':
                return 'it-IT';
            case 'fr-FR':
                return 'fr-FR';
            default:
                return 'en-US';
        }
    }
    get createObject() {
        const usedLanguage = this.usedLanguage;
        const categoryObject = {
            name: [{ locale: usedLanguage, value: this.name.value }],
        };
        if (this.showImageMeta) {
            categoryObject.image = this.image.value;
        }
        return categoryObject;
    }
    getEditObject(currentCategory) {
        const usedLanguage = this.usedLanguage;
        const newCategoryNames = currentCategory._nameLocaleValues.map(({ locale, value }) => {
            return locale === usedLanguage
                ? {
                    locale: usedLanguage,
                    value: this.name.value,
                }
                : { locale, value };
        });
        if (!newCategoryNames.some((c) => c.locale === usedLanguage)) {
            newCategoryNames.push({
                locale: usedLanguage,
                value: this.name.value,
            });
        }
        const categoryRaw = {
            name: newCategoryNames,
            image: this.image.value,
        };
        return categoryRaw;
    }
    ngOnInit() {
        if (this.category) {
            this.name.setValue(this.category.title);
            this.image.setValue(this.category.image);
        }
        this.getUploaderPlaceholderText();
    }
    deleteImg() {
        this.image.setValue('');
    }
    ngAfterViewInit() {
        this._setupLogoUrlValidation();
    }
    getUploaderPlaceholderText() {
        return __awaiter(this, void 0, void 0, function* () {
            this.uploaderPlaceholder = yield this._langTranslateService
                .get('CATEGORY_VIEW.CREATE.PHOTO_OPTIONAL')
                .pipe(first())
                .toPromise();
        });
    }
    _setupLogoUrlValidation() {
        this.imagePreviewElement.nativeElement.onload = () => {
            this.image.setErrors(null);
        };
        this.imagePreviewElement.nativeElement.onerror = () => {
            if (this.showImageMeta) {
                this.image.setErrors({ invalidUrl: true });
            }
        };
    }
};
__decorate([
    ViewChild('imagePreview', { static: true }),
    __metadata("design:type", ElementRef)
], BasicInfoFormComponent.prototype, "imagePreviewElement", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BasicInfoFormComponent.prototype, "category", void 0);
BasicInfoFormComponent = __decorate([
    Component({
        selector: 'ea-product-category-basic-info-form',
        templateUrl: 'basic-info-form.component.html',
        styleUrls: ['basic-info-form.component.scss'],
    }),
    __metadata("design:paramtypes", [FormBuilder,
        TranslateService])
], BasicInfoFormComponent);
export { BasicInfoFormComponent };
//# sourceMappingURL=basic-info-form.component.js.map