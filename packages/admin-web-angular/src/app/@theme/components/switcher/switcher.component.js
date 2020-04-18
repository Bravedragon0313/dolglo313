import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
let SwitcherComponent = class SwitcherComponent {
    constructor() {
        this.valueChange = new EventEmitter();
    }
    isFirstValue() {
        return this.value === this.firstValue;
    }
    isSecondValue() {
        return this.value === this.secondValue;
    }
    currentValueLabel() {
        return this.isFirstValue()
            ? this.firstValueLabel
            : this.secondValueLabel;
    }
    changeValue() {
        this.value = this.isFirstValue() ? this.secondValue : this.firstValue;
        this.valueChange.emit(this.value);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], SwitcherComponent.prototype, "firstValue", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SwitcherComponent.prototype, "secondValue", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SwitcherComponent.prototype, "firstValueLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SwitcherComponent.prototype, "secondValueLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SwitcherComponent.prototype, "vertical", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SwitcherComponent.prototype, "value", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SwitcherComponent.prototype, "valueChange", void 0);
SwitcherComponent = __decorate([
    Component({
        selector: 'ngx-switcher',
        styleUrls: ['./switcher.component.scss'],
        templateUrl: './switcher.component.html',
    })
], SwitcherComponent);
export { SwitcherComponent };
//# sourceMappingURL=switcher.component.js.map