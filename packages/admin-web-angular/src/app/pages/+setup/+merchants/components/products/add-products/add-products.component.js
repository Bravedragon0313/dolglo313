import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild, Input, Output, EventEmitter, } from '@angular/core';
import { AddWarehouseProductsComponent } from '@app/@shared/warehouse-product/forms/add-warehouse-products-table';
import { WarehousesService } from '@app/@core/data/warehouses.service';
import { first } from 'rxjs/operators';
import { NotifyService } from '@app/@core/services/notify/notify.service';
let SetupMerchantAddProductsComponent = class SetupMerchantAddProductsComponent {
    constructor(warehousesService, notifyService) {
        this.warehousesService = warehousesService;
        this.notifyService = notifyService;
        this.successAdd = new EventEmitter();
    }
    ngOnInit() {
        this.addWarehouseProductsTable.loadDataSmartTable(this.products || [], this.storeId);
    }
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productsForAdd = this.addWarehouseProductsTable
                    .allWarehouseProducts;
                yield this.warehousesService
                    .addProducts(this.storeId, productsForAdd)
                    .pipe(first())
                    .toPromise();
                this.successAdd.emit(true);
                const message = `${productsForAdd.length} products was added`;
                this.notifyService.success(message);
            }
            catch (error) {
                let message = `Something went wrong`;
                if (error.message === 'Validation error') {
                    message = error.message;
                }
                this.notifyService.error(message);
            }
        });
    }
};
__decorate([
    ViewChild('addWarehouseProductsTable', { static: true }),
    __metadata("design:type", AddWarehouseProductsComponent)
], SetupMerchantAddProductsComponent.prototype, "addWarehouseProductsTable", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], SetupMerchantAddProductsComponent.prototype, "products", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SetupMerchantAddProductsComponent.prototype, "storeId", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SetupMerchantAddProductsComponent.prototype, "successAdd", void 0);
SetupMerchantAddProductsComponent = __decorate([
    Component({
        selector: 'ea-merchants-setup-add-products',
        templateUrl: './add-products.component.html',
    }),
    __metadata("design:paramtypes", [WarehousesService,
        NotifyService])
], SetupMerchantAddProductsComponent);
export { SetupMerchantAddProductsComponent };
//# sourceMappingURL=add-products.component.js.map