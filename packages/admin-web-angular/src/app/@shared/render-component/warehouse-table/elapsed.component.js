import { __decorate, __metadata } from "tslib";
import { Component, Input, ElementRef, ViewChild, } from '@angular/core';
import { timer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getDifferenceFromTimes } from '../../../@core/utils/getDifferenceFromTimes ';
import OrderStatus from '@modules/server.common/enums/OrderStatus';
import OrderCarrierStatus from '@modules/server.common/enums/OrderCarrierStatus';
import OrderWarehouseStatus from '@modules/server.common/enums/OrderWarehouseStatus';
let ElapsedComponent = class ElapsedComponent {
    constructor() {
        this.ngDestroy$ = new Subject();
    }
    get notProcessing() {
        return (this.rowData &&
            this.rowData.order &&
            (this.rowData.order.status >= OrderStatus.Delivered ||
                this.rowData.carrierStatus >=
                    OrderCarrierStatus.DeliveryCompleted ||
                this.rowData.warehouseStatus ===
                    OrderWarehouseStatus.GivenToCustomer));
    }
    ngOnInit() {
        if (!this.notProcessing) {
            this.updateTimer();
        }
        else {
            if (this.rowData &&
                this.rowData.order &&
                (this.rowData.order.deliveryTime ||
                    this.rowData.order.finishedProcessingTime)) {
                const start = new Date(this.rowData.order.deliveryTime ||
                    this.rowData.order.finishedProcessingTime);
                const end = new Date(this.rowData.createdAt);
                this.showTime(start, end);
            }
        }
    }
    updateTimer() {
        timer(1, 1000)
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(() => {
            const start = new Date();
            const end = new Date(this.rowData.createdAt);
            this.showTime(start, end);
        });
    }
    showTime(start, end) {
        const time = getDifferenceFromTimes(start, end);
        this.elapsedTime.nativeElement.innerText = time;
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
};
__decorate([
    ViewChild('elapsedTime', { static: true }),
    __metadata("design:type", ElementRef)
], ElapsedComponent.prototype, "elapsedTime", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ElapsedComponent.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ElapsedComponent.prototype, "rowData", void 0);
ElapsedComponent = __decorate([
    Component({
        template: ` <span #elapsedTime></span> `,
    })
], ElapsedComponent);
export { ElapsedComponent };
//# sourceMappingURL=elapsed.component.js.map