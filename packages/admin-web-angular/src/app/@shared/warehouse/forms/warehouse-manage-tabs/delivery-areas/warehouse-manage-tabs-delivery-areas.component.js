import { __decorate, __metadata } from "tslib";
import { Component, ViewChild, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
let WarehouseManageTabsDeliveryAreasComponent = class WarehouseManageTabsDeliveryAreasComponent {
    constructor(fb) {
        this.fb = fb;
        this.zonesObjects = [];
        this.shapeReady = false;
        this.isEditing = false;
        this._polyOptions = {
            strokeWeight: 0.5,
            fillOpacity: 0.45,
            editable: true,
            fillColor: '#1E90FF',
        };
        this._ngDestroy$ = new Subject();
    }
    ngOnInit() {
        this._setupGoogleMap();
        this._listenForMapCoordinates();
        this._initiliazeForm();
    }
    static buildForm(formBuilder) {
        return formBuilder.group({
            deliveryAreas: '',
        });
    }
    get deliveryZones() {
        return this.form.get('deliveryAreas').value;
    }
    set deliveryZones(zonesData) {
        this.form.get('deliveryAreas').setValue(zonesData);
    }
    getValue() {
        const geoJSON = {
            type: 'FeatureCollection',
            features: [],
        };
        const features = [];
        this.zonesObjects.forEach((zoneObject) => {
            if (zoneObject.type === 'circle') {
                const tempObj = {};
                const coordsArr = zoneObject
                    .getCenter()
                    .toUrlValue(7)
                    .split(',');
                tempObj['properties'] = zoneObject.properties;
                tempObj['properties']['radius'] = zoneObject.radius;
                tempObj['type'] = 'Feature';
                tempObj['geometry'] = {
                    type: 'Point',
                    coordinates: [+coordsArr[1], +coordsArr[0]],
                };
                features.push(tempObj);
            }
            else {
                const tempObj = {};
                const coordinates = [[]];
                zoneObject.getPath().forEach((point) => {
                    const mappedCoordinates = point
                        .toUrlValue(7)
                        .split(',')
                        .map((p) => +p);
                    coordinates[0].push(mappedCoordinates);
                });
                tempObj['properties'] = zoneObject.properties;
                tempObj['type'] = 'Feature';
                tempObj['geometry'] = {
                    type: 'Polygon',
                    coordinates,
                };
                features.push(tempObj);
            }
        });
        geoJSON.features = features;
        return geoJSON;
    }
    setValue(data) {
        if (data && data.features.length > 0) {
            data.features.forEach((feature) => {
                if (feature.geometry.type === 'Point') {
                    const circle = new google.maps.Circle({
                        center: {
                            lng: +feature.geometry.coordinates[0],
                            lat: +feature.geometry.coordinates[1],
                        },
                        radius: feature.properties['radius'],
                        strokeWeight: 0.5,
                        fillOpacity: 0.45,
                        fillColor: '#1E90FF',
                        map: this._map,
                    });
                    circle['type'] = 'circle';
                    circle['properties'] = feature.properties;
                    this._addZoneEventListeners(circle);
                    this.zonesObjects.push(circle);
                }
                else if (feature.geometry.type === 'Polygon') {
                    const polygon = new google.maps.Polygon({
                        strokeWeight: 0.5,
                        fillOpacity: 0.45,
                        fillColor: '#1E90FF',
                        paths: this._mapCoordinates(feature.geometry.coordinates),
                    });
                    polygon['properties'] = feature.properties;
                    polygon['type'] = 'polygon';
                    polygon.setMap(this._map);
                    this._addZoneEventListeners(polygon);
                    this.zonesObjects.push(polygon);
                }
            });
            this._zoneNumber = data.features.length;
            this.deliveryZones = data;
        }
    }
    addZone() {
        if (this.shapeReady && this.deliverForm.status === 'VALID') {
            if (this._selectedZone.type ===
                google.maps.drawing.OverlayType.POLYGON) {
                const coordinates = [[]];
                this._selectedZone.getPath().forEach((point) => {
                    const mappedCoordinates = point
                        .toUrlValue(7)
                        .split(',')
                        .map((p) => +p);
                    coordinates[0].push(mappedCoordinates);
                });
                this._selectedZone.properties = {
                    name: this.deliverForm.get('name').value,
                    minimumAmount: this.deliverForm.get('amount').value,
                    fee: this.deliverForm.get('fee').value,
                };
                this.zonesObjects.push(this._selectedZone);
            }
            else {
                this._selectedZone.properties = {
                    name: this.deliverForm.get('name').value,
                    minimumAmount: this.deliverForm.get('amount').value,
                    fee: this.deliverForm.get('fee').value,
                };
                this.zonesObjects.push(this._selectedZone);
            }
            this._clearSelection();
            this._zoneNumber++;
            this.selectedShapeType = null;
            this._selectedZone = null;
            this.shapeReady = false;
            this.deliverForm
                .get('name')
                .setValue('Zone ' + this._zoneNumber || 0);
            this.deliverForm.get('fee').setValue('');
            this.deliverForm.get('amount').setValue('');
        }
    }
    startDrawing() {
        this._clearSelection();
        this._drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: this._getShape(),
            drawingControl: false,
            circleOptions: this._polyOptions,
            polygonOptions: this._polyOptions,
            map: this._map,
        });
        google.maps.event.addListener(this._drawingManager, 'overlaycomplete', (zoneObject) => {
            this._drawingManager.setDrawingMode(null);
            this.shapeReady = true;
            const newZone = zoneObject.overlay;
            newZone.type = zoneObject.type;
            this._addZoneEventListeners(newZone);
            this.setSelection(newZone);
        });
        google.maps.event.addListener(this._drawingManager, 'drawingmode_changed', this._clearSelection);
    }
    cancelAdd() {
        this.deleteSelectedShape();
        this.deliverForm.get('fee').setValue('');
        this.deliverForm.get('amount').setValue('');
        this.deliverForm.get('name').setValue('Zone ' + this._zoneNumber);
    }
    closeEdit() {
        this.isEditing = false;
        this._clearSelection();
        this.deliverForm.get('fee').setValue('');
        this.deliverForm.get('amount').setValue('');
        this.deliverForm.get('name').setValue('Zone ' + this._zoneNumber);
    }
    deleteSelectedShape() {
        if (this._selectedZone) {
            this._selectedZone.setMap(null);
            this.shapeReady = false;
            this.selectedShapeType = null;
        }
    }
    setSelection(zone) {
        this._clearSelection();
        this._selectedZone = zone;
        zone.setEditable(true);
        this.highlightZone(zone);
        if (!this.isEditing && !this.selectedShapeType) {
            this._populateForm(zone);
        }
    }
    editZone() {
        this._selectedZone.properties = {
            name: this.deliverForm.get('name').value,
            fee: this.deliverForm.get('fee').value,
            minimumAmount: this.deliverForm.get('amount').value,
        };
        this.closeEdit();
    }
    highlightZone(zone) {
        zone.set('fillColor', '#FF8C00');
    }
    removeHighlight(zone) {
        zone.set('fillColor', '#1E90FF');
    }
    deleteZone(zone) {
        zone.setMap(null);
        const index = this.zonesObjects.indexOf(zone);
        this.zonesObjects.splice(index, 1);
        this._zoneNumber = this.zonesObjects.length;
    }
    _mapCoordinates(coordinates) {
        const tempArr = [];
        coordinates[0].forEach((c) => {
            tempArr.push({
                lat: c[0],
                lng: c[1],
            });
        });
        return tempArr;
    }
    _addZoneEventListeners(zone) {
        google.maps.event.addListener(zone, 'click', () => {
            if (!this.selectedShapeType) {
                this.setSelection(zone);
            }
        });
        google.maps.event.addListener(zone, 'mouseover', () => {
            this.highlightZone(zone);
        });
        google.maps.event.addListener(zone, 'mouseout', () => {
            this.removeHighlight(zone);
        });
    }
    _initiliazeForm() {
        this.deliverForm = this.fb.group({
            name: ['Zone ' + this._zoneNumber || 0],
            amount: '',
            fee: '',
        });
    }
    _getShape() {
        if (this.selectedShapeType === 'circle') {
            return google.maps.drawing.OverlayType.CIRCLE;
        }
        else if (this.selectedShapeType === 'shape') {
            return google.maps.drawing.OverlayType.POLYGON;
        }
    }
    _populateForm(zone) {
        this.isEditing = true;
        this.deliverForm.get('name').setValue(zone.properties.name);
        this.deliverForm.get('fee').setValue(zone.properties.fee);
        this.deliverForm.get('amount').setValue(zone.properties.minimumAmount);
    }
    _clearSelection() {
        if (this._selectedZone) {
            this.isEditing = false;
            this._selectedZone.set('fillColor', '#1E90FF');
            this._selectedZone.setEditable(false);
            this._selectedZone = null;
        }
    }
    _listenForMapCoordinates() {
        this.mapCoordEvent
            .pipe(takeUntil(this._ngDestroy$))
            .subscribe((location) => {
            this._map.setCenter(location);
            this._mapMarker = new google.maps.Marker({
                map: this._map,
                position: location,
            });
        });
    }
    _setupGoogleMap() {
        const optionsMap = {
            center: new google.maps.LatLng(0, 0),
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
        };
        this._map = new google.maps.Map(this.mapElement.nativeElement, optionsMap);
        google.maps.event.addListener(this._map, 'click', this._clearSelection);
    }
    ngOnDestroy() {
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
    }
};
__decorate([
    ViewChild('gmap', { static: true }),
    __metadata("design:type", Object)
], WarehouseManageTabsDeliveryAreasComponent.prototype, "mapElement", void 0);
__decorate([
    Input(),
    __metadata("design:type", Observable)
], WarehouseManageTabsDeliveryAreasComponent.prototype, "mapCoordEvent", void 0);
__decorate([
    Input(),
    __metadata("design:type", FormGroup)
], WarehouseManageTabsDeliveryAreasComponent.prototype, "form", void 0);
WarehouseManageTabsDeliveryAreasComponent = __decorate([
    Component({
        selector: 'ea-warehouse-manage-tabs-delivery-areas',
        styleUrls: ['./warehouse-manage-tabs-delivery-areas.component.scss'],
        templateUrl: './warehouse-manage-tabs-delivery-areas.component.html',
    }),
    __metadata("design:paramtypes", [FormBuilder])
], WarehouseManageTabsDeliveryAreasComponent);
export { WarehouseManageTabsDeliveryAreasComponent };
//# sourceMappingURL=warehouse-manage-tabs-delivery-areas.component.js.map