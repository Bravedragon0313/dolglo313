import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/operators/map';
import { WarehouseOrdersRouter } from '@modules/client.common.angular2/routers/warehouse-orders-router.service';
import { WarehousesService } from '../../../../../@core/data/warehouses.service';
import { ToasterService } from 'angular2-toaster';
import { WarehouseRouter } from '@modules/client.common.angular2/routers/warehouse-router.service';
import { Subject } from 'rxjs';
import { getIdFromTheDate } from '@modules/server.common/utils';
let CustomOrderComponent = class CustomOrderComponent {
    constructor(warehouseRouter, activatedRoute, activeModal, toasterService, warehousesService, fb, warehouseOrdersRouter) {
        this.warehouseRouter = warehouseRouter;
        this.activatedRoute = activatedRoute;
        this.activeModal = activeModal;
        this.toasterService = toasterService;
        this.warehousesService = warehousesService;
        this.fb = fb;
        this.warehouseOrdersRouter = warehouseOrdersRouter;
        this.ngDestroy$ = new Subject();
        this.form = this.fb.group({
            count: [
                0,
                [
                    Validators.required,
                    Validators.min(1),
                    (control) => {
                        if (this.currentProduct != null &&
                            control.value >
                                this.currentProduct.warehouseProduct.count) {
                            return { notEnoughAvailable: true };
                        }
                        return null;
                    },
                ],
            ],
        });
    }
    get count() {
        return this.form.get('count');
    }
    ngOnInit() { }
    cancel() {
        this.activeModal.dismiss('canceled');
    }
    createOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderCreateInput = {
                    userId: this.userId,
                    warehouseId: this.warehouseId,
                    products: [
                        {
                            count: this.count.value,
                            productId: this.currentProduct.warehouseProduct.product['id'],
                        },
                    ],
                };
                const order = yield this.warehouseOrdersRouter.create(orderCreateInput);
                this.toasterService.pop('success', `Order #${getIdFromTheDate(order)} was created`);
                this.activeModal.close(order);
            }
            catch (err) {
                this.toasterService.pop('error', `Error in creating order: "${err.message}"`);
            }
        });
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], CustomOrderComponent.prototype, "warehouseId", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CustomOrderComponent.prototype, "currentProduct", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CustomOrderComponent.prototype, "userId", void 0);
CustomOrderComponent = __decorate([
    Component({
        selector: 'ea-custom-order',
        templateUrl: './custom-order.component.html',
        styleUrls: ['./custom-order.component.scss'],
    }),
    __metadata("design:paramtypes", [WarehouseRouter,
        ActivatedRoute,
        NgbActiveModal,
        ToasterService,
        WarehousesService,
        FormBuilder,
        WarehouseOrdersRouter])
], CustomOrderComponent);
export { CustomOrderComponent };
//# sourceMappingURL=custom-order.component.js.map