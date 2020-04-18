import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { CustomOrderComponent } from '../../../../pages/+customers/+customer/ea-customer-products/custom-order';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
let OrderBtnOrderProductsComponent = class OrderBtnOrderProductsComponent {
    constructor(modalService) {
        this.modalService = modalService;
    }
    ngOnInit() {
        this.productId = this.rowData.warehouseProduct.product.id;
    }
    openModal() {
        const productsArray = this.availableProducts;
        if (productsArray) {
            localStorage.setItem('ever_customOrderProductId', this.productId);
            const currProduct = productsArray.find((x) => {
                return x.warehouseProduct.product.id === this.productId;
            });
            const activeModal = this.modalService.open(CustomOrderComponent, {
                size: 'lg',
                container: 'nb-layout',
            });
            const modalComponent = activeModal.componentInstance;
            modalComponent.warehouseId = currProduct.warehouseId;
            modalComponent.userId = this.userId;
            modalComponent.currentProduct = currProduct;
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], OrderBtnOrderProductsComponent.prototype, "rowData", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], OrderBtnOrderProductsComponent.prototype, "availableProducts", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], OrderBtnOrderProductsComponent.prototype, "userId", void 0);
OrderBtnOrderProductsComponent = __decorate([
    Component({
        templateUrl: './order-btn-order-products.component.html',
    }),
    __metadata("design:paramtypes", [NgbModal])
], OrderBtnOrderProductsComponent);
export { OrderBtnOrderProductsComponent };
//# sourceMappingURL=order-btn-order-products.component.js.map