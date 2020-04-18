import { __decorate, __metadata } from "tslib";
import { Component, ViewChild, ElementRef, Input, } from '@angular/core';
import Order from '@modules/server.common/entities/Order';
import { environment } from 'environments/environment';
const warehouseIcon = environment.MAP_MERCHANT_ICON_LINK;
const userIcon = environment.MAP_USER_ICON_LINK;
let UserWarehouseLocationComponent = class UserWarehouseLocationComponent {
    ngAfterViewInit() {
        this.loadMap();
    }
    ngOnChanges() {
        this.loadMarkers();
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
        this.loadMarkers();
    }
    loadMarkers() {
        if (this.order && !this.isLoaded && this.map) {
            this.isLoaded = true;
            const user = this.order.user;
            const warehouse = this.order.warehouse;
            this.userMarker = this.addMarker(user['geoLocation'], this.map, userIcon);
            this.warehouseMarker = this.addMarker(warehouse['geoLocation'], this.map, warehouseIcon);
            const bounds = new google.maps.LatLngBounds();
            bounds.extend(this.warehouseMarker.getPosition());
            bounds.extend(this.userMarker.getPosition());
            this.map.fitBounds(bounds);
        }
    }
    addMarker(geoLocation, map, icon) {
        const [lng, lat] = geoLocation.loc.coordinates;
        const position = new google.maps.LatLng(lat, lng);
        return new google.maps.Marker({
            position,
            map,
            icon,
        });
    }
    removeMarkers() {
        if (this.userMarker) {
            this.userMarker.setMap(null);
        }
        if (this.warehouseMarker) {
            this.warehouseMarker.setMap(null);
        }
    }
    ngOnDestroy() {
        this.removeMarkers();
    }
};
__decorate([
    ViewChild('gmap', { static: true }),
    __metadata("design:type", ElementRef)
], UserWarehouseLocationComponent.prototype, "gmapElement", void 0);
__decorate([
    Input(),
    __metadata("design:type", Order)
], UserWarehouseLocationComponent.prototype, "order", void 0);
UserWarehouseLocationComponent = __decorate([
    Component({
        selector: 'ea-user-warehouse-location',
        template: ` <div style="height:100%" #gmap></div> `,
    })
], UserWarehouseLocationComponent);
export { UserWarehouseLocationComponent };
//# sourceMappingURL=user-warehouse-map.js.map