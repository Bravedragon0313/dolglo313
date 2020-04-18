import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WarehousesService } from '../../../@core/data/warehouses.service';
let RedirectStoreComponent = class RedirectStoreComponent {
    constructor(router, warehousesService) {
        this.router = router;
        this.warehousesService = warehousesService;
    }
    ngOnInit() {
        this.store$ = this.warehousesService.getStoreById(this.rowData.warehouseId);
        this.warehouseStatusText =
            'STATUS_TEXT.' + this.rowData.warehouseStatusText;
    }
    redirect() {
        if (this.rowData.warehouseId) {
            this.router.navigate([`stores/${this.rowData.warehouseId}`]);
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], RedirectStoreComponent.prototype, "rowData", void 0);
RedirectStoreComponent = __decorate([
    Component({
        styleUrls: ['redirect-store.component.scss'],
        template: `
		<div
			*ngIf="store$ | async as store"
			(click)="redirect()"
			class="redirectBtn"
		>
			<h6>
				<img class="warehouse-image" alt="" src="{{ store.logo }}" />
				<div class="warehouse-name">{{ store.name }}</div>
			</h6>
			<h6>{{ warehouseStatusText | translate }}</h6>
		</div>
	`,
    }),
    __metadata("design:paramtypes", [Router,
        WarehousesService])
], RedirectStoreComponent);
export { RedirectStoreComponent };
//# sourceMappingURL=redirect-store.component.js.map