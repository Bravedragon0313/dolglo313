import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Output, ViewChild, Input, } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BasicInfoFormComponent } from '@app/@shared/product/forms/basic-info/basic-info-form.component';
import { ProductsCategoryService } from '@app/@core/data/productsCategory.service';
import { first } from 'rxjs/operators';
import { ProductsService } from '@app/@core/data/products.service';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
import Product from '@modules/server.common/entities/Product';
let SetupMerchantProductMutationComponent = class SetupMerchantProductMutationComponent {
    constructor(_formBuilder, _productsService, _productLocalesService, _productsCategoryService) {
        this._formBuilder = _formBuilder;
        this._productsService = _productsService;
        this._productLocalesService = _productLocalesService;
        this._productsCategoryService = _productsCategoryService;
        this.onCreate = new EventEmitter();
        this.onEdit = new EventEmitter();
        this.areCategoriesLoaded = false;
        this.form = this._formBuilder.group({
            basicInfo: BasicInfoFormComponent.buildForm(this._formBuilder),
        });
        this.basicInfo = this.form.get('basicInfo');
        this.loadProductCategories();
    }
    loadProductCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.productsCategories = yield this._productsCategoryService
                    .getCategories()
                    .pipe(first())
                    .toPromise();
            }
            catch (error) {
                console.warn(`Error during load product categories. message: ${error.message}`);
            }
            this.areCategoriesLoaded = true;
        });
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            const productCreateObject = yield this.basicInfoForm.setupProductCreateObject();
            try {
                const product = yield this._productsService
                    .create(productCreateObject)
                    .pipe(first())
                    .toPromise();
                this.onCreate.emit({
                    id: product.id,
                    title: this._productLocalesService.getMemberValue(product.title),
                    image: this._productLocalesService.getMemberValue(product.images),
                });
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.basicInfoForm.setupProductCreateObject();
                yield this._productsService
                    .save(Object.assign({ _id: this.product._id }, res))
                    .pipe(first())
                    .toPromise();
                this.onEdit.emit(true);
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
};
__decorate([
    ViewChild('basicInfoForm', { static: true }),
    __metadata("design:type", BasicInfoFormComponent)
], SetupMerchantProductMutationComponent.prototype, "basicInfoForm", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SetupMerchantProductMutationComponent.prototype, "onCreate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SetupMerchantProductMutationComponent.prototype, "onEdit", void 0);
__decorate([
    Input(),
    __metadata("design:type", Product)
], SetupMerchantProductMutationComponent.prototype, "product", void 0);
SetupMerchantProductMutationComponent = __decorate([
    Component({
        selector: 'ea-merchants-setup-product-mutation',
        templateUrl: './product-mutation.component.html',
    }),
    __metadata("design:paramtypes", [FormBuilder,
        ProductsService,
        ProductLocalesService,
        ProductsCategoryService])
], SetupMerchantProductMutationComponent);
export { SetupMerchantProductMutationComponent };
//# sourceMappingURL=product-mutation.component.js.map