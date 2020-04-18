import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import Warehouse from '@modules/server.common/entities/Warehouse';
let WarehouseMainInfoViewComponent = class WarehouseMainInfoViewComponent {
    constructor() {
        this._ngDestroy$ = new Subject();
    }
    ngOnChanges() {
        if (this.selectedWarehouse) {
            this.isManufacturing = this.selectedWarehouse.isManufacturing;
            this.isCarrierRequired = this.selectedWarehouse.isCarrierRequired;
        }
    }
    ngOnInit() { }
    ngOnDestroy() {
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Warehouse)
], WarehouseMainInfoViewComponent.prototype, "selectedWarehouse", void 0);
WarehouseMainInfoViewComponent = __decorate([
    Component({
        selector: 'ea-warehouse-main-info',
        styleUrls: ['./warehouse-main-info.component.scss'],
        templateUrl: './warehouse-main-info.component.html',
    }),
    __metadata("design:paramtypes", [])
], WarehouseMainInfoViewComponent);
export { WarehouseMainInfoViewComponent };
//# sourceMappingURL=warehouse-main-info.component.js.map