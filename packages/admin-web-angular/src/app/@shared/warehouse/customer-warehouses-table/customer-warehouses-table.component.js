import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { WarehouseOrderComponent } from '../../../pages/+warehouses/+warehouse-order/warehouse-order.component';
import { Subject, forkJoin } from 'rxjs';
import { RedirectNameComponent } from '../../render-component/name-redirect/name-redirect.component';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
let CustomerWarehousesTableComponent = class CustomerWarehousesTableComponent {
    constructor(_translateService) {
        this._translateService = _translateService;
        this.ngDestroy$ = new Subject();
        this.sourceSmartTable = new LocalDataSource();
        this._ngDestroy$ = new Subject();
    }
    ngOnInit() {
        this._loadSettingsSmartTable();
        this._loadDataSmartTable();
        this._applyTranslationOnSmartTable();
    }
    ngAfterViewInit() {
        this._addCustomHTMLElements();
    }
    ngOnDestroy() {
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
    }
    _addCustomHTMLElements() {
        const target = document.querySelector('#nearby-stores ng2-smart-table .ng2-smart-filters > th:nth-child(1)');
        if (target) {
            target.innerHTML =
                '<i class="fa fa-search" style="font-size: 1.3em"/>';
        }
    }
    _applyTranslationOnSmartTable() {
        this._translateService.onLangChange.subscribe(() => {
            this._loadSettingsSmartTable();
        });
    }
    _loadSettingsSmartTable() {
        const columnTitlePrefix = 'CUSTOMERS_VIEW.SMART_TABLE_COLUMNS.';
        const getTranslate = (name) => this._translateService.get(columnTitlePrefix + name);
        forkJoin(this._translateService.get('Id'), getTranslate('NAME'), getTranslate('EMAIL'), getTranslate('PHONE'), getTranslate('CITY'), getTranslate('ADDRESS'), getTranslate('ORDERS_QTY'), getTranslate('ACTIONS'))
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(([id, name, email, phone, city, address, orderQTY, actions,]) => {
            this.settingsSmartTable = {
                actions: false,
                selectMode: 'multi',
                columns: {
                    name: {
                        title: name,
                        type: 'custom',
                        renderComponent: RedirectNameComponent,
                        onComponentInitFunction: (instance) => {
                            instance.redirectPage = 'stores';
                        },
                    },
                    email: { title: email },
                    phone: { title: phone },
                    city: { title: city },
                    address: { title: address },
                    ordersQty: {
                        title: orderQTY,
                        type: 'html',
                        filter: false,
                        valuePrepareFunction: (_, vm) => `<span class="badge badge-secondary">${vm.ordersQty}</span>`,
                    },
                    actions: {
                        title: actions,
                        filter: false,
                        type: 'custom',
                        renderComponent: WarehouseOrderComponent,
                    },
                },
                pager: {
                    display: true,
                    perPage: 3,
                },
            };
        });
    }
    _loadDataSmartTable() {
        this.sourceEvent
            .pipe(takeUntil(this._ngDestroy$))
            .subscribe((rawSource) => {
            this.sourceSmartTable.load(rawSource);
        });
    }
};
__decorate([
    Input(),
    __metadata("design:type", EventEmitter)
], CustomerWarehousesTableComponent.prototype, "sourceEvent", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], CustomerWarehousesTableComponent.prototype, "selectWarehouseTmp", void 0);
CustomerWarehousesTableComponent = __decorate([
    Component({
        selector: 'ea-customer-warehouses-table',
        styleUrls: ['./customer-warehouses-table.component.scss'],
        templateUrl: './customer-warehouses-table.component.html',
    }),
    __metadata("design:paramtypes", [TranslateService])
], CustomerWarehousesTableComponent);
export { CustomerWarehousesTableComponent };
//# sourceMappingURL=customer-warehouses-table.component.js.map