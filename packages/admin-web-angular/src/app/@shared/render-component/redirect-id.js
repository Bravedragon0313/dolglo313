import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
let RedirectIdComponent = class RedirectIdComponent {
    constructor(router) {
        this.router = router;
    }
    redirect() {
        if (this.baseUrl && this.rowData.id) {
            this.router.navigate([`${this.baseUrl}/${this.rowData.id}`]);
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], RedirectIdComponent.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], RedirectIdComponent.prototype, "baseUrl", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], RedirectIdComponent.prototype, "rowData", void 0);
RedirectIdComponent = __decorate([
    Component({
        template: `
		<button class="btn btn-sm btn-outline-secondary" (click)="redirect()">
			{{ rowData.id }}
		</button>
	`,
    }),
    __metadata("design:paramtypes", [Router])
], RedirectIdComponent);
export { RedirectIdComponent };
//# sourceMappingURL=redirect-id.js.map