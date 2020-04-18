var WarehousesComponent_1;
import { __awaiter, __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { WarehousesService } from '../../@core/data/warehouses.service';
import { OrdersService } from '../../@core/data/orders.service';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { WarehouseMutationComponent } from '../../@shared/warehouse/warehouse-mutation';
import { RedirectNameComponent } from '../../@shared/render-component/name-redirect/name-redirect.component';
import { WarehouseActionsComponent } from '../../@shared/render-component/warehouse-table/warehouse-actions/warehouse-actions.component';
import { WarehouseImageComponent } from '../../@shared/render-component/warehouse-table/warehouse-image/warehouse-image.component';
import { WarehouseOrdersNumberComponent } from '../../@shared/render-component/warehouse-table/warehouse-orders-number/warehouse-orders-number.component';
import { ConfimationModalComponent } from '../../@shared/confirmation-modal/confirmation-modal.component';
import { WarehouseEmailComponent } from '../../@shared/render-component/warehouse-table/warehouse-email/warehouse-email.component';
import { WarehousePhoneComponent } from '../../@shared/render-component/warehouse-table/warehouse-phone/warehouse-phone.component';
const perPage = 5;
let WarehousesComponent = WarehousesComponent_1 = class WarehousesComponent {
    constructor(_translateService, _router, _modalService, _warehousesService, _ordersService, _toasterService, _sanitizer, modalService) {
        this._translateService = _translateService;
        this._router = _router;
        this._modalService = _modalService;
        this._warehousesService = _warehousesService;
        this._ordersService = _ordersService;
        this._toasterService = _toasterService;
        this._sanitizer = _sanitizer;
        this.modalService = modalService;
        this.ngDestroy$ = new Subject();
        this.sourceSmartTable = new LocalDataSource();
        this._selectedWarehouses = [];
        this._loadSettingsSmartTable();
    }
    get hasSelectedWarehouses() {
        return this._selectedWarehouses.length > 0;
    }
    ngAfterViewInit() {
        this._addCustomHTMLElements();
        this._applyTranslationOnSmartTable();
        this.smartTableChange();
        this._loadDataSmartTable();
    }
    createWarehouseModel() {
        this._modalService.open(WarehouseMutationComponent, {
            size: 'lg',
            container: 'nb-layout',
            backdrop: 'static',
        });
    }
    selectWarehouseTmp(ev) {
        this._selectedWarehouses = ev.selected;
    }
    deleteSelectedRows() {
        return __awaiter(this, void 0, void 0, function* () {
            const activeModal = this.modalService.open(ConfimationModalComponent, {
                size: 'sm',
                container: 'nb-layout',
                backdrop: 'static',
            });
            const modalComponent = activeModal.componentInstance;
            yield modalComponent.confirmEvent
                .pipe(takeUntil(modalComponent.ngDestroy$))
                .subscribe((dataEvent) => {
                const idsForDelete = this._selectedWarehouses.map((w) => w.id);
                try {
                    this.loading = true;
                    this._warehousesService
                        .removeByIds(idsForDelete)
                        .subscribe(() => {
                        this.loading = false;
                        this._toasterService.pop(`success`, `Selected warehouse are deleted!`);
                        this._selectedWarehouses = [];
                    });
                }
                catch (error) {
                    this.loading = false;
                    this._toasterService.pop('error', `Error: "${error.message}"`);
                }
                modalComponent.cancel();
            });
        });
    }
    _addCustomHTMLElements() {
        document.querySelector('tr.ng2-smart-filters > th:nth-child(1)').innerHTML = '<i class="fa fa-search" style="font-size: 1.3em"/>';
    }
    _selectWarehouse(warehouseId) {
        this._router.navigate(['/stores/' + warehouseId]);
    }
    _applyTranslationOnSmartTable() {
        this._translateService.onLangChange
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(() => {
            this._loadSettingsSmartTable();
        });
    }
    _loadDataSmartTable(page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.$merchants) {
                yield this.$merchants.unsubscribe();
            }
            let warehouses = [];
            this.$merchants = this._warehousesService
                .getStores({
                skip: perPage * (page - 1),
                limit: perPage,
            })
                .pipe(takeUntil(this.ngDestroy$))
                .subscribe((w) => {
                warehouses = w;
                loadData();
            });
            const loadData = () => __awaiter(this, void 0, void 0, function* () {
                const merchantsOrders = yield this._ordersService.getMerchantsOrdersCountInfo(warehouses.map((w) => w.id));
                const warehousesVM = warehouses.map((warehouse) => {
                    const merchantOrders = merchantsOrders.find((res) => res['id'] === warehouse.id);
                    return {
                        id: warehouse.id,
                        image: warehouse.logo || WarehousesComponent_1.noInfoSign,
                        name: warehouse.name || WarehousesComponent_1.noInfoSign,
                        email: warehouse.contactEmail ||
                            WarehousesComponent_1.noInfoSign,
                        phone: warehouse.contactPhone ||
                            WarehousesComponent_1.noInfoSign,
                        city: warehouse.geoLocation.city ||
                            WarehousesComponent_1.noInfoSign,
                        address: `st. ${warehouse.geoLocation.streetAddress ||
                            WarehousesComponent_1.noInfoSign}, hse. № ${warehouse.geoLocation.house ||
                            WarehousesComponent_1.noInfoSign}`,
                        ordersQty: merchantOrders ? merchantOrders.ordersCount : 0,
                        warehouseInfo: warehouse,
                    };
                });
                yield this.loadDataCount();
                const merchantsData = new Array(this.dataCount);
                merchantsData.splice(perPage * (page - 1), perPage, ...warehousesVM);
                yield this.sourceSmartTable.load(merchantsData);
            });
        });
    }
    _loadSettingsSmartTable() {
        const columnTitlePrefix = 'WAREHOUSES_VIEW.SMART_TABLE_COLUMNS.';
        const getTranslate = (name) => this._translateService.get(columnTitlePrefix + name);
        forkJoin(this._translateService.get('Id'), getTranslate('IMAGE'), getTranslate('NAME'), getTranslate('EMAIL'), getTranslate('PHONE'), getTranslate('CITY'), getTranslate('ADDRESS'), getTranslate('ORDERS'))
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(([id, image, name, email, phone, city, address, orders]) => {
            this.settingsSmartTable = {
                actions: false,
                selectMode: 'multi',
                columns: {
                    images: {
                        title: image,
                        class: 'warehouse-image',
                        type: 'custom',
                        renderComponent: WarehouseImageComponent,
                        onComponentInitFunction: (instance) => {
                            instance.redirectPage = 'stores';
                        },
                        filter: false,
                    },
                    name: {
                        title: name,
                        type: 'custom',
                        class: 'warehouse-name',
                        renderComponent: RedirectNameComponent,
                        onComponentInitFunction: (instance) => {
                            instance.redirectPage = 'stores';
                        },
                    },
                    email: {
                        title: email,
                        type: 'custom',
                        renderComponent: WarehouseEmailComponent,
                        class: 'warehouse-email',
                    },
                    phone: {
                        title: phone,
                        type: 'custom',
                        renderComponent: WarehousePhoneComponent,
                        class: 'warehouse-phone',
                    },
                    city: {
                        title: city,
                        class: 'warehouse-city',
                    },
                    address: {
                        title: address,
                        class: 'warehouse-address',
                    },
                    ordersQty: {
                        title: orders,
                        type: 'custom',
                        filter: false,
                        class: 'warehouse-qty',
                        renderComponent: WarehouseOrdersNumberComponent,
                        onComponentInitFunction: (instance) => {
                            instance.redirectPage = 'stores';
                        },
                    },
                    actions: {
                        title: 'Actions',
                        filter: false,
                        type: 'custom',
                        class: 'warehouse-actions',
                        renderComponent: WarehouseActionsComponent,
                    },
                },
                pager: {
                    display: true,
                    perPage,
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
                    this._loadDataSmartTable(page);
                }
            }));
        });
    }
    loadDataCount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dataCount = yield this._warehousesService.getCountOfMerchants();
        });
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
};
WarehousesComponent.noInfoSign = '';
WarehousesComponent = WarehousesComponent_1 = __decorate([
    Component({
        selector: 'ea-warehouses',
        templateUrl: './warehouses.component.html',
        styleUrls: ['./warehouses.component.scss'],
    }),
    __metadata("design:paramtypes", [TranslateService,
        Router,
        NgbModal,
        WarehousesService,
        OrdersService,
        ToasterService,
        DomSanitizer,
        NgbModal])
], WarehousesComponent);
export { WarehousesComponent };
//# sourceMappingURL=warehouses.component.js.map