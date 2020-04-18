import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
let StoreOrderComponent = class StoreOrderComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() { }
    redirect() {
        if (this.rowData.warehouse.id) {
            this.router.navigate([`stores/${this.rowData.warehouse.id}`]);
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], StoreOrderComponent.prototype, "rowData", void 0);
StoreOrderComponent = __decorate([
    Component({
        templateUrl: './store-order.component.html',
        styles: [
            `
			.warehouse-image {
				width: 30px;
				height: 30px;
				margin-right: 5px !important;
				margin-bottom: 3px !important;
			}
		`,
        ],
    }),
    __metadata("design:paramtypes", [Router])
], StoreOrderComponent);
export { StoreOrderComponent };
//# sourceMappingURL=store-order.component.js.map