import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, } from '@angular/core';
import { WarehouseProductsRouter } from '@modules/client.common.angular2/routers/warehouse-products-router.service';
import { ToasterService } from 'angular2-toaster';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfimationModalComponent } from '@app/@shared/confirmation-modal/confirmation-modal.component';
import { OrderRouter } from '@modules/client.common.angular2/routers/order-router.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
let StoreOrderProductAmountComponent = class StoreOrderProductAmountComponent {
    constructor(productLocalesService, toasterService, warehouseProductsRouter, modalService, orderRouter) {
        this.productLocalesService = productLocalesService;
        this.toasterService = toasterService;
        this.warehouseProductsRouter = warehouseProductsRouter;
        this.modalService = modalService;
        this.orderRouter = orderRouter;
        this.ngDestroy$ = new Subject();
    }
    ngOnInit() {
        this.productID = this.rowData.product.id;
        this.storeID = this.rowData.storeId;
        this.storeID = this.rowData.storeId;
        this.productAmount = this.value;
        this.productTitle = this.localeTranslate(this.rowData.product.title);
        this.orderId = this.rowData.orderId;
        this.orderWarehouseId = this.rowData.orderWarehouseId;
        this.availableProducts = this.rowData.warehouseProducts
            .filter((d) => d.product === this.productID)
            .map((d) => d.count)[0];
        this.productObj = [
            {
                productId: this.productID,
                count: 1,
            },
        ];
    }
    localeTranslate(member) {
        return this.productLocalesService.getTranslate(member);
    }
    addProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.availableProducts > 0) {
                const activeModal = this.modalService.open(ConfimationModalComponent, {
                    size: 'sm',
                    container: 'nb-layout',
                    backdrop: 'static',
                });
                const modalComponent = activeModal.componentInstance;
                modalComponent.mainText = 'ARE_YOU_SURE_YOU_WANT_TO_INCREASE';
                this.loading = true;
                yield modalComponent.confirmEvent
                    .pipe(takeUntil(modalComponent.ngDestroy$))
                    .subscribe((dataEvent) => {
                    this.orderRouter
                        .addProducts(this.orderId, this.productObj, this.orderWarehouseId)
                        .then((r) => {
                        this.toasterService.pop(`info`, `Increased amount of the order's product!`);
                    })
                        .catch((err) => {
                        this.toasterService.pop(`error`, `Error!`);
                    });
                    modalComponent.cancel();
                });
            }
            else {
                this.toasterService.pop(`error`, `There are no more available products!`);
            }
            this.loading = false;
        });
    }
    removeProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.productAmount >= 1) {
                const activeModal = this.modalService.open(ConfimationModalComponent, {
                    size: 'sm',
                    container: 'nb-layout',
                    backdrop: 'static',
                });
                const modalComponent = activeModal.componentInstance;
                modalComponent.mainText = 'ARE_YOU_SURE_YOU_WANT_TO_DECREASE';
                this.loading = true;
                yield modalComponent.confirmEvent
                    .pipe(takeUntil(modalComponent.ngDestroy$))
                    .subscribe((dataEvent) => {
                    this.orderRouter
                        .decreaseOrderProducts(this.orderId, this.productObj, this.orderWarehouseId)
                        .then((r) => {
                        this.toasterService.pop(`info`, `Decreased amount of the order's product!`);
                    })
                        .catch((err) => {
                        this.toasterService.pop(`error`, `You can not decrease the qty
							of the product to 0, but you can remove selected product!`);
                    });
                    modalComponent.cancel();
                });
            }
            else {
                this.toasterService.pop(`error`, `There are no products for remove!`);
            }
            this.loading = false;
        });
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
};
StoreOrderProductAmountComponent = __decorate([
    Component({
        styleUrls: ['store-order-product-amount.component.scss'],
        templateUrl: 'store-order-product-amount.component.html',
    }),
    __metadata("design:paramtypes", [ProductLocalesService,
        ToasterService,
        WarehouseProductsRouter,
        NgbModal,
        OrderRouter])
], StoreOrderProductAmountComponent);
export { StoreOrderProductAmountComponent };
//# sourceMappingURL=store-order-product-amount.component.js.map