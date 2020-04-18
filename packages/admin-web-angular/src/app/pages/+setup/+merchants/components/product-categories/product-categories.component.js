import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { first } from 'rxjs/operators';
import { ProductsCategoryService } from '@app/@core/data/productsCategory.service';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
import { BasicInfoFormComponent } from '@app/@shared/product/categories/forms/basic-info';
import { NotifyService } from '@app/@core/services/notify/notify.service';
import { CategoriesTableComponent } from '@app/@shared/product/categories/categories-table';
let SetupMerchantProductCategoriesComponent = class SetupMerchantProductCategoriesComponent {
    constructor(productsCategoryService, notifyService, productLocalesService) {
        this.productsCategoryService = productsCategoryService;
        this.notifyService = notifyService;
        this.productLocalesService = productLocalesService;
        this.previousStep = new EventEmitter();
        this.nextStep = new EventEmitter();
        this.productCategories = [];
        this.showPerPage = 3;
        this.mutationType = 'add';
        this._showMutationForm = false;
    }
    get isValidForm() {
        let res = false;
        if (this.basicInfo) {
            res = this.basicInfo.form.valid;
        }
        return res;
    }
    get isInvalidValidForm() {
        let res = false;
        if (this.basicInfo) {
            res = this.basicInfo.form.invalid;
        }
        return res;
    }
    get showMutationForm() {
        return this._showMutationForm;
    }
    set showMutationForm(isShow) {
        this._showMutationForm = isShow;
        this.currentCategory = null;
        this.mutationType = 'add';
        if (!isShow) {
            this.loadCategories();
        }
    }
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield this.productsCategoryService
                    .create(this.basicInfo.createObject)
                    .pipe(first())
                    .toPromise();
                this.productCategories.unshift(category);
                const message = `Category ${this.localeTranslate(this.basicInfo.createObject.name)} is added!`;
                this.notifyService.success(message);
                this.showMutationForm = false;
            }
            catch (err) {
                const message = `Something went wrong!`;
                const body = err.message
                    ? '\n' + `Error message: ${err.message}`
                    : '';
                this.notifyService.error(message, body);
            }
        });
    }
    edit() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const editObj = this.basicInfo.getEditObject(this.currentCategory);
                const category = yield this.productsCategoryService
                    .update(this.currentCategory.id, editObj)
                    .pipe(first())
                    .toPromise();
                this.productCategories = this.productCategories.filter((c) => c.id !== category.id);
                this.productCategories.unshift(category);
                const message = `Category ${this.localeTranslate(this.basicInfo.createObject.name)} is edited`;
                this.notifyService.success(message);
                this.showMutationForm = false;
            }
            catch (err) {
                const message = `Something went wrong!`;
                const body = err.message
                    ? '\n' + `Error message: ${err.message}`
                    : '';
                this.notifyService.error(message, body);
            }
        });
    }
    loadCategories() {
        if (this.productCategories.length > 0) {
            this.categoriesTable.loadDataSmartTable(this.productCategories);
        }
    }
    removeCategory(category) {
        this.productCategories = this.productCategories.filter((c) => c.id !== category.id);
        this.loadCategories();
    }
    editCategory(category) {
        this.showMutationForm = true;
        this.mutationType = 'edit';
        this.currentCategory = category;
    }
    localeTranslate(member) {
        return this.productLocalesService.getTranslate(member);
    }
};
__decorate([
    ViewChild('basicInfo'),
    __metadata("design:type", BasicInfoFormComponent)
], SetupMerchantProductCategoriesComponent.prototype, "basicInfo", void 0);
__decorate([
    ViewChild('categoriesTable'),
    __metadata("design:type", CategoriesTableComponent)
], SetupMerchantProductCategoriesComponent.prototype, "categoriesTable", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SetupMerchantProductCategoriesComponent.prototype, "previousStep", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SetupMerchantProductCategoriesComponent.prototype, "nextStep", void 0);
SetupMerchantProductCategoriesComponent = __decorate([
    Component({
        selector: 'ea-merchants-setup-product-categories',
        templateUrl: './product-categories.component.html',
        styleUrls: ['./product-categories.component.scss'],
    }),
    __metadata("design:paramtypes", [ProductsCategoryService,
        NotifyService,
        ProductLocalesService])
], SetupMerchantProductCategoriesComponent);
export { SetupMerchantProductCategoriesComponent };
//# sourceMappingURL=product-categories.component.js.map