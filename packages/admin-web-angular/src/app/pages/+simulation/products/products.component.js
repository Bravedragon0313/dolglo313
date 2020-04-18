import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductImageRedirectComponent } from '@app/@shared/render-component/product-image-redirect/product-image-redirect.component';
import { forkJoin, Subject } from 'rxjs';
import { ProductTitleRedirectComponent } from '@app/@shared/render-component/product-title-redirect/product-title-redirect.component';
import { SimulationJsonComponent } from '@app/@shared/render-component/simulation-table/sumulation-json.component';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { ProductCheckboxComponent } from '@app/@shared/render-component/product-checkbox/product-checkbox';
let SimulationProductsComponent = class SimulationProductsComponent {
    constructor(_translateService) {
        this._translateService = _translateService;
        this.sourceSmartTable = new LocalDataSource();
        this._ngDestroy$ = new Subject();
        this.selectedProducts = [];
        this.selectProducts$ = new EventEmitter();
        this.selectProductsChange$ = new EventEmitter();
        this._loadSmartTableSettings();
        this._applyTranslationOnSmartTable();
    }
    setupDataForSmartTable(products) {
        if (products.length > 0) {
            const data = products.map((pInfo) => {
                const product = pInfo.warehouseProduct.product;
                return {
                    id: product['id'],
                    product,
                    warehouseId: pInfo.warehouseId,
                };
            });
            this.selectProducts$
                .pipe(takeUntil(this._ngDestroy$))
                .subscribe(({ current, allData }) => {
                allData.find((d) => d.id === current['id'])['checked'] = !current.checked;
                this.selectedProducts = allData.filter((r) => r.checked);
                if (this.selectedProducts.length !== 0) {
                    const newData = data.filter((d) => d['warehouseId'] === current['warehouseId']);
                    this.sourceSmartTable.load(newData);
                    this.selectProductsChange$.emit();
                }
                else {
                    this.sourceSmartTable.load(data);
                    this.selectProductsChange$.emit();
                }
            });
            this.sourceSmartTable.load(data);
        }
    }
    selectProductTmp(ev) {
        return __awaiter(this, void 0, void 0, function* () {
            this.selectProducts$.emit({
                current: ev.data,
                allData: ev.source.data,
            });
        });
    }
    _applyTranslationOnSmartTable() {
        this._translateService.onLangChange.subscribe(() => {
            this._loadSmartTableSettings();
        });
    }
    _loadSmartTableSettings() {
        const columnTitlePrefix = 'SIMULATION_VIEW.SMART_TABLE.';
        const getTranslate = (name) => this._translateService.get(columnTitlePrefix + name);
        forkJoin(getTranslate('ID'), getTranslate('TITLE'), getTranslate('IMAGE'))
            .pipe(takeUntil(this._ngDestroy$))
            .subscribe(([id, titleTr, image]) => {
            this.settingsSmartTable = {
                actions: false,
                hideSubHeader: true,
                mode: 'inline',
                columns: {
                    checkbox: {
                        title: '',
                        filter: false,
                        type: 'custom',
                        renderComponent: ProductCheckboxComponent,
                    },
                    images: {
                        title: image,
                        filter: false,
                        renderComponent: ProductImageRedirectComponent,
                        type: 'custom',
                        width: '6%',
                    },
                    title: {
                        title: titleTr,
                        filter: false,
                        class: 'text-left',
                        renderComponent: ProductTitleRedirectComponent,
                        type: 'custom',
                    },
                    id: {
                        class: 'text-left',
                        title: id,
                        filter: false,
                    },
                    json: {
                        title: 'Actions',
                        width: '6%',
                        filter: false,
                        type: 'custom',
                        renderComponent: SimulationJsonComponent,
                    },
                },
                pager: {
                    display: true,
                    perPage: 5,
                },
            };
        });
    }
    ngOnDestroy() {
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
    }
};
SimulationProductsComponent = __decorate([
    Component({
        selector: 'ea-simulation-products',
        templateUrl: './products.component.html',
    }),
    __metadata("design:paramtypes", [TranslateService])
], SimulationProductsComponent);
export { SimulationProductsComponent };
//# sourceMappingURL=products.component.js.map