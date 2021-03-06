import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Location } from './entity/Location';
let SearchMapComponent = class SearchMapComponent {
    constructor() {
        this.searchedLocation = new Location();
    }
    updateLocation(event) {
        this.searchedLocation = new Location(event.latitude, event.longitude);
    }
};
SearchMapComponent = __decorate([
    Component({
        selector: 'ngx-search-map',
        templateUrl: './search-map.component.html',
    })
], SearchMapComponent);
export { SearchMapComponent };
//# sourceMappingURL=search-map.component.js.map