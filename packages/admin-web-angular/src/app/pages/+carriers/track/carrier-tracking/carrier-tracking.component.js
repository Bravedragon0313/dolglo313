import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, Output, EventEmitter, ViewChild, } from '@angular/core';
import { CarrierRouter } from '@modules/client.common.angular2/routers/carrier-router.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CarrierOrdersRouter } from '@modules/client.common.angular2/routers/carrier-orders-router.service';
import { CarriersService } from '@app/@core/data/carriers.service';
import { environment } from 'environments/environment';
import { WarehousesService } from '@app/@core/data/warehouses.service';
import { takeUntil } from 'rxjs/operators';
const directionsDisplay = new google.maps.DirectionsRenderer();
const directionsService = new google.maps.DirectionsService();
let CarrierTrackingComponent = class CarrierTrackingComponent {
    constructor(route, router, carrierRouter, carrierOrdersRouter, carriersService, _storesService) {
        this.route = route;
        this.router = router;
        this.carrierRouter = carrierRouter;
        this.carrierOrdersRouter = carrierOrdersRouter;
        this.carriersService = carriersService;
        this._storesService = _storesService;
        this.ngDestroy$ = new Subject();
        this.warehouseMarkers = [];
        this.isReverted = true;
        this.carriers = [];
        this.filteredCarriersList = [];
        this.stores = [];
        this.selectedStoreEmitter = new EventEmitter();
    }
    ngOnInit() {
        this.showMap();
        this.getCarriers();
    }
    getCarriers() {
        this._storesService
            .getStores()
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe((stores) => {
            this.stores = stores;
            this.carriersService
                .getAllCarriers()
                .pipe(takeUntil(this.ngDestroy$))
                .subscribe((carriers) => {
                this.carriers = carriers.filter((carrier) => carrier.status === 0);
                this.filteredCarriersList = this.carriers;
                this.loadDataFromUrl();
            });
        });
    }
    selectNewStore(id) {
        this.selectedStore = this.stores.find((s) => s.id === id);
    }
    storeListener(e) {
        this.router.navigate([`carriers/track/${this.selectedStore.id}`]);
    }
    carrierListener(e) {
        if (this.selectedStore) {
            this.router.navigate([
                `carriers/track/${this.selectedStore.id}/${this.selectedCarrier.id}`,
            ]);
        }
        else {
            this.router.navigate([
                `carriers/track/1/${this.selectedCarrier.id}`,
            ]);
        }
    }
    loadDataFromUrl() {
        this.params$ = this.route.params.subscribe((res) => {
            if (!res.carrierId && res.storeId) {
                this.selectNewStore(res.storeId);
                this.filteredCarriersList = this.carriers.filter((x) => this.selectedStore.usedCarriersIds.includes(x.id));
                this.selectedCarrier = undefined;
                this.revertMap();
                this._subscribeCarrier(this.filteredCarriersList);
            }
            else if (res.carrierId) {
                this.selectNewStore(res.storeId);
                const filteredList = this.filteredCarriersList.filter((carrier) => carrier._id === res.carrierId);
                this.selectedCarrier = filteredList[0];
                this.revertMap();
                this._subscribeCarrier(filteredList);
            }
            else if (!res.carrierId && !res.storeId) {
                this._subscribeCarrier(this.filteredCarriersList);
            }
        });
    }
    _subscribeCarrier(carrierList) {
        return __awaiter(this, void 0, void 0, function* () {
            const idArray = carrierList.map((carrier) => carrier._id);
            idArray.forEach((c) => {
                const carrierId = c.toString();
                this.carrierSub$ = this.carrierRouter
                    .get(carrierId)
                    .subscribe((carrier) => __awaiter(this, void 0, void 0, function* () {
                    if (this.interval) {
                        clearInterval(this.interval);
                    }
                    const newCoordinates = new google.maps.LatLng(carrier.geoLocation.coordinates.lat, carrier.geoLocation.coordinates.lng);
                    this.map.setCenter(newCoordinates);
                    const carierIcon = environment.MAP_CARRIER_ICON_LINK;
                    const marker = this.addMarker(newCoordinates, this.map, carierIcon);
                    this.warehouseMarkers.push(marker);
                }));
            });
        });
    }
    revertMap() {
        if (this.warehouseMarkers.length > 0) {
            this.warehouseMarkers.forEach((x) => {
                x.setMap(null);
            });
            this.warehouseMarkers = [];
        }
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
        this.carriers = [];
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
], CarrierTrackingComponent.prototype, "gmapElement", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CarrierTrackingComponent.prototype, "selectedStoreEmitter", void 0);
CarrierTrackingComponent = __decorate([
    Component({
        selector: 'ea-carrier-tracking',
        styleUrls: ['carrier-tracking.component.scss'],
        templateUrl: 'carrier-tracking.component.html',
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        Router,
        CarrierRouter,
        CarrierOrdersRouter,
        CarriersService,
        WarehousesService])
], CarrierTrackingComponent);
export { CarrierTrackingComponent };
//# sourceMappingURL=carrier-tracking.component.js.map