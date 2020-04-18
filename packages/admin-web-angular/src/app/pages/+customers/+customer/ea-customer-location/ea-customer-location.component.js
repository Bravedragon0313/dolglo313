import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../../@core/data/users.service';
import { first } from 'rxjs/operators';
let CustomerLocationComponent = class CustomerLocationComponent {
    constructor(_userService, _router) {
        this._userService = _userService;
        this._router = _router;
    }
    ngOnInit() {
        this.params$ = this._router.params.subscribe((r) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this._userService
                .getUserById(r.id)
                .pipe(first())
                .toPromise();
            const coordinates = new google.maps.LatLng(user['geoLocation'].coordinates.lat, user['geoLocation'].coordinates.lng);
            this.showMap(coordinates);
            this.marker = this.addMarker(coordinates, this.map);
        }));
    }
    showMap(coordinates) {
        const mapProp = {
            center: coordinates,
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    }
    addMarker(coordinates, map) {
        return new google.maps.Marker({
            position: coordinates,
            map,
        });
    }
    ngOnDestroy() {
        this.marker.setMap(null);
        if (this.params$) {
            this.params$.unsubscribe();
        }
    }
};
__decorate([
    ViewChild('gmap', { static: true }),
    __metadata("design:type", Object)
], CustomerLocationComponent.prototype, "gmapElement", void 0);
CustomerLocationComponent = __decorate([
    Component({
        selector: 'ea-customer-location',
        styleUrls: ['./ea-customer-location.component.scss'],
        templateUrl: './ea-customer-location.component.html',
    }),
    __metadata("design:paramtypes", [UsersService,
        ActivatedRoute])
], CustomerLocationComponent);
export { CustomerLocationComponent };
//# sourceMappingURL=ea-customer-location.component.js.map