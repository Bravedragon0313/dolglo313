import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import Carrier from '@modules/server.common/entities/Carrier';
import CarrierStatus from '@modules/server.common/enums/CarrierStatus';
import { CarrierRouter } from '@modules/client.common.angular2/routers/carrier-router.service';
let CarrierInfoComponent = class CarrierInfoComponent {
    constructor(carrierRouter) {
        this.carrierRouter = carrierRouter;
        this.getChangeCarrier = new EventEmitter();
        this.showCode = false;
    }
    toogleStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loading = true;
            const isOnline = this.carrier.status === CarrierStatus.Online;
            const carrier = yield this.carrierRouter.updateStatus(this.carrier.id, isOnline ? CarrierStatus.Offline : CarrierStatus.Online);
            this.getChangeCarrier.emit(carrier);
            this.loading = false;
        });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Carrier)
], CarrierInfoComponent.prototype, "carrier", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CarrierInfoComponent.prototype, "getChangeCarrier", void 0);
CarrierInfoComponent = __decorate([
    Component({
        selector: 'ea-carrier-info',
        styleUrls: ['carrier-info.component.scss'],
        templateUrl: 'carrier-info.component.html',
    }),
    __metadata("design:paramtypes", [CarrierRouter])
], CarrierInfoComponent);
export { CarrierInfoComponent };
//# sourceMappingURL=carrier-info.component.js.map