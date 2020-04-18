import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild, } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { WarehouseRouter } from '@modules/client.common.angular2/routers/warehouse-router.service';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
import { ordersFilter, } from '../../ordersFilter/ordersFilter';
import { WarehouseProductCreateComponent } from '../../../@shared/warehouse-product/warehouse-product-create';
import { ElapsedComponent } from '../../../@shared/render-component/warehouse-table/elapsed/elapsed.component';
import { WarehouseOrderComponent } from './+warehouse-order/warehouse-order.component';
import { RedirectOrderComponent } from '@app/@shared/render-component/customer-orders-table/redirect-order.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { WarehouseSelectViewComponent } from './warehouse-select-view/warehouse-select-view.component';
import { WarehouseOrdersService } from '@app/@core/data/warehouseOrders.service';
import { StatusComponent } from '@app/@shared/render-component/warehouse-table/status/status.component';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';
const perPage = 3;
let WarehouseComponent = class WarehouseComponent {
    constructor(modalService, warehouseRouter, translate, _route, _toasterService, _productLocalesService, _router, _translateService, warehouseOrdersService) {
        this.modalService = modalService;
        this.warehouseRouter = warehouseRouter;
        this.translate = translate;
        this._route = _route;
        this._toasterService = _toasterService;
        this._productLocalesService = _productLocalesService;
        this._router = _router;
        this._translateService = _translateService;
        this.warehouseOrdersService = warehouseOrdersService;
        this.ngDestroy$ = new Subject();
        this.filterMode = 'all';
        this.orders = [];
        this.allOrders = [];
        this.timers = [];
        this.sourceSmartTable = new LocalDataSource();
        this.isSelectedOrderActionsAvailable = true;
        this.page = 1;
        this._loadTableSettings();
        this._loadWarehouses();
        this._listenForEntityLocaleTranslate();
    }
    ngAfterViewInit() {
        this.loadSmartTableTranslates();
        this.smartTableChange();
    }
    ngOnChanges() { }
    openWarehouseOrderCreateModal() {
        const modalRef = this.modalService.open(WarehouseOrderComponent, {
            size: 'lg',
            container: 'nb-layout',
            windowClass: 'ng-custom',
            backdrop: 'static',
        });
        modalRef.componentInstance.orderFinishedEmitter
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(() => {
            modalRef.close();
        });
    }
    switchLanguage(language) {
        this.translate.use(language);
    }
    filterOrders(mode) {
        return __awaiter(this, void 0, void 0, function* () {
            this.selectedOrder = null;
            this.page = 1;
            yield this._getWarehouseOrders(this.warehouseID, this.page, mode);
            this.sourceSmartTable.setPage(1);
            this.filterMode = mode;
        });
    }
    getOrders() {
        this.orders = ordersFilter(this.allOrders, this.filterMode);
        return this.orders;
    }
    selectOrder(warehouseOrderProducts) {
        this.selectedOrder =
            this.selectedOrder === warehouseOrderProducts.data
                ? null
                : warehouseOrderProducts.data;
    }
    selectWarehouseEvent(warehouse) {
        this._router.navigate([`/stores/${warehouse.id}`]);
        this.selectedOrder = null;
        this.warehouse = warehouse;
        this.warehouseID = warehouse.id;
        this._getWarehouseOrders(warehouse.id, this.page, this.filterMode);
        this._loadTableSettings();
        this.selectedWarehouse = warehouse;
        if (this.productsTable) {
            this.productsTable.loadDataSmartTable(warehouse.id);
        }
    }
    loadSmartTableTranslates() {
        this._translateService.onLangChange.subscribe((d) => {
            this._loadTableSettings();
        });
    }
    openAddProductTypeModel() {
        const activeModal = this.modalService.open(WarehouseProductCreateComponent, {
            size: 'lg',
            container: 'nb-layout',
            backdrop: 'static',
            windowClass: 'ng-custom',
        });
        const modalComponent = activeModal.componentInstance;
        modalComponent.warehouseId = this.warehouseID;
        modalComponent.selectedWarehouse = this.selectedWarehouse;
    }
    _loadWarehouses() {
        this.warehouseRouter
            .getAllActive()
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe((w) => {
            this.warehouses = w;
            this._selectWarehouseIfIdExist();
        });
    }
    _getWarehouseOrders(id, page = 1, status = this.filterMode) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.$storeOrders) {
                yield this.$storeOrders.unsubscribe();
            }
            this.$storeOrders = this.warehouseOrdersService
                .getStoreOrdersTableData(id, {
                skip: perPage * (page - 1),
                limit: perPage,
            }, status)
                .pipe(takeUntil(this.ngDestroy$))
                .subscribe((res) => __awaiter(this, void 0, void 0, function* () {
                const orders = res.orders;
                yield this.loadDataCount(id, status);
                this.allOrders = orders;
                const data = this._setupDataForSmartTable(orders);
                const ordersData = new Array(this.dataCount);
                ordersData.splice(perPage * (page - 1), perPage, ...data);
                yield this.sourceSmartTable.load(ordersData);
            }));
        });
    }
    _loadTableSettings() {
        const columnTitlePrefix = 'WAREHOUSE_VIEW.';
        const getTranslate = (name) => this._translateService.get(columnTitlePrefix + name);
        forkJoin(this._translateService.get('Id'), getTranslate('ORDER_NUMBER'), getTranslate('PRODUCTS'), getTranslate('WAREHOUSE_STATUS'), getTranslate('CARRIER_STATUS'), getTranslate('PAID'), getTranslate('CANCELLED'), getTranslate('CREATED'), getTranslate('ELAPSED'))
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(([id, orderNumber, product, status, carrier, paid, cancelled, created, elapsed,]) => {
            this.settingsSmartTable = {
                actions: false,
                columns: {
                    orderNumber: {
                        title: orderNumber,
                        type: 'custom',
                        renderComponent: RedirectOrderComponent,
                        width: '100px',
                    },
                    product: { title: product, type: 'html' },
                    status: {
                        title: status,
                        type: 'html',
                        width: '100px',
                    },
                    carrierStatusHtml: {
                        title: carrier,
                        type: 'html',
                        width: '100px',
                    },
                    paid: {
                        title: paid,
                        type: 'custom',
                        renderComponent: StatusComponent,
                        onComponentInitFunction: (instance) => __awaiter(this, void 0, void 0, function* () {
                            instance.text = paid;
                            instance.checkOrderField = 'isPaid';
                        }),
                        width: '100px',
                    },
                    cancelled: {
                        title: cancelled,
                        type: 'custom',
                        renderComponent: StatusComponent,
                        onComponentInitFunction: (instance) => __awaiter(this, void 0, void 0, function* () {
                            instance.text = cancelled;
                            instance.checkOrderField = 'isCancelled';
                        }),
                        width: '100px',
                    },
                    created: { title: created, type: 'string' },
                    elapsed: {
                        title: elapsed,
                        filter: false,
                        type: 'custom',
                        renderComponent: ElapsedComponent,
                    },
                },
                pager: {
                    display: true,
                    perPage,
                },
            };
        });
    }
    _setupDataForSmartTable(orders) {
        const data = [];
        orders.forEach((order) => {
            const raw = new Date(order._createdAt);
            const formatted = new DatePipe('en-EN').transform(raw, 'dd-MMM-yyyy hh:mm:ss');
            const columnTitlePrefix = 'STATUS_TEXT.';
            const getTranslate = (name) => this._translateService.get(columnTitlePrefix + name);
            forkJoin(this._translateService.get('Id'), getTranslate(order.warehouseStatusText), getTranslate(order.carrierStatusText), getTranslate('CARRIER'), getTranslate('PAID'), getTranslate('CANCELLED'), getTranslate('CREATED'), getTranslate('ELAPSED'))
                .pipe(takeUntil(this.ngDestroy$))
                .subscribe(([id, warehouseStatusText, carrierStatusText, carrier, paid, cancelled, created, elapsed,]) => {
                data.push({
                    id: order.id,
                    products: order.products,
                    orderNumber: order.orderNumber,
                    warehouseStatusText: order.warehouseStatusText,
                    carrierStatusText: order.carrierStatusText,
                    createdAt: order.createdAt,
                    warehouseStatus: order.warehouseStatus,
                    carrier: order.carrier,
                    carrierStatus: order.carrierStatus,
                    isPaid: order.isPaid,
                    isCancelled: order.isCancelled,
                    product: order.products.length
                        ? `
							<div>
								<img width="32" height="32" src="${this.localeTranslate(order.products[0].product.images)}" />
								<p class="d-inline-block">
									${this.localeTranslate(order.products[0].product.title)}
									<span class="badge badge-pill badge-secondary">${order.products[0].count}</span>
								</p>
							</div>
						`
                        : '',
                    status: `<div class="badge badge-secondary">${warehouseStatusText}</div>`,
                    carrierStatusHtml: `<div class="badge badge-secondary">${carrierStatusText}</div>`,
                    created: formatted,
                    orderType: order.orderType,
                    order,
                });
            });
        });
        return data;
    }
    localeTranslate(member) {
        return this._productLocalesService.getTranslate(member);
    }
    _listenForEntityLocaleTranslate() {
        this.translate.onLangChange.subscribe(() => {
            const data = this._setupDataForSmartTable(this.getOrders());
            this.sourceSmartTable.load(data);
        });
    }
    _selectWarehouseIfIdExist() {
        return __awaiter(this, void 0, void 0, function* () {
            const p = yield this._route.params.pipe(first()).toPromise();
            const warehouseId = p.id;
            if (warehouseId !== undefined) {
                const warehouse = this.warehouses.find((w) => w.id === p.id);
                if (warehouse !== undefined) {
                    this.selectWarehouseEvent(warehouse);
                }
                else {
                    this._toasterService.pop(`warning`, `Warehouse with id '${warehouseId}' is not active now!`);
                }
            }
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
                    this.page = page;
                    this._getWarehouseOrders(this.warehouseID, page, (status = this.filterMode));
                }
            }));
        });
    }
    loadDataCount(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            this.dataCount = yield this.warehouseOrdersService.getCountOfStoreOrders(id, status);
        });
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
};
__decorate([
    ViewChild('productsTable'),
    __metadata("design:type", ProductsTableComponent)
], WarehouseComponent.prototype, "productsTable", void 0);
__decorate([
    ViewChild('warehouseSelectView'),
    __metadata("design:type", WarehouseSelectViewComponent)
], WarehouseComponent.prototype, "warehouseSelectView", void 0);
WarehouseComponent = __decorate([
    Component({
        selector: 'ea-warehouse',
        templateUrl: './warehouse.component.html',
        styleUrls: ['./warehouse.component.scss'],
    }),
    __metadata("design:paramtypes", [NgbModal,
        WarehouseRouter,
        TranslateService,
        ActivatedRoute,
        ToasterService,
        ProductLocalesService,
        Router,
        TranslateService,
        WarehouseOrdersService])
], WarehouseComponent);
export { WarehouseComponent };
//# sourceMappingURL=warehouse.component.js.map