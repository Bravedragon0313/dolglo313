import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { CarriersService } from '../../@core/data/carriers.service';
import { CarrierMutationComponent } from '../../@shared/carrier/carrier-mutation';
import { Subject } from 'rxjs/Rx';
import { ToasterService } from 'angular2-toaster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarriersSmartTableComponent } from '@app/@shared/carrier/carriers-table/carriers-table.component';
import { takeUntil, first } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
const perPage = 5;
let CarriersComponent = class CarriersComponent {
    constructor(_carriersService, _toasterService, modalService, _translateService) {
        this._carriersService = _carriersService;
        this._toasterService = _toasterService;
        this.modalService = modalService;
        this._translateService = _translateService;
        this.perPage = perPage;
        this.ngDestroy$ = new Subject();
        this._applyTranslationOnSmartTable();
    }
    openWizardNewCarrier() {
        this.modalService.open(CarrierMutationComponent, {
            size: 'lg',
            container: 'nb-layout',
            windowClass: 'ng-custom',
            backdrop: 'static',
        });
    }
    deleteSelectedCarriers() {
        return __awaiter(this, void 0, void 0, function* () {
            const idsForDelete = this.carriersTable.selectedCarriers.map((c) => c.id);
            this.loading = true;
            try {
                yield this._carriersService
                    .removeByIds(idsForDelete)
                    .pipe(first())
                    .toPromise();
                this.carriersTable.selectedCarriers.forEach((carrier) => this._toasterService.pop(`success`, `Carrier ${carrier['name']} DELETED`));
                this.carriersTable.selectedCarriers = [];
                this.loading = false;
            }
            catch (error) {
                this.loading = false;
                this._toasterService.pop(`error`, `${error.message}`);
            }
        });
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
    loadDataCount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dataCount = yield this._carriersService.getCountOfCarriers();
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
};
__decorate([
    ViewChild('carriersTable', { static: true }),
    __metadata("design:type", CarriersSmartTableComponent)
], CarriersComponent.prototype, "carriersTable", void 0);
CarriersComponent = __decorate([
    Component({
        selector: 'ea-carriers',
        templateUrl: 'carriers.component.html',
        styleUrls: ['carriers.component.scss'],
    }),
    __metadata("design:paramtypes", [CarriersService,
        ToasterService,
        NgbModal,
        TranslateService])
], CarriersComponent);
export { CarriersComponent };
//# sourceMappingURL=carriers.component.js.map