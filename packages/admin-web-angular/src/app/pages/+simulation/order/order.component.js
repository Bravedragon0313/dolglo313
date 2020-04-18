import { __decorate, __metadata } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import Order from '@modules/server.common/entities/Order';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
import OrderCarrierStatus from '@modules/server.common/enums/OrderCarrierStatus';
import { takeUntil } from 'rxjs/operators';
import { ElapsedTimeComponent } from '@app/@shared/elapsed-time/elapsed-time.component';
export var DeliveryStatus;
(function (DeliveryStatus) {
    DeliveryStatus[DeliveryStatus["Warehouse"] = 0] = "Warehouse";
    DeliveryStatus[DeliveryStatus["Carrier"] = 1] = "Carrier";
    DeliveryStatus[DeliveryStatus["Customer"] = 2] = "Customer";
    DeliveryStatus[DeliveryStatus["Completed"] = 3] = "Completed";
})(DeliveryStatus || (DeliveryStatus = {}));
let SimulationOrderComponent = class SimulationOrderComponent {
    constructor(_translateService, _localeTranslate) {
        this._translateService = _translateService;
        this._localeTranslate = _localeTranslate;
        this._ngDestroy$ = new Subject();
    }
    ngOnInit() {
        if (!this._getStartDate) {
            this._setStartDate = new Date();
        }
    }
    getSlideImage(order) {
        const images = order.products.map((p) => {
            return {
                url: this._localeTranslate.getTranslate(p.product.images),
                caption: this._localeTranslate.getTranslate(p.product.title),
                title: this._localeTranslate.getTranslate(p.product.description),
                backgroundSize: 'contain',
                backgroundPosition: 'center',
            };
        });
        return images;
    }
    get _getStartDate() {
        return localStorage.getItem('simulationStartDate');
    }
    set _setStartDate(val) {
        localStorage.setItem('simulationStartDate', JSON.stringify(val));
    }
    set _setEndTime(val) {
        localStorage.setItem('simulationEndTime', JSON.stringify(val));
    }
    get isCustomerActive() {
        return this.currentStatus >= DeliveryStatus.Customer;
    }
    get isCustomerCurrent() {
        const isCurrent = this.currentStatus === DeliveryStatus.Customer;
        if (isCurrent !== this.delivered &&
            !isCurrent &&
            this.isCustomerActive) {
            if (this.elapsedTime) {
                this._setEndTime = this.elapsedTime.timePasssed;
                this.clearTimer();
            }
        }
        this.delivered = isCurrent;
        return isCurrent;
    }
    get isWarehouseActive() {
        return this.currentStatus >= DeliveryStatus.Warehouse;
    }
    get isWarehouseCurrent() {
        return this.currentStatus === DeliveryStatus.Warehouse;
    }
    get isCarrierActive() {
        return this.currentStatus >= DeliveryStatus.Carrier;
    }
    get isCarrierCurrent() {
        return this.currentStatus === DeliveryStatus.Carrier;
    }
    get currentStatus() {
        if (this.order == null) {
            return DeliveryStatus.Warehouse;
        }
        if (this.order['isCompleted']) {
            return DeliveryStatus.Completed;
        }
        else if (this.order.carrierStatus >=
            OrderCarrierStatus.CarrierArrivedToCustomer) {
            return DeliveryStatus.Customer;
        }
        else if (this.order.carrierStatus >= OrderCarrierStatus.CarrierPickedUpOrder) {
            return DeliveryStatus.Carrier;
        }
        else {
            return DeliveryStatus.Warehouse;
        }
    }
    get deliveryTimeRange() {
        if (this.order == null) {
            return '';
        }
        let deliveryTimeMin = 0;
        let deliveryTimeMax = 0;
        this.order.products.forEach((product) => {
            if (product.deliveryTimeMin &&
                product.deliveryTimeMin > deliveryTimeMin) {
                deliveryTimeMin = product.deliveryTimeMin;
            }
            if (product.deliveryTimeMax &&
                product.deliveryTimeMax > deliveryTimeMax) {
                deliveryTimeMax = product.deliveryTimeMax;
            }
        });
        if (deliveryTimeMin !== 0 && deliveryTimeMax !== 0) {
            return deliveryTimeMin + '-' + deliveryTimeMax;
        }
        if (deliveryTimeMin !== 0) {
            return deliveryTimeMin.toString();
        }
        if (deliveryTimeMax !== 0) {
            return deliveryTimeMax.toString();
        }
        return 30 + '-' + 60;
    }
    get orderInfoStatuses() {
        const popupStatuses = 'SIMULATION_VIEW.ORDER_INFO.STATUSES.' + this.currentStatus;
        let result = '';
        const getTitle = () => {
            this._translateService
                .get(popupStatuses + '.TITLE')
                .pipe(takeUntil(this._ngDestroy$))
                .subscribe((t) => (result = t));
            return result;
        };
        const getDetails = () => {
            this._translateService
                .get(popupStatuses + '.DETAILS')
                .pipe(takeUntil(this._ngDestroy$))
                .subscribe((d) => (result = d));
            return result.replace('%t', this.deliveryTimeRange);
        };
        const getPaidNote = () => {
            this._translateService
                .get(popupStatuses + '.NOT_PAID_NOTE')
                .pipe(takeUntil(this._ngDestroy$))
                .subscribe((n) => (result = n));
            return result.replace('%s', `${this.order
                ? this.order.totalPrice.toFixed(2)
                : '00.00'}$`);
        };
        return {
            TITLE: getTitle(),
            DETAILS: getDetails(),
            NOT_PAID_NOTE: getPaidNote(),
        };
    }
    clearTimer() {
        clearInterval(this.elapsedTime.timer);
    }
    ngOnDestroy() {
        this.clearTimer();
        localStorage.removeItem('simulationStartDate');
        localStorage.removeItem('simulationEndTime');
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
    }
};
__decorate([
    ViewChild('elapsedTime'),
    __metadata("design:type", ElapsedTimeComponent)
], SimulationOrderComponent.prototype, "elapsedTime", void 0);
__decorate([
    Input(),
    __metadata("design:type", Order)
], SimulationOrderComponent.prototype, "order", void 0);
SimulationOrderComponent = __decorate([
    Component({
        selector: 'ea-simulation-order',
        templateUrl: './order.component.html',
        styleUrls: ['./order.component.scss'],
    }),
    __metadata("design:paramtypes", [TranslateService,
        ProductLocalesService])
], SimulationOrderComponent);
export { SimulationOrderComponent };
//# sourceMappingURL=order.component.js.map