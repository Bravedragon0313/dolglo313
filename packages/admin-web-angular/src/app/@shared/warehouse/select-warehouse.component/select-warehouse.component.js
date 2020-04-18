import { __decorate, __metadata } from "tslib";
import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
let SelectWarehouseComponent = class SelectWarehouseComponent {
    constructor(_router) {
        this._router = _router;
    }
    ngOnInit() {
        this.renderValue = this.value.toString();
    }
    selectWarehouse(warehouseId) {
        this._router.navigate(['/stores/' + warehouseId]);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], SelectWarehouseComponent.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SelectWarehouseComponent.prototype, "rowData", void 0);
SelectWarehouseComponent = __decorate([
    Component({
        template: `
		<button
			class="btn btn-sm btn-outline-secondary"
			(click)="selectWarehouse(renderValue)"
		>
			{{ renderValue }}
		</button>
	`,
    }),
    __metadata("design:paramtypes", [Router])
], SelectWarehouseComponent);
export { SelectWarehouseComponent };
//# sourceMappingURL=select-warehouse.component.js.map