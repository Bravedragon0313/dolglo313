import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, } from '@angular/core';
import { WarehousesService } from '../../../../@core/data/warehouses.service';
import { OrdersService } from '../../../../@core/data/orders.service';
import { WarehouseMutationComponent } from '../../../../@shared/warehouse/warehouse-mutation';
import User from '@modules/server.common/entities/User';
import { ToasterService } from 'angular2-toaster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { UserRouter } from '@modules/client.common.angular2/routers/user-router.service';
let CustomerStoresComponent = class CustomerStoresComponent {
    constructor(_toasterService, _modalService, _warehousesService, _ordersService, _router, userRouter) {
        this._toasterService = _toasterService;
        this._modalService = _modalService;
        this._warehousesService = _warehousesService;
        this._ordersService = _ordersService;
        this._router = _router;
        this.userRouter = userRouter;
        this.sourceEventEmitter = new EventEmitter();
        this._selectedCustomerDestroy$ = new Subject();
        this._ngDestroy$ = new Subject();
        this._selectedWarehouses = [];
        this.params$ = this._router.params.subscribe((res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRouter
                .get(res.id)
                .pipe(first())
                .toPromise();
            this._destroyExceptSelectedCustomerSubscriber();
            this.currentUser = user;
            if (this.currentUser) {
                this._loadNearbyWarehouses();
            }
        }));
    }
    get hasSelectedWarehouses() {
        return this._selectedWarehouses.length > 0;
    }
    ngOnInit() {
        if (this.currentUser) {
            this._loadNearbyWarehouses();
        }
    }
    createWarehouseModel() {
        this._modalService.open(WarehouseMutationComponent, {
            size: 'lg',
            container: 'nb-layout',
        });
    }
    deleteSelectedRows() {
        const idsForDelete = this._selectedWarehouses.map((w) => w.id);
        this._warehousesService.removeByIds(idsForDelete).subscribe(() => {
            this._selectedWarehouses.forEach((warehouse) => this._toasterService.pop(`success`, `Warehouse '${warehouse.name}' DELETED`));
            this._selectedWarehouses = [];
        });
    }
    selectWarehouseTmp(ev) {
        this._selectedWarehouses = ev.selected;
    }
    _destroyExceptSelectedCustomerSubscriber() {
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
        this._ngDestroy$ = new Subject();
    }
    _setupStoresData(warehouses) {
        return __awaiter(this, void 0, void 0, function* () {
            const merchantsOrders = yield this._ordersService.getMerchantsOrdersCountInfo(warehouses.map((w) => w.id));
            const noInfoSign = '';
            const sourceResult = warehouses.map((warehouse) => {
                const merchantOrders = merchantsOrders.find((res) => res['id'] === warehouse.id);
                return {
                    id: warehouse.id,
                    name: warehouse.name || noInfoSign,
                    email: warehouse.contactEmail || noInfoSign,
                    phone: warehouse.contactPhone || noInfoSign,
                    city: warehouse.geoLocation.city || noInfoSign,
                    address: `
					St. ${warehouse.geoLocation.streetAddress || noInfoSign}, House № ${warehouse.geoLocation.house || noInfoSign}
				`,
                    ordersQty: merchantOrders ? merchantOrders.ordersCount : 0,
                    actions: {
                        actionName: 'Order',
                        actionOwnerId: this.currentUser.id,
                    },
                };
            });
            return sourceResult;
        });
    }
    _loadNearbyWarehouses() {
        const emitSource = (stores) => __awaiter(this, void 0, void 0, function* () {
            const sourceResult = yield this._setupStoresData(stores);
            this.sourceEventEmitter.emit(sourceResult);
        });
        const { loc: { type, coordinates }, } = this.currentUser.geoLocation;
        const geoInput = { loc: { type, coordinates } };
        const stores$ = this._warehousesService.getNearbyStores(geoInput);
        combineLatest(stores$)
            .pipe(takeUntil(this._ngDestroy$))
            .subscribe((res) => {
            const stores = res[0];
            emitSource(stores);
        });
    }
    ngOnDestroy() {
        this._selectedCustomerDestroy$.next();
        this._selectedCustomerDestroy$.complete();
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
        if (this.params$) {
            this.params$.unsubscribe();
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", User)
], CustomerStoresComponent.prototype, "currentUser", void 0);
CustomerStoresComponent = __decorate([
    Component({
        selector: 'ea-customer-stores',
        styleUrls: ['./ea-customer-stores.component.scss'],
        templateUrl: './ea-customer-stores.component.html',
    }),
    __metadata("design:paramtypes", [ToasterService,
        NgbModal,
        WarehousesService,
        OrdersService,
        ActivatedRoute,
        UserRouter])
], CustomerStoresComponent);
export { CustomerStoresComponent };
//# sourceMappingURL=ea-customer-stores.component.js.map