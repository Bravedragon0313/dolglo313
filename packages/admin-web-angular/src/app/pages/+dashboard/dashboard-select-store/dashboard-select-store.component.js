import { __decorate, __metadata } from "tslib";
import { Component, Input, EventEmitter, Output } from '@angular/core';
let DashboardSelectStoreComponent = class DashboardSelectStoreComponent {
    constructor() {
        this.selectedStoreEmitter = new EventEmitter();
    }
    selectNewStore(ev) {
        let storeId;
        if (ev) {
            storeId = ev.id;
            this.selectedStore = this.stores.find((s) => s.id === storeId);
        }
        else {
            this.selectedStore = null;
        }
        this.selectedStoreEmitter.emit(storeId);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Array)
], DashboardSelectStoreComponent.prototype, "stores", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DashboardSelectStoreComponent.prototype, "selectedStoreEmitter", void 0);
DashboardSelectStoreComponent = __decorate([
    Component({
        selector: 'ea-dashboard-select-store',
        templateUrl: './dashboard-select-store.component.html',
        styleUrls: ['./dashboard-select-store.component.scss'],
    }),
    __metadata("design:paramtypes", [])
], DashboardSelectStoreComponent);
export { DashboardSelectStoreComponent };
//# sourceMappingURL=dashboard-select-store.component.js.map