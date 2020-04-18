import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
let StatusComponent = class StatusComponent {
    constructor() { }
    ngOnInit() {
        if (this.checkOrderField === 'isPaid') {
            this.paid = this.rowData.isPaid;
        }
        else {
            this.closed = this.rowData.isCancelled;
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], StatusComponent.prototype, "rowData", void 0);
StatusComponent = __decorate([
    Component({
        styles: [
            `
			.paid-icon {
				color: green;
				margin-right: 3px;
			}
			.closed-icon {
				color: red;
				margin-right: 3px;
			}
			.actions-invites-requests {
				width: 6rem;
			}
		`,
        ],
        template: `
		<div
			*ngIf="paid || closed"
			class="text-center actions-invites-requests"
		>
			<i *ngIf="paid" class="ion-md-checkmark paid-icon"></i>
			<i *ngIf="closed" class="ion-md-close closed-icon"></i> {{ text }}
		</div>
	`,
    }),
    __metadata("design:paramtypes", [])
], StatusComponent);
export { StatusComponent };
//# sourceMappingURL=status.component.js.map