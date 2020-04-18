import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter, } from '@angular/core';
import Order from '@modules/server.common/entities/Order';
import Carrier from '@modules/server.common/entities/Carrier';
import { CarrierOrdersRouter } from '@modules/client.common.angular2/routers/carrier-orders-router.service';
import OrderCarrierStatus from '@modules/server.common/enums/OrderCarrierStatus';
import _ from 'lodash';
import { OrderRouter } from '@modules/client.common.angular2/routers/order-router.service';
let CarrierOrdersStatusComponent = class CarrierOrdersStatusComponent {
    constructor(carrierOrdersRouter, orderRouter) {
        this.carrierOrdersRouter = carrierOrdersRouter;
        this.orderRouter = orderRouter;
        this.getChangeOrder = new EventEmitter();
        this.orders = [];
        this.pageBtnStates = {
            isSelectOrdersForDeliveryAvailable: true,
            isCarrierPickupOrder: true,
        };
        this.enumOrderCarrierStatus = OrderCarrierStatus;
    }
    get ordersIds() {
        this.orders.push(this.selectedOrder);
        return _.map(this.orders, (order) => order.id);
    }
    get ordersCarrierStatus() {
        return this.selectedOrder ? this.selectedOrder.carrierStatus : null;
    }
    selectOrdersForDelivery() {
        return __awaiter(this, void 0, void 0, function* () {
            this.pageBtnStates.isSelectOrdersForDeliveryAvailable = false;
            this.selectedOrder.carrierStatus = this.enumOrderCarrierStatus.CarrierSelectedOrder;
            this.loading = true;
            yield this.carrierOrdersRouter.selectedForDelivery(this.selectedCarrier.id, this.ordersIds);
            this.loading = false;
            this.pageBtnStates.isSelectOrdersForDeliveryAvailable = true;
        });
    }
    updateCarrierOrdersStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            this.pageBtnStates.isCarrierPickupOrder = false;
            this.loading = true;
            this.selectedOrder.carrierStatus = status;
            this.selectedOrder = yield this.orderRouter.updateCarrierStatus(this.selectedOrder.id, status);
            this.getChangeOrder.emit(this.selectedOrder);
            this.loading = false;
            this.pageBtnStates.isCarrierPickupOrder = true;
        });
    }
    cancelDelivery() {
        return __awaiter(this, void 0, void 0, function* () {
            this.pageBtnStates.isCarrierPickupOrder = false;
            this.loading = true;
            yield this.carrierOrdersRouter.cancelDelivery(this.selectedCarrier.id, this.ordersIds);
            this.selectedOrder = null;
            this.getChangeOrder.emit(null);
            this.loading = false;
            this.pageBtnStates.isCarrierPickupOrder = true;
        });
    }
    ngOnDestroy() { }
};
__decorate([
    Input(),
    __metadata("design:type", Order)
], CarrierOrdersStatusComponent.prototype, "selectedOrder", void 0);
__decorate([
    Input(),
    __metadata("design:type", Carrier)
], CarrierOrdersStatusComponent.prototype, "selectedCarrier", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CarrierOrdersStatusComponent.prototype, "getChangeOrder", void 0);
CarrierOrdersStatusComponent = __decorate([
    Component({
        selector: 'ea-carrier-orders-status',
        styleUrls: ['./carrier-orders-status.component.scss'],
        templateUrl: 'carrier-orders-status.component.html',
    }),
    __metadata("design:paramtypes", [CarrierOrdersRouter,
        OrderRouter])
], CarrierOrdersStatusComponent);
export { CarrierOrdersStatusComponent };
//# sourceMappingURL=carrier-orders-status.component.js.map