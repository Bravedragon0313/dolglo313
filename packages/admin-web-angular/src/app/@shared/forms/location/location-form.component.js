var LocationFormComponent_1;
import { __decorate, __metadata } from "tslib";
import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, } from '@angular/core';
import { AbstractControl, FormGroup, Validators, } from '@angular/forms';
import { Country, getCountryName, } from '@modules/server.common/entities/GeoLocation';
import { FormHelpers } from '../helpers';
import { pick, isEmpty } from 'lodash';
import { ToasterService } from 'angular2-toaster';
import { countries } from '@modules/server.common/data/abbreviation-to-country';
import { environment } from 'environments/environment';
let LocationFormComponent = LocationFormComponent_1 = class LocationFormComponent {
    constructor(toasterService) {
        this.toasterService = toasterService;
        this.showAutocompleteSearch = false;
        this.mapCoordinatesEmitter = new EventEmitter();
        this.mapGeometryEmitter = new EventEmitter();
        this.showCoordinates = false;
    }
    ngAfterViewInit() {
        this._initGoogleAutocompleteApi();
    }
    get countries() {
        return LocationFormComponent_1.COUNTRIES;
    }
    get isCountryValid() {
        return (this.countryId.errors &&
            (this.countryId.dirty || this.countryId.touched));
    }
    get isCityValid() {
        return this.city.errors && (this.city.dirty || this.city.touched);
    }
    get isStreetAddressValid() {
        return (this.streetAddress.errors &&
            (this.streetAddress.dirty || this.streetAddress.touched));
    }
    get isHouseValid() {
        return this.house.errors && (this.house.dirty || this.house.touched);
    }
    get isLocationValid() {
        return (this.coordinates.errors &&
            (this.coordinates.dirty || this.coordinates.touched));
    }
    get countryId() {
        return this.form.get('countryId');
    }
    get city() {
        return this.form.get('city');
    }
    get streetAddress() {
        return this.form.get('streetAddress');
    }
    get house() {
        return this.form.get('house');
    }
    get postcode() {
        return this.form.get('postcode');
    }
    get coordinates() {
        return this.form.get('loc').get('coordinates');
    }
    static buildForm(formBuilder) {
        const form = formBuilder.group({
            countryId: [
                Country.US,
                [
                    (ctrl) => LocationFormComponent_1.COUNTRIES.map((c) => c.id).includes(ctrl.value),
                ],
            ],
            city: ['', [Validators.required]],
            streetAddress: ['', [Validators.required]],
            house: ['', [Validators.required]],
            postcode: [''],
            loc: formBuilder.group({
                type: ['Point'],
                coordinates: formBuilder.array([null, null]),
            }),
        });
        return form;
    }
    static buildApartmentForm(formBuilder) {
        return formBuilder.control('');
    }
    onAddressChanges() {
        if (this.showAutocompleteSearch) {
            this._tryFindNewAddress();
        }
    }
    onCoordinatesChanged() {
        if (this.showAutocompleteSearch) {
            this._tryFindNewCoordinates();
        }
    }
    getValue() {
        const location = this.form.getRawValue();
        if (!location.postcode) {
            delete location.postcode;
        }
        return location;
    }
    getApartment() {
        if (!this.apartment) {
            throw new Error("Form doesn't contain apartment");
        }
        return this.apartment.value;
    }
    setValue(geoLocation) {
        FormHelpers.deepMark(this.form, 'dirty');
        this.form.setValue(Object.assign({ postcode: geoLocation.postcode || '' }, pick(geoLocation, Object.keys(this.getValue()))));
        this._tryFindNewCoordinates();
    }
    setApartment(apartment) {
        this.apartment.setValue(apartment);
    }
    toggleShowCoordinates() {
        this.showCoordinates = !this.showCoordinates;
    }
    setDefaultCoords() {
        const lat = environment.DEFAULT_LATITUDE;
        const lng = environment.DEFAULT_LONGITUDE;
        if (lat && lng) {
            this.coordinates.setValue([lat, lng]);
            this.onCoordinatesChanged();
        }
    }
    _applyFormattedAddress(address) {
        if (this.searchElement) {
            this.searchElement.nativeElement.value = address;
        }
    }
    _tryFindNewAddress() {
        const house = this.house.value;
        const streetAddress = this.streetAddress.value;
        const city = this.city.value;
        const countryName = getCountryName(+this.countryId.value);
        if (isEmpty(streetAddress) ||
            isEmpty(house) ||
            isEmpty(city) ||
            isEmpty(countryName)) {
            return;
        }
        const newAddress = `${house}${streetAddress}${city}${countryName}`;
        if (newAddress !== this._lastUsedAddressText) {
            this._lastUsedAddressText = newAddress;
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                address: `${streetAddress} ${house}, ${city}`,
                componentRestrictions: {
                    country: countryName,
                },
            }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    const formattedAddress = results[0].formatted_address;
                    const place = results[0];
                    this._applyNewPlaceOnTheMap(place);
                    this._applyFormattedAddress(formattedAddress);
                }
            });
        }
    }
    _tryFindNewCoordinates() {
        const formCoordinates = this.coordinates.value;
        this._lat = formCoordinates[0];
        this._lng = formCoordinates[1];
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            location: { lng: this._lng, lat: this._lat },
        }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                const formattedAddress = results[0].formatted_address;
                const place = results[0];
                const useGeometryLatLng = false;
                this._applyNewPlaceOnTheMap(place, useGeometryLatLng);
                this._applyFormattedAddress(formattedAddress);
            }
        });
    }
    _emitCoordinates(location) {
        this.mapCoordinatesEmitter.emit(location);
    }
    _emitGeometry(geometry) {
        this.mapGeometryEmitter.emit(geometry);
    }
    _popInvalidAddressMessage() {
        this.toasterService.pop('warning', 'Invalid address, please try again!');
    }
    _setupGoogleAutocompleteOptions(autocomplete) {
        autocomplete['setFields'](['address_components', 'geometry']);
    }
    _applyNewPlaceOnTheMap(place, useGeometryLatLng = true) {
        if (place.geometry === undefined || place.geometry === null) {
            this._popInvalidAddressMessage();
            return;
        }
        if (useGeometryLatLng) {
            const loc = place.geometry.location;
            this._lat = loc.lat();
            this._lng = loc.lng();
        }
        this._emitGeometry(place.geometry);
        this._emitCoordinates(new google.maps.LatLng(this._lat, this._lng));
        this._gatherAddressInformation(place);
    }
    _listenForGoogleAutocompleteAddressChanges(autocomplete) {
        autocomplete.addListener('place_changed', (_) => {
            const place = autocomplete.getPlace();
            this._applyNewPlaceOnTheMap(place);
        });
    }
    _gatherAddressInformation(locationResult) {
        const longName = 'long_name';
        const shortName = 'short_name';
        const neededAddressTypes = {
            country: shortName,
            locality: longName,
            route: longName,
            intersection: longName,
            street_number: longName,
            postal_code: longName,
            administrative_area_level_1: shortName,
            administrative_area_level_2: shortName,
            administrative_area_level_3: shortName,
            administrative_area_level_4: shortName,
            administrative_area_level_5: shortName,
        };
        let streetName = '';
        let streetNumber = '';
        let countryId = '';
        let postcode = '';
        let city = '';
        locationResult.address_components.forEach((address) => {
            const addressType = address.types[0];
            const addressTypeKey = neededAddressTypes[addressType];
            const val = address[addressTypeKey];
            switch (addressType) {
                case 'country':
                    countryId = val;
                    break;
                case 'locality':
                case 'administrative_area_level_1':
                case 'administrative_area_level_2':
                case 'administrative_area_level_3':
                case 'administrative_area_level_4':
                case 'administrative_area_level_5':
                    if (city === '') {
                        city = val;
                    }
                    break;
                case 'route':
                case 'intersection':
                    if (streetName === '') {
                        streetName = val;
                    }
                    break;
                case 'street_number':
                    streetNumber = val;
                    break;
                case 'postal_code':
                    postcode = val;
                    break;
            }
        });
        this._setFormLocationValues(countryId, city, streetName, streetNumber, postcode);
    }
    _initGoogleAutocompleteApi() {
        if (this.searchElement) {
            const autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement);
            this._setupGoogleAutocompleteOptions(autocomplete);
            this._listenForGoogleAutocompleteAddressChanges(autocomplete);
        }
    }
    _setFormLocationValues(countryId, city, streetName, streetNumber, postcode) {
        if (!isEmpty(countryId)) {
            this.countryId.setValue(Country[countryId]);
        }
        if (!isEmpty(city)) {
            this.city.setValue(city);
        }
        if (!isEmpty(postcode)) {
            this.postcode.setValue(postcode);
        }
        if (!isEmpty(streetName)) {
            this.streetAddress.setValue(streetName);
        }
        if (!isEmpty(streetNumber)) {
            this.house.setValue(streetNumber);
        }
        this.coordinates.setValue([this._lat, this._lng]);
    }
};
LocationFormComponent.COUNTRIES = Object.keys(countries).map((abbr) => {
    return { id: Country[abbr], name: getCountryName(+Country[abbr]) };
});
__decorate([
    Input(),
    __metadata("design:type", FormGroup)
], LocationFormComponent.prototype, "form", void 0);
__decorate([
    Input(),
    __metadata("design:type", AbstractControl)
], LocationFormComponent.prototype, "apartment", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], LocationFormComponent.prototype, "showAutocompleteSearch", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], LocationFormComponent.prototype, "mapCoordinatesEmitter", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], LocationFormComponent.prototype, "mapGeometryEmitter", void 0);
__decorate([
    ViewChild('autocomplete'),
    __metadata("design:type", ElementRef)
], LocationFormComponent.prototype, "searchElement", void 0);
LocationFormComponent = LocationFormComponent_1 = __decorate([
    Component({
        selector: 'ea-location-form',
        styleUrls: ['./location-form.component.scss'],
        templateUrl: 'location-form.component.html',
    }),
    __metadata("design:paramtypes", [ToasterService])
], LocationFormComponent);
export { LocationFormComponent };
//# sourceMappingURL=location-form.component.js.map