import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
let PagesComponent = class PagesComponent {
    constructor(translate) {
        this.translate = translate;
        this.initialize();
        this._applyTranslationOnSmartTable();
    }
    initialize() {
        this.menu = [
            {
                title: this.getTranslation('MENU_VIEW.DASHBOARD'),
                icon: 'pie-chart-outline',
                link: '/dashboard',
                pathMatch: 'prefix',
            },
            {
                title: this.getTranslation('MENU_VIEW.STORES'),
                icon: 'home-outline',
                link: '/stores',
                pathMatch: 'prefix',
            },
            {
                title: this.getTranslation('MENU_VIEW.PRODUCTS.PRODUCTS'),
                icon: 'shopping-cart-outline',
                link: '/products',
                children: [
                    {
                        title: this.getTranslation('MENU_VIEW.PRODUCTS.MANAGEMENT'),
                        link: '/products/list',
                    },
                    {
                        title: this.getTranslation('MENU_VIEW.PRODUCTS.CATEGORIES'),
                        link: '/products/categories',
                        pathMatch: 'prefix',
                    },
                ],
            },
            {
                title: this.getTranslation('MENU_VIEW.CUSTOMERS.CUSTOMERS'),
                icon: 'person-outline',
                link: '/customers',
                children: [
                    {
                        title: this.getTranslation('MENU_VIEW.CUSTOMERS.MANAGEMENT'),
                        link: '/customers/list',
                    },
                    {
                        title: this.getTranslation('MENU_VIEW.CUSTOMERS.INVITES'),
                        link: '/customers/invites',
                        pathMatch: 'prefix',
                    },
                ],
            },
            {
                title: this.getTranslation('MENU_VIEW.CARRIERS'),
                icon: 'car-outline',
                link: '/carriers',
                pathMatch: 'prefix',
            },
            {
                title: this.getTranslation('MENU_VIEW.SIMULATION'),
                icon: 'star-outline',
                link: '/simulation',
                pathMatch: 'prefix',
                home: true,
            },
            {
                title: this.getTranslation('MENU_VIEW.SETUP'),
                icon: 'settings-2-outline',
                link: '/setup',
                pathMatch: 'prefix',
            },
        ];
    }
    getTranslation(prefix) {
        let result = '';
        this.translate.get(prefix).subscribe((res) => {
            result = res;
        });
        return result;
    }
    _applyTranslationOnSmartTable() {
        this.translate.onLangChange.subscribe(() => {
            this.initialize();
        });
    }
};
PagesComponent = __decorate([
    Component({
        selector: 'ea-pages',
        templateUrl: './pages.component.html',
    }),
    __metadata("design:paramtypes", [TranslateService])
], PagesComponent);
export { PagesComponent };
//# sourceMappingURL=pages.component.js.map