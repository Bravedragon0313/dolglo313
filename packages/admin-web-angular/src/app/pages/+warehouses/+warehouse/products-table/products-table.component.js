import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, Output, EventEmitter, Input, ViewChild, } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WarehouseProductsRouter } from '@modules/client.common.angular2/routers/warehouse-products-router.service';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
import Warehouse from '@modules/server.common/entities/Warehouse';
import { WarehouseRouter } from '@modules/client.common.angular2/routers/warehouse-router.service';
import { Router } from '@angular/router';
import { NotifyService } from '../../../../@core/services/notify/notify.service';
import { ConfimationModalComponent } from '../../../../@shared/confirmation-modal/confirmation-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WarehouseProductsComponent, } from '@app/@shared/warehouse-product/forms/warehouse-products-table';
let ProductsTableComponent = class ProductsTableComponent {
    constructor(_warehouseProductsRouter, _productLocalesService, warehouseRouter, _router, _notifyService, modalService) {
        this._warehouseProductsRouter = _warehouseProductsRouter;
        this._productLocalesService = _productLocalesService;
        this.warehouseRouter = warehouseRouter;
        this._router = _router;
        this._notifyService = _notifyService;
        this.modalService = modalService;
        this.addProducts = new EventEmitter();
        this.ngDestroy$ = new Subject();
    }
    editProduct(ev) {
        this._router.navigate(['/products/list/' + ev.data.id + '/edit']);
    }
    removeProduct(ev) {
        const activeModal = this.modalService.open(ConfimationModalComponent, {
            size: 'sm',
            container: 'nb-layout',
            backdrop: 'static',
        });
        const modalComponent = activeModal.componentInstance;
        modalComponent.confirmEvent
            .pipe(takeUntil(modalComponent.ngDestroy$))
            .subscribe((dataEvent) => {
            this.removeProducts([ev.data]);
            modalComponent.cancel();
        });
    }
    deleteSelectedRows() {
        this.removeProducts(this.productsTable.selectedProducts);
    }
    localeTranslate(member) {
        return this._productLocalesService.getTranslate(member);
    }
    loadDataSmartTable(storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.warehouseProducts$) {
                this.warehouseProducts$.unsubscribe();
                this.productsTable.selectedProducts = [];
            }
            this.warehouseProducts$ = this._warehouseProductsRouter
                .get(storeId)
                .pipe(takeUntil(this.ngDestroy$))
                .subscribe((p) => {
                this.productsTable.loadDataSmartTable(p, storeId);
            });
        });
    }
    removeProducts(warehouseProducts) {
        if (this.warehouse) {
            this.loading = true;
            this.warehouse.products = this.warehouse.products.filter((p) => !warehouseProducts
                .map((product) => product.id)
                .includes(p.productId));
            this.warehouseRouter.save(this.warehouse);
            this.loading = false;
            const message = 'Selected products are deleted!';
            this._notifyService.success(message);
        }
        else {
            const message = `Can't remove products`;
            this.loading = false;
            this._notifyService.error(message);
        }
    }
    ngOnDestroy() {
        console.warn('ProductsTableComponent destroyed');
    }
};
__decorate([
    ViewChild('productsTable', { static: true }),
    __metadata("design:type", WarehouseProductsComponent)
], ProductsTableComponent.prototype, "productsTable", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ProductsTableComponent.prototype, "addProducts", void 0);
__decorate([
    Input(),
    __metadata("design:type", Warehouse)
], ProductsTableComponent.prototype, "warehouse", void 0);
ProductsTableComponent = __decorate([
    Component({
        selector: 'ea-store-products-table',
        templateUrl: './products-table.component.html',
        styleUrls: ['./products-table.component.scss'],
    }),
    __metadata("design:paramtypes", [WarehouseProductsRouter,
        ProductLocalesService,
        WarehouseRouter,
        Router,
        NotifyService,
        NgbModal])
], ProductsTableComponent);
export { ProductsTableComponent };
//# sourceMappingURL=products-table.component.js.map