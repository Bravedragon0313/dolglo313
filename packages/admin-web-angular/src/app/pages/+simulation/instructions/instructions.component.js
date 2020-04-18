import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
export var Step;
(function (Step) {
    Step[Step["One"] = 0] = "One";
    Step[Step["Two"] = 1] = "Two";
    Step[Step["Three"] = 2] = "Three";
})(Step || (Step = {}));
let SimulationInstructionsComponent = class SimulationInstructionsComponent {
    constructor() {
        this.stepTypes = {
            one: Step.One,
            two: Step.Two,
            three: Step.Three,
        };
        this._ngDestroy$ = new Subject();
    }
    ngOnDestroy() {
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SimulationInstructionsComponent.prototype, "inviteSystem", void 0);
SimulationInstructionsComponent = __decorate([
    Component({
        selector: 'ea-simulation-instructions',
        templateUrl: './instructions.component.html',
        styleUrls: ['./instructions.component.scss'],
    }),
    __metadata("design:paramtypes", [])
], SimulationInstructionsComponent);
export { SimulationInstructionsComponent };
//# sourceMappingURL=instructions.component.js.map