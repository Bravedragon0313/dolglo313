import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ButtonGroupsComponent = class ButtonGroupsComponent {
    constructor() {
        this.radioModel = 'left';
        this.checkboxModel = {
            left: false,
            middle: false,
            right: false,
        };
        this.dividedCheckboxModel = {
            monday: true,
            tuesday: true,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
        };
        this.paginationModel = 1;
        this.iconToolbarModel = {
            one: false,
            two: false,
            three: true,
            four: false,
            five: false,
        };
        this.dividedButtonGroupOne = 'left';
        this.dividedButtonGroupTwo = {
            left: false,
            middle: false,
            right: false,
        };
    }
};
ButtonGroupsComponent = __decorate([
    Component({
        selector: 'ngx-button-groups',
        styleUrls: ['./button-groups.component.scss'],
        templateUrl: './button-groups.component.html',
    })
], ButtonGroupsComponent);
export { ButtonGroupsComponent };
//# sourceMappingURL=button-groups.component.js.map