import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
import { TranslateService } from '@ngx-translate/core';
let ProductTitleRedirectComponent = class ProductTitleRedirectComponent {
    constructor(_router, _localeTranslate, translate) {
        this._router = _router;
        this._localeTranslate = _localeTranslate;
        this.translate = translate;
    }
    ngOnInit() {
        this.title = this._localeTranslate.getTranslate(this.rowData.product.title);
    }
    redirect() {
        const productId = this.rowData.id;
        this._router.navigate(['products/list/' + productId]);
    }
};
ProductTitleRedirectComponent = __decorate([
    Component({
        styles: ['a { float: left; }', 'a:hover { color: #4caf508f !important; }'],
        template: ` <a (click)="redirect()">{{ title }}</a> `,
    }),
    __metadata("design:paramtypes", [Router,
        ProductLocalesService,
        TranslateService])
], ProductTitleRedirectComponent);
export { ProductTitleRedirectComponent };
//# sourceMappingURL=product-title-redirect.component.js.map