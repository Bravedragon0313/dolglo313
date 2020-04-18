import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
let ProductCheckboxComponent = class ProductCheckboxComponent {
    constructor() { }
    ngOnInit() { }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], ProductCheckboxComponent.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ProductCheckboxComponent.prototype, "rowData", void 0);
ProductCheckboxComponent = __decorate([
    Component({
        template: `
		<div class="text-center">
			<input [(ngModel)]="rowData.checked" type="checkbox" />
		</div>
	`,
    }),
    __metadata("design:paramtypes", [])
], ProductCheckboxComponent);
export { ProductCheckboxComponent };
//# sourceMappingURL=product-checkbox.js.map