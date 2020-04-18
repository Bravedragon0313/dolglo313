import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Location } from '../entity/Location';
let MapComponent = class MapComponent {
    set searchedLocation(searchedLocation) {
        this.latitude = searchedLocation.latitude;
        this.longitude = searchedLocation.longitude;
        this.zoom = 12;
    }
    ngOnInit() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.searchedLocation = new Location(position.coords.latitude, position.coords.longitude);
            });
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Location),
    __metadata("design:paramtypes", [Location])
], MapComponent.prototype, "searchedLocation", null);
MapComponent = __decorate([
    Component({
        selector: 'ngx-map',
        templateUrl: './map.component.html',
        styleUrls: ['./map.component.scss'],
    })
], MapComponent);
export { MapComponent };
//# sourceMappingURL=map.component.js.map