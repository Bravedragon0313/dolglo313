import { __awaiter, __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { OrdersService } from '../../../../../@core/data/orders.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WarehouseOrdersRouter } from '@modules/client.common.angular2/routers/warehouse-orders-router.service';
let OrderCancelComponent = class OrderCancelComponent {
    constructor(_orderService, activeModal, warehouseOrderdersRouter) {
        this._orderService = _orderService;
        this.activeModal = activeModal;
        this.warehouseOrderdersRouter = warehouseOrderdersRouter;
    }
    cancel() {
        this.activeModal.dismiss('canceled');
    }
    cancelOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            const cncld = yield this.warehouseOrderdersRouter.cancel(this.orderId);
            this.cancel();
        });
    }
    ngOnInit() { }
};
OrderCancelComponent = __decorate([
    Component({
        styleUrls: ['./order-cancel.component.scss'],
        templateUrl: './order-cancel.component.html',
    }),
    __metadata("design:paramtypes", [OrdersService,
        NgbActiveModal,
        WarehouseOrdersRouter])
], OrderCancelComponent);
export { OrderCancelComponent };
//# sourceMappingURL=order-cancel.component.js.map