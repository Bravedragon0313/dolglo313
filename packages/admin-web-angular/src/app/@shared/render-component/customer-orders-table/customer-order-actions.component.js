import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { OrderInfoComponent } from '../../../pages/+customers/+customer/ea-customer-orders/order-info/order-info.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderCancelComponent } from '../../../pages/+customers/+customer/ea-customer-orders/order-cancel/order-cancel.component';
let CustomerOrderActionsComponent = class CustomerOrderActionsComponent {
    constructor(modalService) {
        this.modalService = modalService;
    }
    ngOnInit() { }
    openInfo() {
        const activeModal = this.modalService.open(OrderInfoComponent, {
            size: 'lg',
            container: 'nb-layout',
        });
        const modalComponent = activeModal.componentInstance;
        modalComponent.selectedOrder = this.rowData;
        modalComponent.orderId = this.rowData.id;
        modalComponent.storeId = this.rowData.warehouseId;
        modalComponent.carrierId = this.rowData.carrierId;
    }
    openCancel() {
        const activeModal = this.modalService.open(OrderCancelComponent, {
            size: 'sm',
            container: 'nb-layout',
        });
        const modalComponent = activeModal.componentInstance;
        modalComponent.orderId = this.rowData.id;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], CustomerOrderActionsComponent.prototype, "rowData", void 0);
CustomerOrderActionsComponent = __decorate([
    Component({
        template: `
		<div class="iconsCont">
			<h4 class="text-center iconBtns">
				<i (click)="openInfo()" class="fa fa-info-circle infoBtn"></i>
			</h4>
			<h4 class="text-center iconBtns">
				<i (click)="openCancel()" class="fa fa-close cancelBtn"></i>
			</h4>
		</div>
	`,
    }),
    __metadata("design:paramtypes", [NgbModal])
], CustomerOrderActionsComponent);
export { CustomerOrderActionsComponent };
//# sourceMappingURL=customer-order-actions.component.js.map