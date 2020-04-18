import { __awaiter, __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '@app/@core/data/users.service';
let CustomerMetricsComponent = class CustomerMetricsComponent {
    constructor(_router, userService) {
        this._router = _router;
        this.userService = userService;
        this.showCode = false;
        this.params$ = this._router.params.subscribe((r) => __awaiter(this, void 0, void 0, function* () {
            this.userMetrics = yield this.userService.getCustomerMetrics(r.id);
        }));
    }
    ngOnDestroy() {
        if (this.params$) {
            this.params$.unsubscribe();
        }
    }
};
CustomerMetricsComponent = __decorate([
    Component({
        selector: 'ea-customer-metrics',
        templateUrl: './ea-customer-metrics.component.html',
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        UsersService])
], CustomerMetricsComponent);
export { CustomerMetricsComponent };
//# sourceMappingURL=ea-customer-metrics.component.js.map