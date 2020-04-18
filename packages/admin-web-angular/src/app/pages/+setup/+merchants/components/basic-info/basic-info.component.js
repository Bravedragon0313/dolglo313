import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild, Output, EventEmitter, } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import QRCode from 'qrcode';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { getDummyImage } from '@modules/server.common/utils';
let SetupMerchantBasicInfoComponent = class SetupMerchantBasicInfoComponent {
    constructor(translateService) {
        this.translateService = translateService;
        this.previousStep = new EventEmitter();
        this.nextStep = new EventEmitter();
        this._ngDestroy$ = new Subject();
        this.uploaderPlaceholder = 'Photo (optional)';
        this.basicInfoModel = {
            name: '',
            logo: '',
            barcodeData: '',
        };
    }
    ngOnInit() {
        this.getUploaderPlaceholderText();
    }
    get basicInfoCreateObj() {
        const model = Object.assign({}, this.basicInfoModel);
        if (!model.logo && model.name) {
            const letter = model.name.charAt(0).toUpperCase();
            const pictureUrl = getDummyImage(300, 300, letter);
            model.logo = pictureUrl;
        }
        return model;
    }
    get formValid() {
        return (this.basicInfoForm.valid &&
            (this.basicInfoModel.logo === '' || !this.invalidUrl));
    }
    deleteImg() {
        this.basicInfoModel.logo = '';
    }
    nameChange() {
        if (this.name.valid && this.basicInfoModel.barcodeData === '') {
            this.basicInfoModel.barcodeData = this.name.value;
            this.barcodeDataChange();
        }
    }
    barcodeDataChange() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.basicInfoModel.barcodeData) {
                this.barcodetDataUrl = yield QRCode.toDataURL(this.basicInfoModel.barcodeData);
            }
            else {
                this.barcodetDataUrl = null;
            }
        });
    }
    getUploaderPlaceholderText() {
        this.translateService
            .stream('FAKE_DATA.SETUP_MERCHANTS.BASIC_INFO.PHOTO_OPTIONAL')
            .pipe(takeUntil(this._ngDestroy$))
            .subscribe((text) => {
            this.uploaderPlaceholder = text;
        });
    }
    ngOnDestroy() {
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
    }
};
__decorate([
    ViewChild('basicInfoForm', { static: true }),
    __metadata("design:type", NgForm)
], SetupMerchantBasicInfoComponent.prototype, "basicInfoForm", void 0);
__decorate([
    ViewChild('name'),
    __metadata("design:type", NgModel)
], SetupMerchantBasicInfoComponent.prototype, "name", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SetupMerchantBasicInfoComponent.prototype, "previousStep", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SetupMerchantBasicInfoComponent.prototype, "nextStep", void 0);
SetupMerchantBasicInfoComponent = __decorate([
    Component({
        selector: 'ea-merchants-setup-basic-info',
        templateUrl: './basic-info.component.html',
        styleUrls: ['./basic-info.component.scss'],
    }),
    __metadata("design:paramtypes", [TranslateService])
], SetupMerchantBasicInfoComponent);
export { SetupMerchantBasicInfoComponent };
//# sourceMappingURL=basic-info.component.js.map