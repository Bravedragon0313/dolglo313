import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JsonModalComponent } from '../../json-modal/json-modal.component';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
let SimulationJsonComponent = class SimulationJsonComponent {
    constructor(modalService, _productLocalesService) {
        this.modalService = modalService;
        this._productLocalesService = _productLocalesService;
    }
    ngOnInit() { }
    openInfo() {
        const activeModal = this.modalService.open(JsonModalComponent, {
            size: 'lg',
            container: 'nb-layout',
            windowClass: 'simJSON',
        });
        const modalComponent = activeModal.componentInstance;
        modalComponent.obj = this.rowData;
        modalComponent.title = 'Product';
        modalComponent.subTitle = this.localeTranslate(this.rowData.product['title']);
    }
    localeTranslate(member) {
        return this._productLocalesService.getTranslate(member);
    }
    openCancel() {
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], SimulationJsonComponent.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SimulationJsonComponent.prototype, "rowData", void 0);
SimulationJsonComponent = __decorate([
    Component({
        templateUrl: './sumulation-json.component.html',
    }),
    __metadata("design:paramtypes", [NgbModal,
        ProductLocalesService])
], SimulationJsonComponent);
export { SimulationJsonComponent };
//# sourceMappingURL=sumulation-json.component.js.map