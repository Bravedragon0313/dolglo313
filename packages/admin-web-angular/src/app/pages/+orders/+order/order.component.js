import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OrderRouter } from '@modules/client.common.angular2/routers/order-router.service';
import OrderCarrierStatus from '@modules/server.common/enums/OrderCarrierStatus';
import { TranslateService } from '@ngx-translate/core';
import { getIdFromTheDate } from '@modules/server.common/utils';
const service = new google.maps.DistanceMatrixService();
let OrderComponent = class OrderComponent {
    constructor(_router, orderRouter, translateService) {
        this._router = _router;
        this.orderRouter = orderRouter;
        this.translateService = translateService;
        this.PREFIX = 'ORDER_VIEW.ORDER_SIDEBAR.';
        this.WAREHOUSE_TITLE = 'WAREHOUSE';
        this.CUSTOMER_TITLE = 'CUSTOMER';
        this.CARRIER_TITLE = 'CARRIER';
        this.ngDestroy$ = new Subject();
        this.order$ = this._router.params.pipe(switchMap((params) => {
            return this.orderRouter.get(params.id, {
                populateWarehouse: true,
                populateCarrier: true,
            });
        }), takeUntil(this.ngDestroy$));
    }
    get titleWarehouse() {
        const titleForTr = this.PREFIX + this.WAREHOUSE_TITLE;
        return this._translate(titleForTr);
    }
    get titleCustomer() {
        const titleForTr = this.PREFIX + this.CUSTOMER_TITLE;
        return this._translate(titleForTr);
    }
    get titleCarrier() {
        const titleForTr = this.PREFIX + this.CARRIER_TITLE;
        return this._translate(titleForTr);
    }
    getTotalPrice(order) {
        if (order && order.products.length > 0) {
            return order.products
                .map((p) => p.price * p.count)
                .reduce((a, b) => a + b, 0);
        }
        else {
            return 0;
        }
    }
    getWarehouseContactDetails(warehouse) {
        const details = [];
        if (warehouse) {
            details.push(warehouse.name);
            details.push(warehouse.contactPhone);
            details.push(warehouse.contactEmail);
        }
        if (warehouse.geoLocation) {
            details.push(this.getFullAddress(warehouse.geoLocation));
        }
        return details.filter((d) => d);
    }
    getCustomerContactDetails(user) {
        const details = [];
        if (user) {
            let name = '';
            if (user.firstName) {
                name += user.firstName;
            }
            if (user.lastName) {
                name += ' ' + user.lastName;
            }
            details.push(name);
            details.push(user.phone);
            details.push(user.email);
        }
        if (user.geoLocation) {
            details.push(user.fullAddress);
        }
        return details.filter((d) => d);
    }
    getCarrierContactDetails(carrier) {
        const details = [];
        if (carrier) {
            details.push(carrier.firstName
                ? carrier.firstName + ' ' + carrier.lastName
                : carrier.username);
            details.push(carrier.phone);
        }
        if (carrier.geoLocation) {
            details.push(this.getFullAddress(carrier.geoLocation));
        }
        return details.filter((d) => d);
    }
    getOrderName(order) {
        if (order) {
            return getIdFromTheDate(order);
        }
    }
    isCarrierCurrent(order) {
        return (order.carrierStatus >= OrderCarrierStatus.CarrierPickedUpOrder &&
            !order['isCompleted']);
    }
    getDistance(geoLocation1, geoLocation2) {
        if (!this.distance && geoLocation1 && geoLocation2) {
            this.distance = '0';
            service.getDistanceMatrix({
                origins: [
                    new google.maps.LatLng(geoLocation1.coordinates.lat, geoLocation1.coordinates.lng),
                ],
                destinations: [
                    new google.maps.LatLng(geoLocation2.coordinates.lat, geoLocation2.coordinates.lng),
                ],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false,
            }, (response, status) => {
                if (status === google.maps.DistanceMatrixStatus.OK) {
                    this.distance =
                        response.rows[0].elements[0].distance['text'];
                }
            });
        }
        return this.distance;
    }
    getFullAddress(geoLocation) {
        return (`${geoLocation.city}, ${geoLocation.streetAddress} ` +
            `${geoLocation.house}`);
    }
    _translate(key) {
        let translationResult = '';
        this.translateService.get(key).subscribe((res) => {
            translationResult = res;
        });
        return translationResult;
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
};
OrderComponent = __decorate([
    Component({
        selector: 'ea-order',
        templateUrl: './order.component.html',
        styleUrls: ['./order.component.scss'],
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        OrderRouter,
        TranslateService])
], OrderComponent);
export { OrderComponent };
//# sourceMappingURL=order.component.js.map