import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild, Input, } from '@angular/core';
import { Subject } from 'rxjs';
import Order from '@modules/server.common/entities/Order';
import { OrderRouter } from '@modules/client.common.angular2/routers/order-router.service';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
import { environment } from 'environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import DeliveryType from '@modules/server.common/enums/DeliveryType';
let WarehouseOrderViewComponent = class WarehouseOrderViewComponent {
    constructor(orderRouter, _productLocalesService, translateService) {
        this.orderRouter = orderRouter;
        this._productLocalesService = _productLocalesService;
        this.translateService = translateService;
        this.isSelectedOrderActionsAvailable = true;
        this.orderTypeDelivery = DeliveryType.Delivery;
        this.orderTypeTakeaway = DeliveryType.Takeaway;
        this._ngDestroy$ = new Subject();
        this._applyTranslationOnSmartTable();
    }
    ngOnChanges() {
        this.selectedOrder.products.map((p) => p.product.images.sort((i1, i2) => i2.orientation - i1.orientation));
        if (this.slideshow && this.selectedOrder.products.length === 1) {
            this.slideshow.goToSlide(0);
        }
        this.getSlideImage();
    }
    ngOnInit() { }
    _applyTranslationOnSmartTable() {
        this.translateService.onLangChange.subscribe(() => {
            this.takeSlidebarTranslates();
        });
    }
    takeSlidebarTranslates() {
        const columnTitlePrefix = 'ORDER_VIEW.ORDER_SIDEBAR.';
        const getTranslatedWord = (name) => this.translateService.get(columnTitlePrefix + name);
        getTranslatedWord('QTY')
            .pipe(takeUntil(this._ngDestroy$))
            .subscribe((tr) => {
            this.QTY = tr;
        });
    }
    getSlideImage() {
        const images = this.selectedOrder.products.map((p) => {
            const productTitle = this._productLocalesService.getTranslate(p.product.title);
            const productCount = p.count;
            const productPrice = p.price;
            this.takeSlidebarTranslates();
            return {
                url: this._productLocalesService.getTranslate(p.product.images),
                caption: `${productTitle} (${environment.CURRENCY_SYMBOL + productPrice}, ${this.QTY}: ${productCount})`,
                title: this._productLocalesService.getTranslate(p.product.description),
                backgroundSize: 'contain',
                backgroundPosition: 'center',
            };
        });
        this.slideImages = images;
    }
    updateOrderWarehouseStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isSelectedOrderActionsAvailable = false;
            this.loading = true;
            yield this.orderRouter.updateWarehouseStatus(this.selectedOrder.id, status);
            this.selectedOrder.warehouseStatus = status;
            this.isSelectedOrderActionsAvailable = true;
            this.loading = false;
        });
    }
    localeTranslate(member) {
        return this._productLocalesService.getTranslate(member);
    }
    ngOnDestroy() {
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Order)
], WarehouseOrderViewComponent.prototype, "selectedOrder", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], WarehouseOrderViewComponent.prototype, "hideHeader", void 0);
__decorate([
    ViewChild('slideshow', { static: true }),
    __metadata("design:type", Object)
], WarehouseOrderViewComponent.prototype, "slideshow", void 0);
WarehouseOrderViewComponent = __decorate([
    Component({
        selector: 'ea-warehouse-order-view',
        styleUrls: ['./warehouse-order-view.component.scss'],
        templateUrl: './warehouse-order-view.component.html',
    }),
    __metadata("design:paramtypes", [OrderRouter,
        ProductLocalesService,
        TranslateService])
], WarehouseOrderViewComponent);
export { WarehouseOrderViewComponent };
//# sourceMappingURL=warehouse-order-view.component.js.map