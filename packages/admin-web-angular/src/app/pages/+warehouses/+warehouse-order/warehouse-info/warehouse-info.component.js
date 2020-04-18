import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
let WarehouseInfoComponent = class WarehouseInfoComponent {
    constructor(activeModal, router) {
        this.activeModal = activeModal;
        this.router = router;
        this.showCode = false;
    }
    cancel() {
        this.activeModal.dismiss('canceled');
    }
    ngOnInit() {
        console.log(this.selectedWarehouse);
    }
    redirectToWarehousePage() {
        this.router.navigate([`/stores/${this.warehouseId}`]);
        this.activeModal.dismiss('canceled');
    }
};
WarehouseInfoComponent = __decorate([
    Component({
        styleUrls: ['warehouse-info.component.scss'],
        templateUrl: 'warehouse-info.component.html',
    }),
    __metadata("design:paramtypes", [NgbActiveModal,
        Router])
], WarehouseInfoComponent);
export { WarehouseInfoComponent };
//# sourceMappingURL=warehouse-info.component.js.map