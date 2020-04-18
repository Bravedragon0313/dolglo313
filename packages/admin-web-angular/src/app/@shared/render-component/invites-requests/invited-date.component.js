import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
let InvitedDateComponent = class InvitedDateComponent {
    constructor() { }
    ngOnInit() {
        this.inviteRequest = this.rowData.inviteRequest;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], InvitedDateComponent.prototype, "rowData", void 0);
InvitedDateComponent = __decorate([
    Component({
        styles: [
            '.invited-icon { color: green; margin-right: 3px;} .actions-invites-requests{width: 5rem;}',
        ],
        template: `
		<div class="invited-date">
			{{ inviteRequest?.invitedDate | date: 'short' }}
		</div>
		<div class="invited-date"></div>
	`,
    }),
    __metadata("design:paramtypes", [])
], InvitedDateComponent);
export { InvitedDateComponent };
//# sourceMappingURL=invited-date.component.js.map