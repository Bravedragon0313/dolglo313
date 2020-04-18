import { __awaiter, __decorate, __metadata } from "tslib";
import _ from 'lodash';
import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import OrderCarrierStatus from '@modules/server.common/enums/OrderCarrierStatus';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { first } from 'rxjs/operators';
import { CarriersService } from '../../../@core/data/carriers.service';
import CarrierStatus from '@modules/server.common/enums/CarrierStatus';
import { CarrierOrdersComponent } from './carrier-orders/carrier-orders.component';
let CarrierComponent = class CarrierComponent {
    constructor(_route, _router, _toasterService, carriersService) {
        this._route = _route;
        this._router = _router;
        this._toasterService = _toasterService;
        this.carriersService = carriersService;
        this.ngDestroy$ = new Subject();
        this.selectedOrdersId = [];
        this.inDeliveryOrders = [];
        this.closeOrders = [];
    }
    get showOrderStatus() {
        return (this.selectedOrder &&
            this.selectedOrder.carrierStatus <
                OrderCarrierStatus.CarrierPickedUpOrder &&
            this.selectedCarrier &&
            this.selectedCarrier.status === CarrierStatus.Online);
    }
    ngOnInit() {
        this.getAllCarriers();
    }
    get isCarrierDelivering() {
        return this.inDeliveryOrders.length > 0;
    }
    get currentOrders() {
        if (this.isCarrierDelivering) {
            return this.inDeliveryOrders;
        }
        else {
            return this.closeOrders;
        }
    }
    get shouldShowOrdersStatusesControl() {
        return (this.selectedOrdersId.length > 0 &&
            _.find(this.currentOrders, (order) => order.id === this.selectedOrdersId[0]).carrierStatus <= OrderCarrierStatus.CarrierSelectedOrder);
    }
    getChangeOrder(order) {
        this.selectedOrder = order;
    }
    getChangeCarrier(carrier) {
        if (carrier.status === CarrierStatus.Offline) {
            this.carrierOrders.selectedOrder = null;
            this.selectedOrder = null;
        }
    }
    carrierSelect(newCarrier) {
        this._router.navigate([`/carriers/${newCarrier.id}`]);
        this.selectedOrder = null;
        const objToCompare = {
            populateWarehouse: true,
            completion: 'not-completed',
        };
        this.carrierOrderOptions =
            this.carrierOrderOptions === objToCompare ? null : objToCompare;
        this.selectedCarrier =
            this.selectedCarrier === newCarrier ? null : newCarrier;
    }
    getAllCarriers() {
        this.carriers$ = this.carriersService.getCarriers().subscribe((c) => {
            this.carriers = c;
            this._selectCarrierIfIdExists();
        });
    }
    orderStatusShow(warehouseOrderProducts) {
        if (warehouseOrderProducts) {
            this.selectedOrdersId = warehouseOrderProducts.id;
            this.selectedOrder = warehouseOrderProducts;
        }
        else {
            this.selectedOrder = null;
        }
    }
    selectTab(ev) {
        if (this.currentTab !== ev.tabTitle) {
            this.currentTab = ev.tabTitle;
            if (this.carrierOrders) {
                this.carrierOrders.selectedOrder = null;
            }
            this.selectedOrder = null;
        }
    }
    selectedOrdersChange(selectedOrdersIds) {
        this.selectedOrdersId = selectedOrdersIds;
    }
    _selectCarrierIfIdExists() {
        return __awaiter(this, void 0, void 0, function* () {
            const p = yield this._route.params.pipe(first()).toPromise();
            const carrierId = p.id;
            if (carrierId !== undefined) {
                const carrier = this.carriers.find((c) => c._id.toString() === carrierId);
                if (carrier !== undefined) {
                    this.carrierSelect(carrier);
                }
                else {
                    this._toasterService.pop(`warning`, `Carrier with id '${carrierId}' is not active!`);
                }
            }
        });
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
        if (this.carriers$) {
            this.carriers$.unsubscribe();
        }
    }
};
__decorate([
    ViewChild('carrierOrders', { static: true }),
    __metadata("design:type", CarrierOrdersComponent)
], CarrierComponent.prototype, "carrierOrders", void 0);
CarrierComponent = __decorate([
    Component({
        selector: 'ea-carrier',
        templateUrl: './carrier.component.html',
        styleUrls: ['./carrier.component.scss'],
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        Router,
        ToasterService,
        CarriersService])
], CarrierComponent);
export { CarrierComponent };
//# sourceMappingURL=carrier.component.js.map