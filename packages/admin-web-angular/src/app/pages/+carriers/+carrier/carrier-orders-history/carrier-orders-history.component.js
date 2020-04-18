import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output, } from '@angular/core';
import OrderCarrierStatus from '@modules/server.common/enums/OrderCarrierStatus';
import Carrier from '@modules/server.common/entities/Carrier';
import { CarrierOrdersRouter } from '@modules/client.common.angular2/routers/carrier-orders-router.service';
import { forkJoin } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs/Rx';
import { TranslateService } from '@ngx-translate/core';
import { CreatedComponent } from '../../../../@shared/render-component/created/created.component';
import { CarriersOrdersService } from '@app/@core/data/carriers-orders.service';
import { StoreOrderComponent } from '@app/@shared/render-component/carrier-orders-table/store-order.component';
import { UserOrderComponent } from '@app/@shared/render-component/carrier-orders-table/user-order-component';
import { takeUntil } from 'rxjs/operators';
const perPage = 3;
let CarrierOrdersHistoryComponent = class CarrierOrdersHistoryComponent {
    constructor(carrierOrdersRouter, _translateService, carriersOrdersService) {
        this.carrierOrdersRouter = carrierOrdersRouter;
        this._translateService = _translateService;
        this.carriersOrdersService = carriersOrdersService;
        this.ngDestroy$ = new Subject();
        this.selectedOrderEvent = new EventEmitter();
        this.currentOrders = [];
        this.sourceSmartTable = new LocalDataSource();
        this.enumOrderCarrierStatus = OrderCarrierStatus;
        this._setupSmartTable();
    }
    ngAfterViewInit() {
        this.loadSmartTableTranslates();
        this.smartTableChange();
    }
    get isCarrierPickupOrder() {
        return (this.selectedOrder !== undefined &&
            this.selectedOrder.carrierStatus ===
                this.enumOrderCarrierStatus.CarrierPickedUpOrder);
    }
    get isCarrierArrivedToCustomer() {
        return (this.selectedOrder !== undefined &&
            this.selectedOrder.carrierStatus ===
                this.enumOrderCarrierStatus.CarrierArrivedToCustomer);
    }
    ngOnChanges() {
        this.getAllAvailableOrders();
        this.loadDataCount();
    }
    selectOrder(ev) {
        console.log(ev);
    }
    loadSmartTableTranslates() {
        this._translateService.onLangChange.subscribe((d) => {
            this._setupSmartTable();
        });
    }
    getAllAvailableOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loadSmartTableData();
        });
    }
    _setupSmartTable() {
        const columnTitlePrefix = 'CARRIERS_VIEW.CARRIER_PAGE.';
        const getTranslate = (name) => this._translateService.get(columnTitlePrefix + name);
        forkJoin(this._translateService.get('Id'), getTranslate('WAREHOUSE'), getTranslate('CUSTOMER'), getTranslate('WAREHOUSE_STATUS'), getTranslate('CARRIER_STATUS'), getTranslate('TIME'))
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(([id, merchant, customer, warehouseStatus, carrierStatus, created,]) => {
            this.settingsSmartTable = {
                actions: false,
                columns: {
                    Warehouse: {
                        title: merchant,
                        type: 'custom',
                        renderComponent: StoreOrderComponent,
                        width: '20%',
                    },
                    Customer: {
                        title: customer,
                        type: 'custom',
                        renderComponent: UserOrderComponent,
                        width: '20%',
                    },
                    WarehouseStatus: {
                        title: warehouseStatus,
                        type: 'string',
                        valuePrepareFunction: (_, order) => {
                            let warehouseStat = 'BAD_STATUS';
                            getTranslate(order.warehouseStatusText)
                                .pipe(takeUntil(this.ngDestroy$))
                                .subscribe((y) => {
                                warehouseStat = y;
                            });
                            return warehouseStat;
                        },
                    },
                    CarrierStatus: {
                        title: carrierStatus,
                        type: 'string',
                        valuePrepareFunction: (_, order) => {
                            let carrierStat = 'No Status';
                            getTranslate(order.carrierStatusText)
                                .pipe(takeUntil(this.ngDestroy$))
                                .subscribe((y) => {
                                carrierStat = y;
                            });
                            return carrierStat;
                        },
                    },
                    Created: {
                        title: created,
                        type: 'custom',
                        renderComponent: CreatedComponent,
                    },
                },
                pager: {
                    display: true,
                    perPage: 3,
                },
            };
        });
    }
    smartTableChange() {
        return __awaiter(this, void 0, void 0, function* () {
            this.sourceSmartTable
                .onChanged()
                .pipe(takeUntil(this.ngDestroy$))
                .subscribe((event) => __awaiter(this, void 0, void 0, function* () {
                if (event.action === 'page') {
                    const page = event.paging.page;
                    this.loadSmartTableData(page);
                }
            }));
        });
    }
    loadDataCount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dataCount = yield this.carriersOrdersService.getCountOfCarrierOrdersHistory(this.selectedCarrier.id);
        });
    }
    loadSmartTableData(page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.$ordersHistory) {
                yield this.$ordersHistory.unsubscribe();
            }
            this.$ordersHistory = yield this.carriersOrdersService
                .getCarrierOrdersHistory(this.selectedCarrier.id, {
                sort: 'desc',
                skip: perPage * (page - 1),
                limit: perPage,
            })
                .pipe(takeUntil(this.ngDestroy$))
                .subscribe((orders) => {
                this.currentOrders = new Array(this.dataCount);
                this.currentOrders.splice(perPage * (page - 1), perPage, ...orders);
                this.sourceSmartTable.load(this.currentOrders);
            });
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
], CarrierOrdersHistoryComponent.prototype, "carrierOrderOptions", void 0);
__decorate([
    Input(),
    __metadata("design:type", Carrier)
], CarrierOrdersHistoryComponent.prototype, "selectedCarrier", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CarrierOrdersHistoryComponent.prototype, "selectedOrderEvent", void 0);
CarrierOrdersHistoryComponent = __decorate([
    Component({
        selector: 'ea-carrier-orders-history',
        templateUrl: '/carrier-orders-history.component.html',
        styleUrls: ['./carrier-orders-history.component.scss'],
    }),
    __metadata("design:paramtypes", [CarrierOrdersRouter,
        TranslateService,
        CarriersOrdersService])
], CarrierOrdersHistoryComponent);
export { CarrierOrdersHistoryComponent };
//# sourceMappingURL=carrier-orders-history.component.js.map