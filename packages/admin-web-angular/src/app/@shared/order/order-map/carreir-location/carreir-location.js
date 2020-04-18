import { __decorate, __metadata } from "tslib";
import { Component, ViewChild, ElementRef, Input, } from '@angular/core';
import Order from '@modules/server.common/entities/Order';
import { environment } from 'environments/environment';
let CarrierLocationComponent = class CarrierLocationComponent {
    constructor() {
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        this.directionsService = new google.maps.DirectionsService();
    }
    ngOnInit() {
        this.loadMap();
        this.loadRoot();
    }
    loadMap() {
        const mapProp = {
            center: new google.maps.LatLng(environment.DEFAULT_LATITUDE, environment.DEFAULT_LONGITUDE),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false,
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    }
    loadRoot() {
        if (this.order) {
            const [carrierLng, carrierLat] = this.order.carrier['geoLocation'].loc.coordinates;
            const [userLng, userLat] = this.order.user['geoLocation'].loc.coordinates;
            const origin = new google.maps.LatLng(carrierLat, carrierLng);
            const destination = new google.maps.LatLng(userLat, userLng);
            const request = {
                origin,
                destination,
                travelMode: google.maps.TravelMode['DRIVING'],
            };
            this.directionsService.route(request, (res, stat) => {
                if (stat === 'OK') {
                    this.directionsDisplay.setDirections(res);
                }
            });
            this.directionsDisplay.setMap(this.map);
        }
    }
    ngOnDestroy() {
        this.directionsDisplay.setMap(null);
    }
};
__decorate([
    ViewChild('gmap', { static: true }),
    __metadata("design:type", ElementRef)
], CarrierLocationComponent.prototype, "gmapElement", void 0);
__decorate([
    Input(),
    __metadata("design:type", Order)
], CarrierLocationComponent.prototype, "order", void 0);
CarrierLocationComponent = __decorate([
    Component({
        selector: 'ea-carrier-location',
        template: ` <div style="height:100%" #gmap></div> `,
    })
], CarrierLocationComponent);
export { CarrierLocationComponent };
//# sourceMappingURL=carreir-location.js.map