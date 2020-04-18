import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
let StatusComponent = class StatusComponent {
    constructor() { }
    ngOnInit() {
        this.isInvited = this.rowData.isInvited;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], StatusComponent.prototype, "rowData", void 0);
StatusComponent = __decorate([
    Component({
        styles: [
            '.invited-icon { color: green; margin-right: 3px;} .actions-invites-requests{width: 5rem;}',
        ],
        templateUrl: './status.component.html',
    }),
    __metadata("design:paramtypes", [])
], StatusComponent);
export { StatusComponent };
//# sourceMappingURL=status.component.js.map