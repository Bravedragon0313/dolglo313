import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile';
let OneColumnLayoutComponent = class OneColumnLayoutComponent {
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
OneColumnLayoutComponent = __decorate([
    Component({
        selector: 'ngx-one-column-layout',
        styleUrls: ['./one-column.layout.scss'],
        templateUrl: './one-column.layout.html',
    }),
    __metadata("design:paramtypes", [NbThemeService])
], OneColumnLayoutComponent);
export { OneColumnLayoutComponent };
//# sourceMappingURL=one-column.layout.js.map