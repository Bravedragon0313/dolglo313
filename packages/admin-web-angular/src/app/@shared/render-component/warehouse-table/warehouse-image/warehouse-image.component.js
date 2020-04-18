import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
let WarehouseImageComponent = class WarehouseImageComponent {
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
WarehouseImageComponent = __decorate([
    Component({
        styleUrls: ['warehouse-image.component.scss'],
        templateUrl: 'warehouse-image.component.html',
    }),
    __metadata("design:paramtypes", [Router])
], WarehouseImageComponent);
export { WarehouseImageComponent };
//# sourceMappingURL=warehouse-image.component.js.map