import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
let WarehouseTableInfoComponent = class WarehouseTableInfoComponent {
    constructor(activeModal, router) {
        this.activeModal = activeModal;
        this.router = router;
    }
    cancel() {
        this.activeModal.dismiss('canceled');
    }
    ngOnInit() { }
    redirectToWarehousePage() {
        this.router.navigate([`/stores/${this.warehouse.id}`]);
        this.activeModal.dismiss('canceled');
    }
};
WarehouseTableInfoComponent = __decorate([
    Component({
        templateUrl: 'warehouse-info.component.html',
        styleUrls: ['warehouse-info.component.scss'],
    }),
    __metadata("design:paramtypes", [NgbActiveModal,
        Router])
], WarehouseTableInfoComponent);
export { WarehouseTableInfoComponent };
//# sourceMappingURL=warehouse-info.component.js.map