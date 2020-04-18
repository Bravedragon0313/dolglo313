import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CarriersService } from '../../../@core/data/carriers.service';
import { TranslateService } from '@ngx-translate/core';
let RedirectCarrierComponent = class RedirectCarrierComponent {
    constructor(router, carriersService, translate) {
        this.router = router;
        this.carriersService = carriersService;
        this.translate = translate;
    }
    ngOnInit() {
        if (this.rowData.carrierId) {
            this.carrier$ = this.carriersService.getCarrierById(this.rowData.carrierId);
        }
        this.carrierStatusText =
            'STATUS_TEXT.' + this.rowData.carrierStatusText;
    }
    redirect() {
        if (this.rowData.carrierId) {
            this.router.navigate([`carriers/${this.rowData.carrierId}`]);
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], RedirectCarrierComponent.prototype, "rowData", void 0);
RedirectCarrierComponent = __decorate([
    Component({
        styleUrls: ['./redirect-carrier.component.scss'],
        template: `
		<div (click)="redirect()" class="redirectBtn">
			<h6 *ngIf="carrier$ | async as carrier">
				<img class="carrier-image" alt="" src="{{ carrier.logo }}" />
				<div class="carrier-name">{{ carrier.firstName }}</div>
			</h6>
			<h6>{{ carrierStatusText | translate }}</h6>
		</div>
	`,
    }),
    __metadata("design:paramtypes", [Router,
        CarriersService,
        TranslateService])
], RedirectCarrierComponent);
export { RedirectCarrierComponent };
//# sourceMappingURL=redirect-carrier.component.js.map