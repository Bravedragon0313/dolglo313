import { __decorate, __metadata } from "tslib";
import { ViewChild, Component, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
let GoogleMapComponent = class GoogleMapComponent {
    constructor() {
        this._ngDestroy$ = new Subject();
    }
    ngOnInit() {
        this._setupGoogleMap();
        this._listenForMapType();
        this._listenForMapCoordinates();
        this._listenForMapGeometry();
    }
    _navigateTo(location) {
        this.map.setCenter(location);
    }
    _listenForMapGeometry() {
        this.mapGeometryEvent
            .pipe(takeUntil(this._ngDestroy$))
            .subscribe((geometry) => {
            if (geometry.viewport) {
                this.map.fitBounds(geometry.viewport);
            }
            else {
                this.map.setCenter(geometry.location);
                this.map.setZoom(17);
            }
        });
    }
    _listenForMapType() {
        if (this.mapTypeEvent) {
            this.mapTypeEvent
                .pipe(takeUntil(this._ngDestroy$))
                .subscribe((mapType) => {
                this.map.setMapTypeId(mapType);
            });
        }
    }
    _listenForMapCoordinates() {
        this.mapCoordEvent
            .pipe(takeUntil(this._ngDestroy$))
            .subscribe((location) => {
            this._navigateTo(location);
            this._addMapMarker(location);
        });
    }
    _setupGoogleMap() {
        const optionsMap = {
            center: new google.maps.LatLng(0, 0),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, optionsMap);
    }
    _addMapMarker(location) {
        this._clearMarker();
        this._mapMarker = new google.maps.Marker({
            map: this.map,
            position: location,
        });
    }
    _clearMarker() {
        if (this._mapMarker) {
            this._mapMarker.setMap(null);
        }
    }
    ngOnDestroy() {
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
    }
};
__decorate([
    ViewChild('gmap', { static: true }),
    __metadata("design:type", Object)
], GoogleMapComponent.prototype, "mapElement", void 0);
__decorate([
    Input(),
    __metadata("design:type", Observable)
], GoogleMapComponent.prototype, "mapTypeEvent", void 0);
__decorate([
    Input(),
    __metadata("design:type", Observable)
], GoogleMapComponent.prototype, "mapCoordEvent", void 0);
__decorate([
    Input(),
    __metadata("design:type", Observable)
], GoogleMapComponent.prototype, "mapGeometryEvent", void 0);
GoogleMapComponent = __decorate([
    Component({
        selector: 'google-map',
        styleUrls: ['./google-map.component.scss'],
        template: ` <div #gmap class="g-map"></div> `,
    })
], GoogleMapComponent);
export { GoogleMapComponent };
//# sourceMappingURL=google-map.component.js.map