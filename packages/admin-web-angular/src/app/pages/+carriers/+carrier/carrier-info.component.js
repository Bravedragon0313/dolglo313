import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
let CarrierTableInfoComponent = class CarrierTableInfoComponent {
    constructor(activeModal) {
        this.activeModal = activeModal;
    }
    cancel() {
        this.activeModal.dismiss('canceled');
    }
    ngOnInit() { }
};
CarrierTableInfoComponent = __decorate([
    Component({
        templateUrl: './carrier-info.component.html',
    }),
    __metadata("design:paramtypes", [NgbActiveModal])
], CarrierTableInfoComponent);
export { CarrierTableInfoComponent };
//# sourceMappingURL=carrier-info.component.js.map