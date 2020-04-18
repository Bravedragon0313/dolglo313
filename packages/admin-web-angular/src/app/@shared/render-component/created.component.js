import { __decorate, __metadata } from "tslib";
import { Component, Input, ElementRef, ViewChild, } from '@angular/core';
import { timer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getDifferenceFromTimes } from '../../@core/utils/getDifferenceFromTimes ';
import OrderStatus from '@modules/server.common/enums/OrderStatus';
let CreatedComponent = class CreatedComponent {
    constructor() {
        this.ngDestroy$ = new Subject();
    }
    get notProcessing() {
        return this.rowData && this.rowData.status >= OrderStatus.Delivered;
    }
    ngOnInit() {
        this.createdAt = new Date(this.rowData.createdAt).toLocaleDateString();
        if (!this.notProcessing) {
            if (this.rowData.startDeliveryTime) {
                this.updateTimer();
            }
        }
        else {
            if (this.rowData &&
                this.rowData.startDeliveryTime &&
                (this.rowData.deliveryTime ||
                    this.rowData.finishedProcessingTime)) {
                const start = new Date(this.rowData.deliveryTime ||
                    this.rowData.finishedProcessingTime);
                const end = new Date(this.rowData.startDeliveryTime);
                this.showTime(start, end);
            }
        }
    }
    updateTimer() {
        timer(1, 1000)
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(() => {
            const start = new Date();
            const end = new Date(this.rowData.startDeliveryTime);
            this.showTime(start, end);
        });
    }
    showTime(start, end) {
        const time = getDifferenceFromTimes(start, end);
        this.createdTimer.nativeElement.innerText = time;
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
};
__decorate([
    ViewChild('createdTimer', { static: true }),
    __metadata("design:type", ElementRef)
], CreatedComponent.prototype, "createdTimer", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CreatedComponent.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CreatedComponent.prototype, "rowData", void 0);
CreatedComponent = __decorate([
    Component({
        template: `
		<span class="d-block mb-2"
			><strong>Created:</strong>
			{{
				rowData?.createdAt | amLocal | amDateFormat: 'DD.MM.YYYY HH:mm'
			}}
		</span>
		<strong *ngIf="this.rowData.startDeliveryTime">Elapsed: </strong>
		<span #createdTimer></span>
	`,
    })
], CreatedComponent);
export { CreatedComponent };
//# sourceMappingURL=created.component.js.map