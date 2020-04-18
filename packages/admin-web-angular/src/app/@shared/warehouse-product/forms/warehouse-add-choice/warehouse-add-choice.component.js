import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter } from '@angular/core';
let WarehouseAddChoiceComponent = class WarehouseAddChoiceComponent {
    constructor() {
        this.choice = new EventEmitter();
    }
    changeChoice(choiceType) {
        this.choiceType = choiceType === 'new' ? 2 : 1;
        this.choice.emit(choiceType);
    }
};
WarehouseAddChoiceComponent = __decorate([
    Component({
        selector: 'ea-warehouse-add-choice',
        styleUrls: ['./warehouse-add-choice.component.scss'],
        templateUrl: './warehouse-add-choice.component.html',
    }),
    __metadata("design:paramtypes", [])
], WarehouseAddChoiceComponent);
export { WarehouseAddChoiceComponent };
//# sourceMappingURL=warehouse-add-choice.component.js.map