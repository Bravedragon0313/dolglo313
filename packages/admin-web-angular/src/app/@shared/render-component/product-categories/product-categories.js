import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
let ProductCategoriesComponent = class ProductCategoriesComponent {
    constructor(_localeTranslate) {
        this._localeTranslate = _localeTranslate;
        this.categoriesArr = [];
    }
    ngOnInit() {
        this.getCategories();
    }
    getCategories() {
        if (this.rowData.allCategories) {
            this.categoriesArr = this.rowData.allCategories.filter((category) => this.rowData.categories.ids.includes(category.id));
        }
    }
    getTranslates(categoryName) {
        return this._localeTranslate.getTranslate(categoryName);
    }
};
ProductCategoriesComponent = __decorate([
    Component({
        styles: [
            `
			div {
				padding-bottom: 4px;
			}

			div img {
				width: 40px;
				height: 40px;
			}
		`,
        ],
        templateUrl: './product-categories.html',
    }),
    __metadata("design:paramtypes", [ProductLocalesService])
], ProductCategoriesComponent);
export { ProductCategoriesComponent };
//# sourceMappingURL=product-categories.js.map