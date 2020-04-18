import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { OrdersService } from '../../../../../@core/data/orders.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
let OrderInfoComponent = class OrderInfoComponent {
    constructor(_orderService, activeModal, router) {
        this._orderService = _orderService;
        this.activeModal = activeModal;
        this.router = router;
    }
    cancel() {
        this.activeModal.dismiss('canceled');
    }
    ngOnInit() {
        this.order$ = this._orderService.getOrderById(this.orderId);
    }
    redirectToOrderPage() {
        this.router.navigate([`/orders/${this.orderId}`]);
        this.activeModal.dismiss('canceled');
    }
    redirectToStorePage() {
        this.router.navigate([`/stores/${this.storeId}`]);
        this.activeModal.dismiss('canceled');
    }
    redirectToCarrierPage() {
        this.router.navigate([`/carriers/${this.carrierId}`]);
        this.activeModal.dismiss('canceled');
    }
};
OrderInfoComponent = __decorate([
    Component({
        styleUrls: ['./order-info.component.scss'],
        templateUrl: './order-info.component.html',
    }),
    __metadata("design:paramtypes", [OrdersService,
        NgbActiveModal,
        Router])
], OrderInfoComponent);
export { OrderInfoComponent };
//# sourceMappingURL=order-info.component.js.map