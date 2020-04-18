import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
let BanConfirmComponent = class BanConfirmComponent {
    constructor(modal) {
        this.modal = modal;
    }
    ngOnInit() { }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], BanConfirmComponent.prototype, "user", void 0);
BanConfirmComponent = __decorate([
    Component({
        selector: 'ea-ban-confirm',
        templateUrl: './ban-confirm.component.html',
        styleUrls: ['./ban-confirm.component.scss'],
    }),
    __metadata("design:paramtypes", [NgbActiveModal])
], BanConfirmComponent);
export { BanConfirmComponent };
//# sourceMappingURL=ban-confirm.component.js.map