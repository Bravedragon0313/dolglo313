import { __decorate, __metadata } from "tslib";
import { Component, Input, } from '@angular/core';
import { Subject } from 'rxjs';
import Order from '@modules/server.common/entities/Order';
import { TranslateService } from '@ngx-translate/core';
let OrderHeaderInfoComponent = class OrderHeaderInfoComponent {
    constructor(_translateService) {
        this._translateService = _translateService;
        this._ngDestroy$ = new Subject();
        this.timers = [];
    }
    ngOnChanges() { }
    ngOnInit() { }
    getStatus(status) {
        const columnTitlePrefix = 'STATUS_TEXT.';
        const forTranslate = columnTitlePrefix + status;
        return this._translate(forTranslate);
    }
    _translate(key) {
        let translationResult = '';
        this._translateService.get(key).subscribe((res) => {
            translationResult = res;
        });
        return translationResult;
    }
    ngOnDestroy() {
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Order)
], OrderHeaderInfoComponent.prototype, "selectedOrder", void 0);
OrderHeaderInfoComponent = __decorate([
    Component({
        selector: 'ea-order-header-info',
        styleUrls: ['./order-header-info.component.scss'],
        templateUrl: './order-header-info.component.html',
    }),
    __metadata("design:paramtypes", [TranslateService])
], OrderHeaderInfoComponent);
export { OrderHeaderInfoComponent };
//# sourceMappingURL=order-header-info.component.js.map