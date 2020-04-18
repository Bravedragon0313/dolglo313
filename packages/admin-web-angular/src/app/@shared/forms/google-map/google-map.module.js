import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { GoogleMapComponent } from './google-map.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'environments/environment';
let GoogleMapModule = class GoogleMapModule {
};
GoogleMapModule = __decorate([
    NgModule({
        imports: [
            AgmCoreModule.forRoot({
                apiKey: environment.GOOGLE_MAPS_API_KEY,
                libraries: ['drawing'],
            }),
        ],
        declarations: [GoogleMapComponent],
        exports: [GoogleMapComponent],
    })
], GoogleMapModule);
export { GoogleMapModule };
//# sourceMappingURL=google-map.module.js.map