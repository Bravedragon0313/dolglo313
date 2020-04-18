import { __decorate, __metadata } from "tslib";
import { Component, Input, EventEmitter } from '@angular/core';
let CheckboxComponent = class CheckboxComponent {
    constructor() {
        this.newValue = new EventEmitter();
        this.id = new EventEmitter();
    }
    onChange() {
        this.newValue.emit({
            type: this.type,
            checked: this.checked,
            id: this.rowData.id,
        });
    }
    ngOnInit() {
        this.id.emit(this.rowData.id);
        this.checked =
            this.type === 'takeaway'
                ? this.rowData.takeProductTakeaway
                : this.rowData.takeProductDelivery;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], CheckboxComponent.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CheckboxComponent.prototype, "rowData", void 0);
CheckboxComponent = __decorate([
    Component({
        template: `
		<div class="text-center">
			<input
				[(ngModel)]="checked"
				type="checkbox"
				(change)="onChange()"
			/>
		</div>
	`,
    }),
    __metadata("design:paramtypes", [])
], CheckboxComponent);
export { CheckboxComponent };
//# sourceMappingURL=checkbox.component.js.map