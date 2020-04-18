import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { getIdFromTheDate } from '@modules/server.common/utils';
let RedirectOrderComponent = class RedirectOrderComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
        this.orderId = getIdFromTheDate(this.rowData);
    }
    redirect() {
        if (this.rowData.id) {
            this.router.navigate([`orders/${this.rowData.id}`]);
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], RedirectOrderComponent.prototype, "rowData", void 0);
RedirectOrderComponent = __decorate([
    Component({
        template: `
		<button class="btn btn-sm btn-outline-secondary" (click)="redirect()">
			{{ orderId }}
		</button>
	`,
    }),
    __metadata("design:paramtypes", [Router])
], RedirectOrderComponent);
export { RedirectOrderComponent };
//# sourceMappingURL=redirect-order.component.js.map