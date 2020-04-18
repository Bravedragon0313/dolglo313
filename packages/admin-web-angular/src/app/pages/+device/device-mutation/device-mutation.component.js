import { __awaiter, __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { DeviceService } from '../../../@core/data/device.service';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NotifyService } from '../../../@core/services/notify/notify.service';
let DeviceMutationComponent = class DeviceMutationComponent {
    constructor(activeModal, fb, deviceService, _notifyService) {
        this.activeModal = activeModal;
        this.fb = fb;
        this.deviceService = deviceService;
        this._notifyService = _notifyService;
        this.ngDestroy$ = new Subject();
        this.form = this.fb.group({
            id: ['', Validators.required],
            language: ['', Validators.required],
            type: ['', Validators.required],
            uuid: ['', Validators.required],
        });
        this.id = this.form.get('id');
        this.language = this.form.get('language');
        this.type = this.form.get('type');
        this.uuid = this.form.get('uuid');
    }
    cancel() {
        this.activeModal.dismiss('canceled');
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.loading = true;
                const dev = yield this.deviceService
                    .update(this.id.value, {
                    language: this.language.value,
                    type: this.type.value,
                    uuid: this.uuid.value,
                })
                    .pipe(first())
                    .toPromise();
                this.loading = false;
                const message = `Device was updated! BLQKS`;
                this._notifyService.success(message);
            }
            catch (error) {
                let message = `Something went wrong`;
                if (error.message === 'Validation error') {
                    message = error.message;
                }
                this.loading = false;
                this._notifyService.error(message);
            }
            this.cancel();
        });
    }
    ngOnInit() {
        this.id.setValue(this.device.id);
        this.language.setValue(this.device.language);
        this.type.setValue(this.device.type);
        this.uuid.setValue(this.device.uuid);
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
};
DeviceMutationComponent = __decorate([
    Component({
        selector: 'ea-device-mutation',
        templateUrl: './device-mutation.component.html',
    }),
    __metadata("design:paramtypes", [NgbActiveModal,
        FormBuilder,
        DeviceService,
        NotifyService])
], DeviceMutationComponent);
export { DeviceMutationComponent };
//# sourceMappingURL=device-mutation.component.js.map