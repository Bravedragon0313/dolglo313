import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input } from '@angular/core';
let PriceCountInputComponent = class PriceCountInputComponent {
    constructor() {
        this.newValue = new EventEmitter();
        this.id = new EventEmitter();
    }
    ngOnInit() {
        this.id.emit(this.rowData.id);
        if (this.placeholder === 'Count') {
            this.value = 1;
        }
    }
    valueChange(e) {
        this.newValue.emit(this.value);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], PriceCountInputComponent.prototype, "rowData", void 0);
PriceCountInputComponent = __decorate([
    Component({
        templateUrl: './price-countInput.component.html',
    })
], PriceCountInputComponent);
export { PriceCountInputComponent };
//# sourceMappingURL=price-countInput.component.js.map