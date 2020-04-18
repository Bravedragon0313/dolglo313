import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CarrierRouter } from '@modules/client.common.angular2/routers/carrier-router.service';
import { CarrierOrdersRouter } from '@modules/client.common.angular2/routers/carrier-orders-router.service';
import { environment } from 'environments/environment';
import { CarriersService } from '@app/@core/data/carriers.service';
import GeoLocation from '@modules/server.common/entities/GeoLocation';
const directionsDisplay = new google.maps.DirectionsRenderer();
const directionsService = new google.maps.DirectionsService();
let CarrierLocationComponent = class CarrierLocationComponent {
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
                const carrierId = res.id || this.carrierId;
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
                                const start = new google.maps.LatLng(user.geoLocation.coordinates.lat, user.geoLocation.coordinates.lng);
                                const end = new google.maps.LatLng(warehouse['geoLocation'].coordinates.lat, warehouse['geoLocation'].coordinates.lng);
                                const request = {
                                    origin: start,
                                    destination: end,
                                    travelMode: 'DRIVING',
                                };
                                directionsService.route(request, function (res, stat) {
                                    if (stat === 'OK') {
                                        directionsDisplay.setDirections(res);
                                    }
                                });
                                directionsDisplay.setOptions({
                                    suppressMarkers: true,
                                });
                                directionsDisplay.setMap(this.map);
                                const bounds = new google.maps.LatLngBounds();
                                bounds.extend(this.marker.getPosition());
                                bounds.extend(this.warehouseMarker.getPosition());
                                bounds.extend(this.userMarker.getPosition());
                                this.map.fitBounds(bounds);
                                isWorking = true;
                                this.isReverted = false;
                                const userInfoContent = `
									<h3>  ${order.user.firstName + ' ' + order.user.lastName}</h3>
									<ul>
										<li><i style='margin-right:5px;' class="ion-md-mail"></i>${order.user.email}</li>
										<li><i style='margin-right:5px;' class="ion-md-call"></i>${order.user.phone}</li>
										<li><i style='margin-right:5px;' class="ion-md-locate"></i>${order.user.geoLocation.streetAddress}</li>
									</ul>
									`;
                                const userInfoWindow = new google.maps.InfoWindow({
                                    content: userInfoContent,
                                });
                                this.userMarker.addListener('click', () => {
                                    userInfoWindow.open(this.map, this.userMarker);
                                });
                                const warehouseInfoContent = `
									<h3>  ${order.warehouse.name}</h3>
									<ul>
										<li>
											<i style='margin-right:5px;' class="ion-md-mail"></i>
											${order.warehouse.contactEmail}
										</li>
										<li>
											<i style='margin-right:5px;' class="ion-md-phone"></i><i class="ion-md-call"></i>
											${order.warehouse.contactPhone}
										</li>
										<li>
											<i style='margin-right:5px;' class="ion-md-locate"></i>
											${order.warehouse.geoLocation.streetAddress}
										</li>
									</ul>
									`;
                                const warehouseInfoWindow = new google.maps.InfoWindow({
                                    content: warehouseInfoContent,
                                });
                                this.warehouseMarker.addListener('click', () => {
                                    warehouseInfoWindow.open(this.map, this.warehouseMarker);
                                });
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
                    const carrierInfoContent = `
					<h3>  ${carrier.fullName}</h3>
					<ul>
						<li>${carrier.username}</li>
						<li><i style='margin-right:5px;' class="ion-md-call"></i>${carrier.phone}</li>
						<li><i style='margin-right:5px;' class="ion-md-locate"></i>${carrier.geoLocation.streetAddress}</li>
					</ul>
					`;
                    const carrierInfoWindow = new google.maps.InfoWindow({
                        content: carrierInfoContent,
                    });
                    this.marker.addListener('click', () => {
                        carrierInfoWindow.open(this.map, this.marker);
                    });
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
], CarrierLocationComponent.prototype, "gmapElement", void 0);
CarrierLocationComponent = __decorate([
    Component({
        selector: 'ea-carrier-location',
        styleUrls: ['./carrier-location.component.scss'],
        templateUrl: './carrier-location.component.html',
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        CarrierRouter,
        CarrierOrdersRouter,
        CarriersService])
], CarrierLocationComponent);
export { CarrierLocationComponent };
//# sourceMappingURL=carrier-location.component.js.map