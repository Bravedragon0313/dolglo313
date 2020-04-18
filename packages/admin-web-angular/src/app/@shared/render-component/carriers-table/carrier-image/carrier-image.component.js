import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
let CarrierImageComponent = class CarrierImageComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
        this.imageUrl = this.rowData.image;
    }
    redirect() {
        if (this.redirectPage) {
            this.router.navigate([`${this.redirectPage}/${this.rowData.id}`]);
        }
    }
};
CarrierImageComponent = __decorate([
    Component({
        styleUrls: ['carrier-image.component.scss'],
        templateUrl: 'carrier-image.component.html',
    }),
    __metadata("design:paramtypes", [Router])
], CarrierImageComponent);
export { CarrierImageComponent };
//# sourceMappingURL=carrier-image.component.js.map