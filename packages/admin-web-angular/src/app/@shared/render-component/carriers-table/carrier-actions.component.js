import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarrierTableInfoComponent } from '@app/pages/+carriers/+carrier/carrier-info.component';
import { CarrierLocationComponent } from '@app/pages/+carriers/+carrier/location/carrier-location.component';
let CarrierActionsComponent = class CarrierActionsComponent {
    constructor(modalService) {
        this.modalService = modalService;
    }
    ngOnInit() { }
    openInfo() {
        const activeModal = this.modalService.open(CarrierTableInfoComponent, {
            size: 'sm',
            container: 'nb-layout',
        });
        const modalComponent = activeModal.componentInstance;
        modalComponent.carrierId = this.rowData.id;
    }
    openMap() {
        const activeModal = this.modalService.open(CarrierLocationComponent, {
            size: 'sm',
            windowClass: 'map-modal',
        });
        const modalComponent = activeModal.componentInstance;
        modalComponent.carrierId = this.rowData.id;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], CarrierActionsComponent.prototype, "rowData", void 0);
CarrierActionsComponent = __decorate([
    Component({
        template: `
		<div class="iconsCont" style="display:flex;">
			<h4 class="text-center iconBtns">
				<i (click)="openInfo()" class="fa fa-info-circle infoBtn"></i>
			</h4>
			<h4><i (click)="openMap()" class="fa fa-search infoBtn"></i></h4>
		</div>
	`,
    }),
    __metadata("design:paramtypes", [NgbModal])
], CarrierActionsComponent);
export { CarrierActionsComponent };
//# sourceMappingURL=carrier-actions.component.js.map