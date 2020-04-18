import { __decorate, __metadata } from "tslib";
import { Component, Output, EventEmitter, } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
let ConfimationModalComponent = class ConfimationModalComponent {
    constructor(activeModal, translateService) {
        this.activeModal = activeModal;
        this.translateService = translateService;
        this.ngDestroy$ = new Subject();
        this.prefix = 'CONFIRM_MODAL.';
        this.confirmButton = 'YES';
        this.cancelButton = 'NO';
        this.confirmEvent = new EventEmitter();
        if (!this.mainText) {
            this.mainText = 'ARE_YOU_SURE';
        }
    }
    ngOnInit() { }
    mainTextTr() {
        const forTranslate = this.prefix + this.mainText;
        return this._translate(forTranslate);
    }
    confirmButtonTr() {
        const forTranslate = this.prefix + this.confirmButton;
        return this._translate(forTranslate);
    }
    cancelButtonTr() {
        const forTranslate = this.prefix + this.cancelButton;
        return this._translate(forTranslate);
    }
    cancel() {
        this.activeModal.dismiss('canceled');
    }
    _translate(key) {
        let translationResult = '';
        this.translateService.get(key).subscribe((res) => {
            translationResult = res;
        });
        return translationResult;
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
};
__decorate([
    Output(),
    __metadata("design:type", Object)
], ConfimationModalComponent.prototype, "confirmEvent", void 0);
ConfimationModalComponent = __decorate([
    Component({
        styleUrls: ['./confirmation-modal.component.scss'],
        templateUrl: './confirmation-modal.component.html',
    }),
    __metadata("design:paramtypes", [NgbActiveModal,
        TranslateService])
], ConfimationModalComponent);
export { ConfimationModalComponent };
//# sourceMappingURL=confirmation-modal.component.js.map