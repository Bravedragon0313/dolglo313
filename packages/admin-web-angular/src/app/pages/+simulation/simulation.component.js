import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
import { UserMutationComponent } from '../../@shared/user/user-mutation';
import { GeoLocationService } from '../../@core/data/geo-location.service';
import { takeUntil, first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRouter } from '@modules/client.common.angular2/routers/user-router.service';
import { Store } from '@app/@core/data/store.service';
import { SimulationProductsComponent } from './products/products.component';
import { WarehouseOrdersRouter } from '@modules/client.common.angular2/routers/warehouse-orders-router.service';
import { OrderRouter } from '@modules/client.common.angular2/routers/order-router.service';
import { InviteRouter } from '@modules/client.common.angular2/routers/invite-router.service';
import { InviteRequestModalComponent } from '@app/@shared/invite/invite-request/invite-request-modal.component';
import { ToasterService } from 'angular2-toaster';
import { ByCodeModalComponent } from '@app/@shared/invite/by-code/by-code-modal.component';
import { SimulationInstructionsComponent, Step, } from './instructions/instructions.component';
import { WarehouseRouter } from '@modules/client.common.angular2/routers/warehouse-router.service';
let SimulationComponent = class SimulationComponent {
    constructor(_modalService, translate, _productLocalesService, geoLocationService, store, userRouter, warehouseOrdersRouter, orderRouter, inviteRouter, toasterService, warehouseRouter) {
        this._modalService = _modalService;
        this.translate = translate;
        this._productLocalesService = _productLocalesService;
        this.geoLocationService = geoLocationService;
        this.store = store;
        this.userRouter = userRouter;
        this.warehouseOrdersRouter = warehouseOrdersRouter;
        this.orderRouter = orderRouter;
        this.inviteRouter = inviteRouter;
        this.toasterService = toasterService;
        this.warehouseRouter = warehouseRouter;
        this._ngDestroy$ = new Subject();
        this._productsInfoData = [];
        this.loadPage();
    }
    loadPage() {
        return __awaiter(this, void 0, void 0, function* () {
            const invitesSettings = yield this.inviteRouter.getInvitesSettings();
            this.inviteSystem = invitesSettings.isEnabled;
            this.loadButtons = true;
            this._listenForEntityLocaleTranslate();
            this._startTracking();
        });
    }
    ngOnInit() {
        this.selectProductsChange();
        localStorage.removeItem('simulationStartDate');
        localStorage.removeItem('simulationEndTime');
    }
    localeTranslate(member) {
        return this._productLocalesService.getTranslate(member);
    }
    showInviteRequestModal() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.inviteRequest = yield this._modalService.open(InviteRequestModalComponent, {
                    size: 'lg',
                    container: 'nb-layout',
                    backdrop: 'static',
                }).result;
            }
            catch (error) {
                this.inviteRequest = null;
            }
        });
    }
    selectProductsChange() {
        this.productsTable.selectProductsChange$
            .pipe(takeUntil(this._ngDestroy$))
            .subscribe((res) => __awaiter(this, void 0, void 0, function* () {
            this.productsCount = this.productsTable.selectedProducts.length;
            if (this.productsCount > 0) {
                const warehouseId = this.productsTable.selectedProducts[0]['warehouseId'];
                if (!this.warehouse ||
                    (warehouseId && this.warehouse.id !== warehouseId)) {
                    this.warehouse = yield this.warehouseRouter
                        .get(warehouseId)
                        .pipe(first())
                        .toPromise();
                }
            }
            this.hasProductsForOrder =
                this.productsTable.selectedProducts.length > 0;
        }));
    }
    orderCreate() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = this.productsTable.selectedProducts;
            this.loading = true;
            if (products.length > 0) {
                this.hasProductsForOrder = false;
                const orderProducts = products.map((p) => ({
                    count: 1,
                    productId: p.id,
                }));
                const warehouseId = products[0]['warehouseId'];
                const orderRouterOptions = {
                    populateWarehouse: true,
                    populateCarrier: true,
                };
                const orderCreateInput = {
                    userId: this.user.id,
                    warehouseId,
                    products: orderProducts,
                };
                const order = yield this.warehouseOrdersRouter.create(orderCreateInput);
                this.orderRouter
                    .get(order.id, orderRouterOptions)
                    .pipe(takeUntil(this._ngDestroy$))
                    .subscribe((o) => {
                    this.order = o;
                });
                this.loading = false;
                this.instructions.step = Step.Three;
            }
        });
    }
    orderConfirm() {
        this.loading = true;
        this.order = null;
        this.instructions.step = Step.Two;
        this.productsTable.setupDataForSmartTable(this._productsInfoData);
    }
    inviteUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.invite = yield this.inviteRouter.create(this.getInviteCreateObj());
                this.inviteRequest = null;
                this.instructions.inviteCode = this.invite.code;
                this.toasterService.pop('success', `Successful invited user, your code is ${this.invite.code}`);
            }
            catch (err) {
                this.toasterService.pop('error', `Error in invite user: "${err.message}"`);
            }
        });
    }
    createUser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.inviteSystem) {
                return this.showByCodeModal();
            }
            else {
                return this.showCreateUserModal();
            }
        });
    }
    orderCancel() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loading = true;
            yield this.warehouseOrdersRouter.cancel(this.order.id);
            this.order = null;
            this.instructions.step = Step.Two;
            this.loading = false;
        });
    }
    getInviteCreateObj() {
        if (this.inviteRequest) {
            return {
                geoLocation: this.inviteRequest.geoLocation,
                apartment: this.inviteRequest.apartment,
            };
        }
        return null;
    }
    showCreateUserModal() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.user = yield this._modalService.open(UserMutationComponent, {
                    size: 'lg',
                    container: 'nb-layout',
                    backdrop: 'static',
                }).result;
                this.store.userId = this.user.id;
                this._startTracking();
            }
            catch (error) {
                this.user = null;
            }
        });
    }
    showByCodeModal() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activeModal = this._modalService.open(ByCodeModalComponent, {
                    size: 'sm',
                    container: 'nb-layout',
                });
                const modalComponent = activeModal.componentInstance;
                if (this.invite) {
                    modalComponent.location = this.invite.geoLocation.loc;
                }
                this.user = yield activeModal.result;
                this.store.userId = this.user.id;
                this.invite = null;
                this._startTracking();
            }
            catch (error) {
                this.user = null;
            }
        });
    }
    _startTracking() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.store.userId) {
                this.user = yield this.userRouter
                    .get(this.store.userId)
                    .pipe(first())
                    .toPromise();
                const productsInfo = this.geoLocationService.getGeoLocationProducts(this.user.geoLocation);
                productsInfo
                    .pipe(takeUntil(this._ngDestroy$))
                    .subscribe((pInfo) => {
                    pInfo = pInfo || [];
                    this._productsInfoData = pInfo;
                    this.productsTable.setupDataForSmartTable(pInfo);
                });
                this.instructions.step = Step.Two;
            }
            else {
                this.instructions.step = Step.One;
            }
        });
    }
    _listenForEntityLocaleTranslate() {
        this.translate.onLangChange
            .pipe(takeUntil(this._ngDestroy$))
            .subscribe(() => {
            this.productsTable.setupDataForSmartTable(this._productsInfoData);
        });
    }
    ngOnDestroy() {
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
    }
};
__decorate([
    ViewChild('productsTable', { static: true }),
    __metadata("design:type", SimulationProductsComponent)
], SimulationComponent.prototype, "productsTable", void 0);
__decorate([
    ViewChild('instructions'),
    __metadata("design:type", SimulationInstructionsComponent)
], SimulationComponent.prototype, "instructions", void 0);
SimulationComponent = __decorate([
    Component({
        selector: 'ea-simulation',
        templateUrl: './simulation.component.html',
        styleUrls: ['/simulation.component.scss'],
    }),
    __metadata("design:paramtypes", [NgbModal,
        TranslateService,
        ProductLocalesService,
        GeoLocationService,
        Store,
        UserRouter,
        WarehouseOrdersRouter,
        OrderRouter,
        InviteRouter,
        ToasterService,
        WarehouseRouter])
], SimulationComponent);
export { SimulationComponent };
//# sourceMappingURL=simulation.component.js.map