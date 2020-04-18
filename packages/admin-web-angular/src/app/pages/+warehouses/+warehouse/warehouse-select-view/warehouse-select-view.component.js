import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Warehouse from '@modules/server.common/entities/Warehouse';
import { JsonModalComponent } from '../../../../@shared/json-modal/json-modal.component';
import { WarehouseRouter } from '@modules/client.common.angular2/routers/warehouse-router.service';
let WarehouseSelectViewComponent = class WarehouseSelectViewComponent {
    constructor(_router, modalService, warehouseRouter, _route, _toasterService) {
        this._router = _router;
        this.modalService = modalService;
        this.warehouseRouter = warehouseRouter;
        this._route = _route;
        this._toasterService = _toasterService;
        this._ngDestroy$ = new Subject();
        this.selectWarehouseEvent = new EventEmitter();
    }
    ngOnChanges() { }
    ngOnInit() { }
    selectWarehouse(warehouse) {
        this.warehouse = warehouse;
        this.selectWarehouseEvent.emit(warehouse);
        console.log(this.selectedWarehouse);
    }
    openInfo() {
        const activeModal = this.modalService.open(JsonModalComponent, {
            size: 'lg',
            container: 'nb-layout',
            windowClass: 'simJSON',
        });
        const modalComponent = activeModal.componentInstance;
        if (this.warehouse !== undefined) {
            modalComponent.obj = this.warehouse;
            modalComponent.title = 'Warehouse';
            modalComponent.subTitle = this.warehouse.name;
        }
        modalComponent.obj = this.selectedWarehouse;
        modalComponent.title = 'Warehouse';
        modalComponent.subTitle = this.selectedWarehouse.name;
    }
    ngOnDestroy() {
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
    }
};
__decorate([
    Output(),
    __metadata("design:type", Object)
], WarehouseSelectViewComponent.prototype, "selectWarehouseEvent", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], WarehouseSelectViewComponent.prototype, "warehouses", void 0);
__decorate([
    Input(),
    __metadata("design:type", Warehouse)
], WarehouseSelectViewComponent.prototype, "selectedWarehouse", void 0);
WarehouseSelectViewComponent = __decorate([
    Component({
        selector: 'ea-warehouse-select-view',
        styleUrls: ['./warehouse-select-view.component.scss'],
        templateUrl: './warehouse-select-view.component.html',
    }),
    __metadata("design:paramtypes", [Router,
        NgbModal,
        WarehouseRouter,
        ActivatedRoute,
        ToasterService])
], WarehouseSelectViewComponent);
export { WarehouseSelectViewComponent };
//# sourceMappingURL=warehouse-select-view.component.js.map