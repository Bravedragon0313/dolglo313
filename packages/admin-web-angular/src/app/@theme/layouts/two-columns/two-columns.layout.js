import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile';
let TwoColumnsLayoutComponent = class TwoColumnsLayoutComponent {
    constructor(themeService) {
        this.themeService = themeService;
        this.alive = true;
        this.themeService
            .getJsTheme()
            .pipe(takeWhile(() => this.alive))
            .subscribe((theme) => {
            this.currentTheme = theme.name;
        });
    }
    ngOnDestroy() {
        this.alive = false;
    }
};
TwoColumnsLayoutComponent = __decorate([
    Component({
        selector: 'ngx-two-columns-layout',
        styleUrls: ['./two-columns.layout.scss'],
        templateUrl: './two-columns.layout.html',
    }),
    __metadata("design:paramtypes", [NbThemeService])
], TwoColumnsLayoutComponent);
export { TwoColumnsLayoutComponent };
//# sourceMappingURL=two-columns.layout.js.map