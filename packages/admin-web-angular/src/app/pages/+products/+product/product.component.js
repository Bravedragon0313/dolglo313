import { __awaiter, __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../@core/data/products.service';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ProductsCategoryService } from '../../../@core/data/productsCategory.service';
import { Location } from '@angular/common';
let ProductComponent = class ProductComponent {
    constructor(translateService, _location, _router, _productsService, _productLocalesService, productsCategoryService) {
        this.translateService = translateService;
        this._location = _location;
        this._router = _router;
        this._productsService = _productsService;
        this._productLocalesService = _productLocalesService;
        this.productsCategoryService = productsCategoryService;
        this._ngDestroy$ = new Subject();
        this.productCategoriesArr = [];
        this._router.params
            .pipe(first())
            .toPromise()
            .then((res) => {
            this._productId = res.id;
        });
        this.getAllCategories();
    }
    get showCategories() {
        return this.product && this.product.categories.length > 0;
    }
    ngOnInit() {
        this._loadProduct();
        this._setProductLanguage();
        this.productCategoriesArr = this.allCategories;
    }
    ngOnDestroy() {
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
    }
    getLanguageFullName(langAbbreviation) {
        switch (langAbbreviation) {
            case 'en-US':
                return 'English';
            case 'bg-BG':
                return 'Български';
            case 'he-IL':
                return 'עברית';
            case 'ru-RU':
                return 'Русский';
            case 'es-ES':
                return 'Spanish';
            case 'it-IT':
                return 'Italian';
            case 'fr-FR':
                return 'French';
        }
    }
    getTranslatedValue(member) {
        return this._productLocalesService.getTranslate(member, this.productLangToShow);
    }
    getCategories(categories) {
        return categories
            .map((c) => this.getTranslatedValue(c.name))
            .join(', ');
    }
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            this.allCategories = yield this.productsCategoryService
                .getCategories()
                .pipe(first())
                .toPromise();
        });
    }
    getTranslates(categoryName) {
        return this._productLocalesService.getTranslate(categoryName);
    }
    onProductLangChange(selectedLanguage) {
        this.productLangToShow = selectedLanguage;
    }
    getProductCategories(categoriesID) {
        this.productCategoriesArr = this.allCategories.filter((c) => categoriesID.includes(c.id));
    }
    back() {
        this._location.back();
    }
    _loadProduct() {
        this._productsService
            .getProductById(this._productId)
            .pipe(takeUntil(this._ngDestroy$))
            .subscribe((p) => {
            this.product = p;
            this.getProductCategories(p.categories);
        });
    }
    _setProductLanguage() {
        this.productLangToShow = this.translateService.currentLang;
    }
};
ProductComponent = __decorate([
    Component({
        selector: 'ea-product',
        templateUrl: './product.component.html',
        styleUrls: ['./product.component.scss'],
    }),
    __metadata("design:paramtypes", [TranslateService,
        Location,
        ActivatedRoute,
        ProductsService,
        ProductLocalesService,
        ProductsCategoryService])
], ProductComponent);
export { ProductComponent };
//# sourceMappingURL=product.component.js.map