import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild, } from '@angular/core';
import { CarrierRouter } from '@modules/client.common.angular2/routers/carrier-router.service';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CarrierOrdersRouter } from '@modules/client.common.angular2/routers/carrier-orders-router.service';
import { CarriersService } from '@app/@core/data/carriers.service';
import { environment } from 'environments/environment';
import GeoLocation from '@modules/server.common/entities/GeoLocation';
const directionsDisplay = new google.maps.DirectionsRenderer();
const directionsService = new google.maps.DirectionsService();
let CarrierMapComponent = class CarrierMapComponent {
    constructor(route, carrierRouter, carrierOrdersRouter, carriersService) {
        this.route = route;
        this.carrierRouter = carrierRouter;
        this.carrierOrdersRouter = carrierOrdersRouter;
        this.carriersService = carriersService;
        this.ngDestroy$ = new Subject();
        this.isReverted = true;
    }
    ngOnInit() {
        this.showMap();
        this._subscribeCarrier();
    }
    _subscribeCarrier() {
        return __awaiter(this, void 0, void 0, function* () {
            this.params$ = this.route.params.subscribe((res) => {
                const carrierId = this.carrierId;
                this.carrierSub$ = this.carrierRouter
                    .get(carrierId)
                    .subscribe((carrier) => __awaiter(this, void 0, void 0, function* () {
                    if (this.interval) {
                        clearInterval(this.interval);
                    }
                    const newCoordinates = new google.maps.LatLng(carrier.geoLocation.coordinates.lat, carrier.geoLocation.coordinates.lng);
                    if (this.marker) {
                        this.marker.setMap(null);
                    }
                    let isWorking = false;
                    this.interval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                        const order = yield this.carriersService.getCarrierCurrentOrder(carrierId);
                        if (order) {
                            if (!isWorking) {
                                const user = order.user;
                                const warehouse = order.warehouse;
                                const warehouseIcon = environment.MAP_MERCHANT_ICON_LINK;
                                const userIcon = environment.MAP_USER_ICON_LINK;
                                user.geoLocation = new GeoLocation(user.geoLocation);
                                this.userMarker = this.addMarker(new google.maps.LatLng(user.geoLocation.coordinates.lat, user.geoLocation.coordinates.lng), this.map, userIcon);
                                warehouse.geoLocation = new GeoLocation(warehouse.geoLocation);
                                this.warehouseMarker = this.addMarker(new google.maps.LatLng(warehouse['geoLocation'].coordinates.lat, warehouse['geoLocation'].coordinates.lng), this.map, warehouseIcon);
                                const bounds = new google.maps.LatLngBounds();
                                bounds.extend(this.marker.getPosition());
                                bounds.extend(this.warehouseMarker.getPosition());
                                bounds.extend(this.userMarker.getPosition());
                                this.map.fitBounds(bounds);
                                isWorking = true;
                                this.isReverted = false;
                            }
                        }
                        else {
                            if (isWorking) {
                                this.revertMap();
                                isWorking = false;
                            }
                            if (!this.isReverted) {
                                this.revertMap();
                            }
                        }
                    }), 1500);
                    this.map.setCenter(newCoordinates);
                    const carierIcon = environment.MAP_CARRIER_ICON_LINK;
                    this.marker = this.addMarker(newCoordinates, this.map, carierIcon);
                }));
            });
        });
    }
    revertMap() {
        this.map.setZoom(15);
        this.warehouseMarker.setMap(null);
        this.userMarker.setMap(null);
        this.isReverted = true;
    }
    showMap() {
        const mapProp = {
            center: new google.maps.LatLng(42.642941, 23.334149),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    }
    addMarker(position, map, icon) {
        return new google.maps.Marker({
            position,
            map,
            icon,
        });
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
        if (this.interval) {
            clearInterval(this.interval);
        }
        if (this.carrierSub$) {
            this.carrierSub$.unsubscribe();
        }
        if (this.params$) {
            this.params$.unsubscribe();
        }
    }
};
__decorate([
    ViewChild('gmap', { static: true }),
    __metadata("design:type", Object)
], CarrierMapComponent.prototype, "gmapElement", void 0);
CarrierMapComponent = __decorate([
    Component({
        selector: 'ea-carrier-map',
        styleUrls: ['carrier-map.component.scss'],
        templateUrl: 'carrier-map.component.html',
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        CarrierRouter,
        CarrierOrdersRouter,
        CarriersService])
], CarrierMapComponent);
export { CarrierMapComponent };
//# sourceMappingURL=carrier-map.component.js.map