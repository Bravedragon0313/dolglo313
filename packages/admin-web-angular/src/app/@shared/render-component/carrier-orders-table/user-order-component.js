import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
let UserOrderComponent = class UserOrderComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() { }
    redirect() {
        if (this.rowData.user.id) {
            this.router.navigate([`customers/list/${this.rowData.user.id}`]);
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], UserOrderComponent.prototype, "rowData", void 0);
UserOrderComponent = __decorate([
    Component({
        templateUrl: './user-order-component.html',
        styles: [
            `
			.user-image {
				width: 30px;
				height: 30px;
				margin-right: 5px !important;
				margin-bottom: 3px !important;
			}
		`,
        ],
    }),
    __metadata("design:paramtypes", [Router])
], UserOrderComponent);
export { UserOrderComponent };
//# sourceMappingURL=user-order-component.js.map