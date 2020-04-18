import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile';
let ThreeColumnsLayoutComponent = class ThreeColumnsLayoutComponent {
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
ThreeColumnsLayoutComponent = __decorate([
    Component({
        selector: 'ngx-three-columns-layout',
        styleUrls: ['./three-columns.layout.scss'],
        templateUrl: './three-columns.layout.html',
    }),
    __metadata("design:paramtypes", [NbThemeService])
], ThreeColumnsLayoutComponent);
export { ThreeColumnsLayoutComponent };
//# sourceMappingURL=three-columns.layout.js.map