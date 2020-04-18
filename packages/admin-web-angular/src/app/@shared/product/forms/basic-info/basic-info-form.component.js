var BasicInfoFormComponent_1;
import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, Input, ViewChild, ElementRef, } from '@angular/core';
import { FormGroup, Validators, } from '@angular/forms';
import Product from '@modules/server.common/entities/Product';
import { Subject } from 'rxjs';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
import { FormHelpers } from '../../../forms/helpers';
import _ from 'lodash';
import isUrl from 'is-url';
import { takeUntil, first } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
let BasicInfoFormComponent = BasicInfoFormComponent_1 = class BasicInfoFormComponent {
    constructor(_productLocalesService, _translateService) {
        this._productLocalesService = _productLocalesService;
        this._translateService = _translateService;
        this.actualCategories = [];
        this._ngDestroy$ = new Subject();
        this.images = [];
        this.getUploaderPlaceholderText();
    }
    static hasValidImage(images) {
        if (images) {
            let imageUrls = images.toString().split(/\s+/);
            imageUrls = imageUrls.filter((a) => a.toString().trim() !== '');
            if (imageUrls.length > 0) {
                for (const imageUrl of imageUrls) {
                    if (isUrl(imageUrl)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    static buildForm(formBuilder) {
        return formBuilder.group({
            title: ['', [Validators.required, Validators.maxLength(255)]],
            description: ['', [Validators.required, Validators.maxLength(255)]],
            details: [''],
            locale: ['', Validators.required],
            selectedProductCategories: [[]],
            image: [
                '',
                [
                    Validators.required,
                    (control) => {
                        const value = control.value;
                        const hasImage = BasicInfoFormComponent_1.hasValidImage(value);
                        if (hasImage) {
                            return null;
                        }
                        else {
                            return { invalidImageUrl: true };
                        }
                    },
                ],
            ],
        });
    }
    get imageControl() {
        return this.form.get('image');
    }
    get imagesUrls() {
        return this.images ? this.images.map((i) => i.url).join(' ') : '';
    }
    get imagesArr() {
        if (this.imagesUrls) {
            const imagesStr = this.imagesUrls;
            let imageUrls = imagesStr.split(/\s+/);
            imageUrls = imageUrls.filter((a) => a.trim() !== '');
            return imageUrls;
        }
        return null;
    }
    ngOnInit() {
        if (this.productCategories) {
            this.categoryOptions = this.productCategories.map((category) => {
                return {
                    id: category.id,
                    name: category.name[0].value,
                };
            });
        }
        this._bindFormControls();
        this._setDefaultLocaleValue();
        this.onLocaleChanges = this.locale.valueChanges
            .pipe(takeUntil(this._ngDestroy$))
            .subscribe((v) => {
            if (v !== this._productLocalesService.currentLocale) {
                this._productLocalesService.currentLocale = v;
                this.setValue(this.product);
            }
        });
        this.laodData();
    }
    ngOnDestroy() {
        this.onLocaleChanges.unsubscribe();
        this.form.reset();
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
    }
    deleteImg(image) {
        this.images = this.images.filter((i) => i.url !== image);
        this.image.setValue(this.imagesUrls);
    }
    addImageObj(imgData) {
        this.uploaderChanged = true;
        if (imgData) {
            const existData = this.images.find((i) => i.url === imgData.url);
            if (!existData) {
                this.images.push(imgData);
                this.image.setValue(imgData.url);
            }
        }
    }
    getValue() {
        return this.form.getRawValue();
    }
    setValue(product) {
        if (this.productCategories) {
            this.categoryOptions = this.productCategories.map((category) => {
                return {
                    id: category.id,
                    name: category.name[0].value,
                };
            });
        }
        FormHelpers.deepMark(this.form, 'dirty');
        if (!this.product) {
            this.product = product;
        }
        if (this.product) {
            let image = '';
            const imgs = product.images.filter((i) => i.locale === this.locale.value);
            if (imgs) {
                image = imgs.map((i) => i.url).join(' ');
            }
            this.images = imgs;
            const product1 = {
                title: this._productLocalesService.getMemberValue(product.title),
                description: this._productLocalesService.getMemberValue(product.description),
                details: this._productLocalesService.getMemberValue(product.details),
                image,
                locale: this.locale.value,
                selectedProductCategories: [...this.product.categories],
            };
            this.form.setValue(_.pick(product1, Object.keys(this.getValue())));
        }
    }
    setupProductCreateObject() {
        return __awaiter(this, void 0, void 0, function* () {
            this._bindModelProperties();
            const productLocale = this._locale;
            const productImages = this.images.filter((i) => i.locale === productLocale && isUrl(i.url));
            const productTitle = {
                locale: productLocale,
                value: this._title,
            };
            const productDescription = {
                locale: productLocale,
                value: this._description,
            };
            const productDetails = {
                locale: productLocale,
                value: this._details || '',
            };
            let productCreateObject = {
                title: [productTitle],
                description: [productDescription],
                details: [productDetails],
                categories: this.actualCategories.map((c) => {
                    return {
                        _id: c.id,
                        name: c.name,
                    };
                }),
                images: productImages,
            };
            if (this.product) {
                productCreateObject = {
                    title: [
                        ...this.product.title
                            .filter((t) => t.locale !== this._locale)
                            .map((t) => ({ locale: t.locale, value: t.value })),
                        productTitle,
                    ],
                    description: [
                        ...this.product.description
                            .filter((d) => d.locale !== this._locale)
                            .map((d) => ({ locale: d.locale, value: d.value })),
                        productDescription,
                    ],
                    details: [
                        ...this.product.details
                            .filter((d) => d.locale !== this._locale)
                            .map((d) => ({ locale: d.locale, value: d.value })),
                        productDetails,
                    ],
                    categories: this.actualCategories.map((c) => {
                        return {
                            _id: c.id,
                            name: c.name,
                        };
                    }),
                    images: [
                        ...this.product.images
                            .filter((i) => i.locale !== this._locale)
                            .map((i) => this.getProductImage(i)),
                        ...productImages.map((i) => this.getProductImage(i)),
                    ],
                };
            }
            return productCreateObject;
        });
    }
    imgOnLoad() {
        this.imageControl.setErrors(null);
    }
    imgOnError() {
        if (this.imageControl.value !== '') {
            const hasImage = BasicInfoFormComponent_1.hasValidImage(this.image.value);
            if (hasImage) {
                this.imageControl.setErrors(null);
            }
            else {
                this.imageControl.setErrors({ invalidUrl: true });
            }
        }
    }
    _setDefaultLocaleValue() {
        this.locale.setValue('en-US');
    }
    _bindFormControls() {
        this.title = this._getFormControlByName('title');
        this.description = this._getFormControlByName('description');
        this.details = this._getFormControlByName('details');
        this.image = this._getFormControlByName('image');
        this.category = this._getFormControlByName('category');
        this.locale = this._getFormControlByName('locale');
        this.selectedProductCategories = this._getFormControlByName('selectedProductCategories');
    }
    _getFormControlByName(controlName) {
        return this.form.get(controlName);
    }
    _bindModelProperties() {
        const getInputVal = (name) => this._getFormControlByName(name).value;
        this._selectedProductCategories = getInputVal('selectedProductCategories');
        this.actualCategories = [];
        if (this._selectedProductCategories) {
            for (const val of this._selectedProductCategories) {
                for (const val1 of this.productCategories) {
                    if (val === val1.id) {
                        const newObj = {};
                        newObj.name = [];
                        newObj.id = val1.id;
                        for (let i = 0; i < val1.name.length; i++) {
                            newObj.name[i] = {};
                            newObj.name[i].locale = val1.name[i].locale;
                            newObj.name[i].value = val1.name[i].value;
                        }
                        this.actualCategories.push(newObj);
                    }
                }
            }
        }
        this._title = getInputVal('title');
        this._description = getInputVal('description');
        this._details = getInputVal('details');
        this._image = getInputVal('image');
        this._locale = getInputVal('locale');
    }
    getUploaderPlaceholderText() {
        return __awaiter(this, void 0, void 0, function* () {
            this.uploaderPlaceholder = yield this._translateService
                .get('WAREHOUSE_VIEW.PLACEHOLDER.IMAGE_URL')
                .pipe(first())
                .toPromise();
        });
    }
    getProductImage(data) {
        return {
            locale: data.locale,
            url: data.url,
            orientation: data.orientation,
            width: data.width,
            height: data.height,
        };
    }
    laodData() {
        if (this.currentProduct) {
            this.setValue(this.currentProduct);
        }
    }
};
__decorate([
    ViewChild('fileInput'),
    __metadata("design:type", Object)
], BasicInfoFormComponent.prototype, "fileInput", void 0);
__decorate([
    ViewChild('productImagePreview'),
    __metadata("design:type", ElementRef)
], BasicInfoFormComponent.prototype, "productImagePreview", void 0);
__decorate([
    Input(),
    __metadata("design:type", FormGroup)
], BasicInfoFormComponent.prototype, "form", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BasicInfoFormComponent.prototype, "productCategories", void 0);
__decorate([
    Input(),
    __metadata("design:type", Product)
], BasicInfoFormComponent.prototype, "currentProduct", void 0);
BasicInfoFormComponent = BasicInfoFormComponent_1 = __decorate([
    Component({
        selector: 'ea-product-basic-info-form',
        styleUrls: ['./basic-info-form.component.scss'],
        templateUrl: 'basic-info-form.component.html',
    }),
    __metadata("design:paramtypes", [ProductLocalesService,
        TranslateService])
], BasicInfoFormComponent);
export { BasicInfoFormComponent };
//# sourceMappingURL=basic-info-form.component.js.map