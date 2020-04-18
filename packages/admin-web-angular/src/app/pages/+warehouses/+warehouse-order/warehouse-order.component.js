import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WarehouseOrdersService } from '../../../@core/data/warehouseOrders.service';
import { WarehouseOrderModalComponent } from '../../../@shared/warehouse/+warehouse-order-modal/warehouse-order-modal.component';
import { WarehouseInfoComponent } from './warehouse-info/warehouse-info.component';
let WarehouseOrderComponent = class WarehouseOrderComponent {
    constructor(_modalService, _warehouseOrdersService, _toasterService, modalService) {
        this._modalService = _modalService;
        this._warehouseOrdersService = _warehouseOrdersService;
        this._toasterService = _toasterService;
        this.modalService = modalService;
    }
    get renderValue() {
        const orderAction = 'CUSTOMERS_VIEW.' + this.value.actionName.toString();
        return orderAction;
    }
    ngOnInit() { }
    openWarehouseOrderModal() {
        const componentRef = this._modalService.open(WarehouseOrderModalComponent, { size: 'lg' });
        const instance = componentRef.componentInstance;
        instance.warehouseId = this.rowData.id;
        instance.makeOrderEmitter.subscribe((data) => {
            const userId = this.value.actionOwnerId.toString();
            const warehouseId = instance.warehouseId;
            this._warehouseOrdersService
                .createOrder({ userId, warehouseId, products: data })
                .subscribe(() => {
                this._toasterService.pop(`success`, `The order is finished!`);
                componentRef.close();
            });
        });
    }
    openInfo() {
        const activeModal = this.modalService.open(WarehouseInfoComponent, {
            size: 'sm',
            container: 'nb-layout',
        });
        const modalComponent = activeModal.componentInstance;
        modalComponent.warehouseId = this.rowData.id;
        modalComponent.selectedWarehouse = this.rowData;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], WarehouseOrderComponent.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], WarehouseOrderComponent.prototype, "rowData", void 0);
WarehouseOrderComponent = __decorate([
    Component({
        styleUrls: ['./warehouse-order.component.scss'],
        templateUrl: './warehouse-order.component.html',
    }),
    __metadata("design:paramtypes", [NgbModal,
        WarehouseOrdersService,
        ToasterService,
        NgbModal])
], WarehouseOrderComponent);
export { WarehouseOrderComponent };
//# sourceMappingURL=warehouse-order.component.js.map