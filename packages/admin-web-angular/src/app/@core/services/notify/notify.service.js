import { __decorate, __metadata } from "tslib";
import { ToasterService } from 'angular2-toaster';
import { Injectable } from '@angular/core';
let NotifyService = class NotifyService {
    constructor(_toasterService) {
        this._toasterService = _toasterService;
    }
    success(title, body) {
        this._setupToast('success', title, body);
        this._notify();
    }
    warn(title, body) {
        this._setupToast('warning', title, body);
        this._notify();
    }
    error(title, body) {
        this._setupToast('error', title, body);
        this._notify();
    }
    _setupToast(type, title, body) {
        this._toast = { type, title, body };
    }
    _notify() {
        this._toasterService.pop(this._toast);
    }
};
NotifyService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ToasterService])
], NotifyService);
export { NotifyService };
//# sourceMappingURL=notify.service.js.map