import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
let JsonModalComponent = class JsonModalComponent {
    constructor(activeModal) {
        this.activeModal = activeModal;
    }
    cancel() {
        this.activeModal.dismiss('canceled');
    }
    ngOnInit() { }
};
JsonModalComponent = __decorate([
    Component({
        styleUrls: ['./json-modal.component.scss'],
        templateUrl: './json-modal.component.html',
    }),
    __metadata("design:paramtypes", [NgbActiveModal])
], JsonModalComponent);
export { JsonModalComponent };
//# sourceMappingURL=json-modal.component.js.map