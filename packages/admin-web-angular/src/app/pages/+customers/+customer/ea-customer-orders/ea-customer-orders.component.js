import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { UserOrdersRouter } from '@modules/client.common.angular2/routers/user-orders-router.service';
import { ActivatedRoute } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { RedirectStoreComponent } from '../../../../@shared/render-component/customer-orders-table/redirect-store/redirect-store.component';
import { RedirectCarrierComponent } from '../../../../@shared/render-component/customer-orders-table/redirect-carrier/redirect-carrier.component';
import { RedirectOrderComponent } from '../../../../@shared/render-component/customer-orders-table/redirect-order.component';
import { RedirectProductComponent } from '../../../../@shared/render-component/customer-orders-table/redirect-product/redirect-product.component';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Subject } from 'rxjs';
import { CustomerOrderActionsComponent } from '@app/@shared/render-component/customer-orders-table/customer-order-actions/customer-order-actions.component';
let CustomerOrdersComponent = class CustomerOrdersComponent {
    constructor(userOrdersRouter, _router, _translateService) {
        this.userOrdersRouter = userOrdersRouter;
        this._router = _router;
        this._translateService = _translateService;
        this.ngDestroy$ = new Subject();
        this.sourceSmartTable = new LocalDataSource();
        this.params$ = this._router.params.subscribe((res) => __awaiter(this, void 0, void 0, function* () {
            const userId = res.id;
            this.orderedProductsSubscription$ = this.userOrdersRouter
                .get(userId)
                .subscribe((orders) => {
                this.sourceSmartTable.load(orders);
            });
        }));
        this._applyTranslationOnSmartTable();
    }
    ngOnInit() {
        this._setupSmartTable();
    }
    ngOnChanges() {
        if (this.userId) {
            this.orderedProductsSubscription$ = this.userOrdersRouter
                .get(this.userId)
                .subscribe((orders) => {
                this.sourceSmartTable.load(orders);
            });
        }
    }
    _applyTranslationOnSmartTable() {
        this._translateService.onLangChange.subscribe(() => {
            this._setupSmartTable();
        });
    }
    _setupSmartTable() {
        const columnTitlePrefix = 'CUSTOMERS_VIEW.SMART_TABLE_COLUMNS.';
        const getTranslate = (name) => this._translateService.get(columnTitlePrefix + name);
        forkJoin(this._translateService.get('Id'), getTranslate('ORDER_NUMBER'), getTranslate('WAREHOUSE'), getTranslate('CARRIER'), getTranslate('PRODUCT_LIST'), getTranslate('STATS'), getTranslate('DELIVERY_TIME'), getTranslate('CREATED'), getTranslate('ACTIONS'), getTranslate('PAID'), getTranslate('COMPLETED'), getTranslate('CANCELLED'), getTranslate('NOT_DELIVERED'))
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(([id, orderNumber, warehouse, carrier, productList, stats, deliveryTime, created, actions, paid, completed, cancelled, notDelivered,]) => {
            this.settingsSmartTable = {
                actions: false,
                columns: {
                    orderNumber: {
                        title: orderNumber,
                        type: 'custom',
                        renderComponent: RedirectOrderComponent,
                    },
                    Warehouse: {
                        title: warehouse,
                        type: 'custom',
                        renderComponent: RedirectStoreComponent,
                    },
                    Carrier: {
                        title: carrier,
                        type: 'custom',
                        renderComponent: RedirectCarrierComponent,
                    },
                    ProductsList: {
                        title: productList,
                        type: 'custom',
                        renderComponent: RedirectProductComponent,
                    },
                    Stats: {
                        title: stats,
                        type: 'html',
                        valuePrepareFunction: (_, order) => {
                            if (order.isCancelled) {
                                return `
									<span class='warnCancelled'>${cancelled}</span>
									`;
                            }
                            else {
                                return `
									<span > <span class=' space'>${completed}</span>${order.isCompleted ? '✔' : '✘'}</span>
									<span> <span class='space'>${paid}</span>${order.isPaid ? '✔' : '✘'}</span>
									`;
                            }
                        },
                    },
                    DeliveryTime: {
                        title: deliveryTime,
                        type: 'html',
                        valuePrepareFunction: (_, order) => {
                            const raw = new Date(order.deliveryTime);
                            const formatted = order.deliveryTime
                                ? new DatePipe('en-EN').transform(raw, 'short')
                                : `${notDelivered}`;
                            return `<p>${formatted}</p>`;
                        },
                    },
                    Created: {
                        title: created,
                        type: 'html',
                        valuePrepareFunction: (_, order) => {
                            const raw = new Date(order._createdAt.toString());
                            const formatted = new DatePipe('en-EN').transform(raw, 'short');
                            return `<p>${formatted}</p>`;
                        },
                    },
                    actions: {
                        title: actions,
                        type: 'custom',
                        renderComponent: CustomerOrderActionsComponent,
                    },
                },
                pager: {
                    display: true,
                    perPage: 3,
                },
            };
        });
    }
    ngOnDestroy() {
        if (this.params$) {
            this.params$.unsubscribe();
        }
        if (this.orderedProductsSubscription$) {
            this.orderedProductsSubscription$.unsubscribe();
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], CustomerOrdersComponent.prototype, "userId", void 0);
CustomerOrdersComponent = __decorate([
    Component({
        selector: 'ea-customer-orders',
        styleUrls: ['./ea-customer-orders.component.scss'],
        templateUrl: './ea-customer-orders.component.html',
    }),
    __metadata("design:paramtypes", [UserOrdersRouter,
        ActivatedRoute,
        TranslateService])
], CustomerOrdersComponent);
export { CustomerOrdersComponent };
//# sourceMappingURL=ea-customer-orders.component.js.map