var CarrierOrdersComponent_1;
import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output, } from '@angular/core';
import OrderCarrierStatus from '@modules/server.common/enums/OrderCarrierStatus';
import Carrier from '@modules/server.common/entities/Carrier';
import { CarrierOrdersRouter } from '@modules/client.common.angular2/routers/carrier-orders-router.service';
import { OrderRouter } from '@modules/client.common.angular2/routers/order-router.service';
import CarrierStatus from '@modules/server.common/enums/CarrierStatus';
import _ from 'lodash';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs/Rx';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { CreatedComponent } from '../../../../@shared/render-component/created/created.component';
import { CarriersService } from '@app/@core/data/carriers.service';
import { GeoLocationOrdersService } from '@app/@core/data/geo-location-orders.service';
import { StoreOrderComponent } from '@app/@shared/render-component/carrier-orders-table/store-order.component';
import { UserOrderComponent } from '@app/@shared/render-component/carrier-orders-table/user-order-component';
import { takeUntil } from 'rxjs/operators';
const perPage = 3;
let searchCustomer;
let oldSearch = '';
let CarrierOrdersComponent = CarrierOrdersComponent_1 = class CarrierOrdersComponent {
    constructor(carrierOrdersRouter, orderRouter, _translateService, carriersService, geoLocationOrdersService) {
        this.carrierOrdersRouter = carrierOrdersRouter;
        this.orderRouter = orderRouter;
        this._translateService = _translateService;
        this.carriersService = carriersService;
        this.geoLocationOrdersService = geoLocationOrdersService;
        this.ngDestroy$ = new Subject();
        this.selectedOrderEvent = new EventEmitter();
        this.sourceSmartTable = new LocalDataSource();
        this.enumOrderCarrierStatus = OrderCarrierStatus;
        this.carrierOnlineStatus = CarrierStatus.Online;
        this._setupSmartTable();
    }
    get isCarrierPickupOrder() {
        return (this.selectedOrder &&
            this.selectedOrder !== undefined &&
            this.selectedOrder.carrierStatus ===
                this.enumOrderCarrierStatus.CarrierPickedUpOrder);
    }
    get isCarrierArrivedToCustomer() {
        return (this.selectedOrder &&
            this.selectedOrder !== undefined &&
            this.selectedOrder.carrierStatus ===
                this.enumOrderCarrierStatus.CarrierArrivedToCustomer);
    }
    ngAfterViewInit() {
        this.loadSmartTableTranslates();
        this.smartTableChange();
        CarrierOrdersComponent_1.$customerSearch
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe((searchText) => __awaiter(this, void 0, void 0, function* () {
            yield this.loadDataCount({
                byRegex: [{ key: 'user.firstName', value: searchText }],
            });
            yield this.loadSmartTableData(1, {
                byRegex: [{ key: 'user.firstName', value: searchText }],
            });
        }));
    }
    ngOnChanges() {
        this.loadDataCount();
        this.getAllAvailableOrders();
        this._isWork = true;
    }
    getAllAvailableOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loadSmartTableData();
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
    selectOrder(ev) {
        const order = ev.data;
        if (this.selectedOrder && order.id === this.selectedOrder.id) {
            this.selectedOrderEvent.emit(null);
            this.selectedOrder = null;
            this._isWork = false;
        }
        else {
            this.selectedOrderEvent.emit(order);
            this.selectedOrder = order;
            this._isWork = true;
        }
    }
    loadSmartTableTranslates() {
        this._translateService.onLangChange.subscribe(() => {
            this._setupSmartTable();
        });
    }
    get canControl() {
        return _.some(this.currentOrders, (order) => order
            ? OrderCarrierStatus.CarrierPickedUpOrder <=
                order.carrierStatus &&
                OrderCarrierStatus.DeliveryCompleted >= order.carrierStatus
            : false);
    }
    updateOrderCarrierStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            this.selectedOrder = yield this.orderRouter.updateCarrierStatus(this.selectedOrder.id, status);
            yield this.loadSmartTableData();
        });
    }
    _setupSmartTable() {
        const columnTitlePrefix = 'CARRIERS_VIEW.CARRIER_PAGE.';
        const getTranslate = (name) => this._translateService.get(columnTitlePrefix + name);
        forkJoin(this._translateService.get('Id'), getTranslate('WAREHOUSE'), getTranslate('CUSTOMER'), getTranslate('WAREHOUSE_STATUS'), getTranslate('CARRIER_STATUS'), getTranslate('CREATED'))
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(([id, warehouse, customer, warehouseStatus, carrierStatus, created,]) => {
            this.settingsSmartTable = {
                actions: false,
                columns: {
                    Warehouse: {
                        title: warehouse,
                        type: 'custom',
                        renderComponent: StoreOrderComponent,
                        width: '20%',
                    },
                    Customer: {
                        title: customer,
                        type: 'custom',
                        renderComponent: UserOrderComponent,
                        width: '20%',
                        filterFunction(cell, search) {
                            if (!searchCustomer &&
                                oldSearch !== search) {
                                oldSearch = search;
                                searchCustomer = true;
                                setTimeout(() => {
                                    searchCustomer = false;
                                    CarrierOrdersComponent_1.$customerSearch.emit(search);
                                }, 1000);
                            }
                            return true;
                        },
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
                    perPage,
                },
            };
        });
    }
    loadDataCount(searchObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const getOrdersGeoObj = {
                loc: {
                    type: 'Point',
                    coordinates: this.selectedCarrier.geoLocation.loc.coordinates,
                },
            };
            this.dataCount = yield this.geoLocationOrdersService.getCountOfOrdersForWork(getOrdersGeoObj, this.selectedCarrier.skippedOrderIds, searchObj);
        });
    }
    loadSmartTableData(page = 1, searchObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const getOrdersGeoObj = {
                loc: {
                    type: 'Point',
                    coordinates: this.selectedCarrier.geoLocation.loc.coordinates,
                },
            };
            if (this.$locationOrders) {
                yield this.$locationOrders.unsubscribe();
            }
            this.$locationOrders = this.geoLocationOrdersService
                .getOrdersForWork(getOrdersGeoObj, this.selectedCarrier.skippedOrderIds, {
                skip: perPage * (page - 1),
                limit: perPage,
            }, searchObj)
                .pipe(takeUntil(this.ngDestroy$))
                .subscribe((ordersForWork) => __awaiter(this, void 0, void 0, function* () {
                const currentOrder = yield this.carriersService.getCarrierCurrentOrder(this.selectedCarrier.id);
                if (currentOrder) {
                    this.currentOrders = [currentOrder];
                }
                else {
                    this.currentOrders = new Array(this.dataCount);
                    this.currentOrders.splice(perPage * (page - 1), perPage, ...ordersForWork);
                }
                yield this.sourceSmartTable.load(this.currentOrders);
            }));
        });
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
};
CarrierOrdersComponent.$customerSearch = new EventEmitter();
__decorate([
    Input(),
    __metadata("design:type", Object)
], CarrierOrdersComponent.prototype, "carrierOrderOptions", void 0);
__decorate([
    Input(),
    __metadata("design:type", Carrier)
], CarrierOrdersComponent.prototype, "selectedCarrier", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CarrierOrdersComponent.prototype, "selectedOrderEvent", void 0);
CarrierOrdersComponent = CarrierOrdersComponent_1 = __decorate([
    Component({
        selector: 'ea-carrier-orders',
        templateUrl: '/carrier-orders.component.html',
        styleUrls: ['./carrier-orders.component.scss'],
    }),
    __metadata("design:paramtypes", [CarrierOrdersRouter,
        OrderRouter,
        TranslateService,
        CarriersService,
        GeoLocationOrdersService])
], CarrierOrdersComponent);
export { CarrierOrdersComponent };
//# sourceMappingURL=carrier-orders.component.js.map