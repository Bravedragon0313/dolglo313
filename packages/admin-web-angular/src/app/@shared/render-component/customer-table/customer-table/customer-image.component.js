import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
let CustomerImageComponent = class CustomerImageComponent {
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
CustomerImageComponent = __decorate([
    Component({
        styleUrls: ['customer-image.component.scss'],
        templateUrl: 'customer-image.component.html',
    }),
    __metadata("design:paramtypes", [Router])
], CustomerImageComponent);
export { CustomerImageComponent };
//# sourceMappingURL=customer-image.component.js.map