import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { NbLayoutDirection, NbLayoutDirectionService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile';
let LayoutDirectionSwitcherComponent = class LayoutDirectionSwitcherComponent {
    constructor(directionService) {
        this.directionService = directionService;
        this.directions = NbLayoutDirection;
        this.alive = true;
        this.vertical = false;
        this.currentDirection = this.directionService.getDirection();
        this.directionService
            .onDirectionChange()
            .pipe(takeWhile(() => this.alive))
            .subscribe((newDirection) => (this.currentDirection = newDirection));
    }
    toggleDirection(newDirection) {
        this.directionService.setDirection(newDirection);
    }
    ngOnDestroy() {
        this.alive = false;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], LayoutDirectionSwitcherComponent.prototype, "vertical", void 0);
LayoutDirectionSwitcherComponent = __decorate([
    Component({
        selector: 'ngx-layout-direction-switcher',
        templateUrl: './layout-direction-switcher.component.html',
    }),
    __metadata("design:paramtypes", [NbLayoutDirectionService])
], LayoutDirectionSwitcherComponent);
export { LayoutDirectionSwitcherComponent };
//# sourceMappingURL=layout-direction-switcher.component.js.map