import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
let ModalComponent = class ModalComponent {
    constructor(activeModal) {
        this.activeModal = activeModal;
        this.modalContent = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
    nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
    nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.`;
    }
    closeModal() {
        this.activeModal.close();
    }
};
ModalComponent = __decorate([
    Component({
        selector: 'ngx-modal',
        templateUrl: './modal.component.html',
    }),
    __metadata("design:paramtypes", [NgbActiveModal])
], ModalComponent);
export { ModalComponent };
//# sourceMappingURL=modal.component.js.map