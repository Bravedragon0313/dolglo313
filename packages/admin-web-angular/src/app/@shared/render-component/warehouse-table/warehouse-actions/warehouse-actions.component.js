import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WarehouseTableInfoComponent } from '../../../../pages/+warehouses/+warehouse/warehouse-info/warehouse-info.component';
let WarehouseActionsComponent = class WarehouseActionsComponent {
    constructor(modalService) {
        this.modalService = modalService;
    }
    ngOnInit() { }
    openInfo() {
        const activeModal = this.modalService.open(WarehouseTableInfoComponent, { size: 'lg', container: 'nb-layout' });
        const modalComponent = activeModal.componentInstance;
        modalComponent.warehouse = this.rowData.warehouseInfo;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], WarehouseActionsComponent.prototype, "rowData", void 0);
WarehouseActionsComponent = __decorate([
    Component({
        styleUrls: ['warehouse-actions.component.scss'],
        templateUrl: './warehouse-actions.component.html',
    }),
    __metadata("design:paramtypes", [NgbModal])
], WarehouseActionsComponent);
export { WarehouseActionsComponent };
//# sourceMappingURL=warehouse-actions.component.js.map