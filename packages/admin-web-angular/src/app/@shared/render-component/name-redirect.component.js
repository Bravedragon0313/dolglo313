import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
let RedirectNameComponent = class RedirectNameComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() { }
    redirect() {
        if (this.redirectPage) {
            this.router.navigate([`${this.redirectPage}/${this.rowData.id}`]);
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], RedirectNameComponent.prototype, "rowData", void 0);
RedirectNameComponent = __decorate([
    Component({
        styleUrls: ['name-redirect.component.scss'],
        template: `
		<div (click)="redirect()" class="redirectBtn">
			<h6 class="warehouse-name-smt">
				<strong>{{ rowData.name }}</strong>
			</h6>
		</div>
	`,
    }),
    __metadata("design:paramtypes", [Router])
], RedirectNameComponent);
export { RedirectNameComponent };
//# sourceMappingURL=name-redirect.component.js.map