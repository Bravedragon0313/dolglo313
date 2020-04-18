import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild, Input, } from '@angular/core';
import { CarriersSmartTableComponent } from '@app/@shared/carrier/carriers-table/carriers-table.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { CarriersService } from '@app/@core/data/carriers.service';
const perPage = 5;
let SetupMerchantSharedCarriersComponent = class SetupMerchantSharedCarriersComponent {
    constructor(_translateService, _carriersService) {
        this._translateService = _translateService;
        this._carriersService = _carriersService;
        this.existedCarriersIds = [];
        this.perPage = perPage;
        this.ngDestroy$ = new Subject();
        this._applyTranslationOnSmartTable();
    }
    ngAfterViewInit() {
        this._loadDataSmartTable();
        this.smartTablePageChange();
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
    _loadDataSmartTable(page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.$carriers) {
                yield this.$carriers.unsubscribe();
            }
            this.$carriers = this._carriersService
                .getCarriers({
                skip: perPage * (page - 1),
                limit: perPage,
            }, {
                isSharedCarrier: true,
                _id: {
                    $nin: this.existedCarriersIds,
                },
            })
                .pipe(takeUntil(this.ngDestroy$))
                .subscribe((data) => __awaiter(this, void 0, void 0, function* () {
                const carriersVm = data.map(CarriersSmartTableComponent.getCarrierSmartTableObject);
                yield this.loadDataCount();
                const carriersData = new Array(this.dataCount);
                carriersData.splice(perPage * (page - 1), perPage, ...carriersVm);
                yield this.carriersTable.loadData(carriersData);
            }));
        });
    }
    _applyTranslationOnSmartTable() {
        this._translateService.onLangChange
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(() => {
            if (this.carriersTable) {
                this.carriersTable.loadSettingsSmartTable(this.perPage);
                this._loadDataSmartTable();
            }
        });
    }
    smartTablePageChange() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.carriersTable) {
                this.carriersTable.pageChange
                    .pipe(takeUntil(this.ngDestroy$))
                    .subscribe((page) => {
                    this._loadDataSmartTable(page);
                });
            }
        });
    }
    loadDataCount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dataCount = yield this._carriersService.getCountOfCarriers({
                isSharedCarrier: true,
                _id: {
                    $nin: this.existedCarriersIds,
                },
            });
        });
    }
};
__decorate([
    ViewChild('carriersTable', { static: true }),
    __metadata("design:type", CarriersSmartTableComponent)
], SetupMerchantSharedCarriersComponent.prototype, "carriersTable", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], SetupMerchantSharedCarriersComponent.prototype, "existedCarriersIds", void 0);
SetupMerchantSharedCarriersComponent = __decorate([
    Component({
        selector: 'ea-merchants-setup-shared-carriers',
        templateUrl: './shared-carriers.component.html',
    }),
    __metadata("design:paramtypes", [TranslateService,
        CarriersService])
], SetupMerchantSharedCarriersComponent);
export { SetupMerchantSharedCarriersComponent };
//# sourceMappingURL=shared-carriers.component.js.map