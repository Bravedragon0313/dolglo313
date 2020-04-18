import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, Output, EventEmitter, Input } from '@angular/core';
import OrderBarcodeTypes, { orderBarcodeTypesToString, } from '@modules/server.common/enums/OrderBarcodeTypes';
import QRCode from 'qrcode';
let SetupMerchantOrdersSettingsComponent = class SetupMerchantOrdersSettingsComponent {
    constructor() {
        this.previousStep = new EventEmitter();
        this.nextStep = new EventEmitter();
        this.canCreateMerchant = false;
        this.iorderBarcodeType = OrderBarcodeTypes.QR;
        this.isQRCode = true;
        this.orderBarcodeTypes = [
            {
                label: orderBarcodeTypesToString(OrderBarcodeTypes.QR),
                value: OrderBarcodeTypes.QR,
            },
            {
                label: orderBarcodeTypesToString(OrderBarcodeTypes.CODE128),
                value: OrderBarcodeTypes.CODE128,
            },
            {
                label: orderBarcodeTypesToString(OrderBarcodeTypes.CODE39),
                value: OrderBarcodeTypes.CODE39,
            },
            {
                label: orderBarcodeTypesToString(OrderBarcodeTypes.MSI),
                value: OrderBarcodeTypes.MSI,
            },
        ];
        this.loadBarcodetDataUrl();
    }
    loadBarcodetDataUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            const dummyId = Date.now();
            this.barcodetDataUrl = yield QRCode.toDataURL(dummyId.toString());
            this.barcodetData = dummyId.toString();
        });
    }
    typeChange(type) {
        this.isQRCode = type === OrderBarcodeTypes.QR;
        if (!this.isQRCode) {
            this.ngxBarcodeFormat = orderBarcodeTypesToString(type);
        }
    }
};
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SetupMerchantOrdersSettingsComponent.prototype, "previousStep", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SetupMerchantOrdersSettingsComponent.prototype, "nextStep", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SetupMerchantOrdersSettingsComponent.prototype, "canCreateMerchant", void 0);
SetupMerchantOrdersSettingsComponent = __decorate([
    Component({
        selector: 'ea-merchants-setup-orders-settings',
        templateUrl: './orders.component.html',
        styleUrls: ['./orders.component.scss'],
    }),
    __metadata("design:paramtypes", [])
], SetupMerchantOrdersSettingsComponent);
export { SetupMerchantOrdersSettingsComponent };
//# sourceMappingURL=orders.component.js.map