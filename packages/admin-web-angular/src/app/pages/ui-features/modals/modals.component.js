import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
let ModalsComponent = class ModalsComponent {
    constructor(modalService) {
        this.modalService = modalService;
    }
    showLargeModal() {
        const activeModal = this.modalService.open(ModalComponent, {
            size: 'lg',
            container: 'nb-layout',
        });
        activeModal.componentInstance.modalHeader = 'Large Modal';
    }
    showSmallModal() {
        const activeModal = this.modalService.open(ModalComponent, {
            size: 'sm',
            container: 'nb-layout',
        });
        activeModal.componentInstance.modalHeader = 'Small Modal';
    }
    showStaticModal() {
        const activeModal = this.modalService.open(ModalComponent, {
            size: 'sm',
            backdrop: 'static',
            container: 'nb-layout',
        });
        activeModal.componentInstance.modalHeader = 'Static modal';
        activeModal.componentInstance.modalContent = `This is static modal, backdrop click
                                                    will not close it. Click × or confirmation button to close modal.`;
    }
};
ModalsComponent = __decorate([
    Component({
        selector: 'ngx-modals',
        styleUrls: ['./modals.component.scss'],
        templateUrl: './modals.component.html',
    }),
    __metadata("design:paramtypes", [NgbModal])
], ModalsComponent);
export { ModalsComponent };
//# sourceMappingURL=modals.component.js.map