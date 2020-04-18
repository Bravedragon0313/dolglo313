import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { DefaultEditor, Cell } from 'ng2-smart-table';
import { countriesIdsToNamesArray, } from '@modules/server.common/entities/GeoLocation';
let CountryRenderComponent = class CountryRenderComponent extends DefaultEditor {
    constructor() {
        super();
    }
    get countries() {
        return countriesIdsToNamesArray;
    }
    ngAfterViewInit() { }
    onChanged(e) { }
};
__decorate([
    Input(),
    __metadata("design:type", Cell)
], CountryRenderComponent.prototype, "cell", void 0);
CountryRenderComponent = __decorate([
    Component({
        template: `
		<select
			[(ngModel)]="this.cell.newValue"
			(change)="onChanged($event)"
			class="form-control ng-pristine ng-valid ng-touched"
		>
			<option
				*ngFor="let country of countries"
				value="{{ country.name }}"
			>
				{{ country.name }}
			</option>
		</select>
	`,
    }),
    __metadata("design:paramtypes", [])
], CountryRenderComponent);
export { CountryRenderComponent };
//# sourceMappingURL=country-render.component.js.map