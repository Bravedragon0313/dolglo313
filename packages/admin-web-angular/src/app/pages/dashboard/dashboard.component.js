import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile';
let DashboardComponent = class DashboardComponent {
    constructor(themeService) {
        this.themeService = themeService;
        this.alive = true;
        this.lightCard = {
            title: 'Light',
            iconClass: 'nb-lightbulb',
            type: 'primary',
        };
        this.rollerShadesCard = {
            title: 'Roller Shades',
            iconClass: 'nb-roller-shades',
            type: 'success',
        };
        this.wirelessAudioCard = {
            title: 'Wireless Audio',
            iconClass: 'nb-audio',
            type: 'info',
        };
        this.coffeeMakerCard = {
            title: 'Coffee Maker',
            iconClass: 'nb-coffee-maker',
            type: 'warning',
        };
        this.commonStatusCardsSet = [
            this.lightCard,
            this.rollerShadesCard,
            this.wirelessAudioCard,
            this.coffeeMakerCard,
        ];
        this.statusCardsByThemes = {
            default: this.commonStatusCardsSet,
            cosmic: this.commonStatusCardsSet,
            corporate: [
                Object.assign(Object.assign({}, this.lightCard), { type: 'warning' }),
                Object.assign(Object.assign({}, this.rollerShadesCard), { type: 'primary' }),
                Object.assign(Object.assign({}, this.wirelessAudioCard), { type: 'danger' }),
                Object.assign(Object.assign({}, this.coffeeMakerCard), { type: 'secondary' }),
            ],
        };
        this.themeService
            .getJsTheme()
            .pipe(takeWhile(() => this.alive))
            .subscribe((theme) => {
            this.statusCards = this.statusCardsByThemes[theme.name];
        });
    }
    ngOnDestroy() {
        this.alive = false;
    }
};
DashboardComponent = __decorate([
    Component({
        selector: 'ngx-dashboard',
        styleUrls: ['./dashboard.component.scss'],
        templateUrl: './dashboard.component.html',
    }),
    __metadata("design:paramtypes", [NbThemeService])
], DashboardComponent);
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map