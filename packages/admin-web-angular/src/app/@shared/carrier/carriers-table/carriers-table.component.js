var CarriersSmartTableComponent_1;
import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, Input, EventEmitter, Output, } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { CarrierImageComponent } from '@app/@shared/render-component/carriers-table/carrier-image/carrier-image.component';
import { RedirectNameComponent } from '@app/@shared/render-component/name-redirect/name-redirect.component';
import { CarrierPhoneComponent } from '@app/@shared/render-component/carriers-table/carrier-phone/carrier-phone.component';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CarrierActionsComponent } from '@app/@shared/render-component/carriers-table/carrier-actions/carrier-actions.component';
import CarrierStatus from '@modules/server.common/enums/CarrierStatus';
let CarriersSmartTableComponent = CarriersSmartTableComponent_1 = class CarriersSmartTableComponent {
    constructor(_translateService) {
        this._translateService = _translateService;
        this.selectMode = 'multi';
        this.actions = '';
        this.redirectPage = 'carriers';
        this.editRow = new EventEmitter();
        this.deleteRow = new EventEmitter();
        this.pageChange = new EventEmitter();
        this.sourceSmartTable = new LocalDataSource();
        this.selectedCarriers = [];
        this.ngDestroy$ = new Subject();
    }
    get hasSelectedCarriers() {
        return this.selectedCarriers.length > 0;
    }
    ngOnInit() {
        this.loadSettingsSmartTable(this.perPage);
    }
    ngAfterViewInit() {
        if (this.loadWholeData) {
            this.loadData(this.loadWholeData);
        }
        else {
            this.smartTableChange();
        }
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
    selectCarrierTmp(ev) {
        this.selectedCarriers = ev.selected;
    }
    loadData(carriersData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sourceSmartTable.load(carriersData);
        });
    }
    loadSettingsSmartTable(perPage) {
        const columnTitlePrefix = 'CARRIERS_VIEW.SMART_TABLE_COLUMNS.';
        const getTranslate = (name) => this._translateService.get(columnTitlePrefix + name);
        forkJoin(this._translateService.get('Id'), getTranslate('IMAGE'), getTranslate('NAME'), getTranslate('PHONE'), getTranslate('STATUS'), getTranslate('ADDRESS'), getTranslate('DELIVERIES'))
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(([id, image, name, phone, status, address, deliveries]) => {
            this.settingsSmartTable = {
                selectMode: this.selectMode,
                mode: 'external',
                actions: this.actions === 'show' && {
                    add: false,
                },
                edit: {
                    editButtonContent: '<i class="ion-md-create"></i>',
                },
                delete: {
                    deleteButtonContent: '<i class="ion-md-trash"></i>',
                    confirmDelete: true,
                },
                columns: {
                    images: {
                        title: image,
                        class: 'carrier-image',
                        type: 'custom',
                        renderComponent: CarrierImageComponent,
                        onComponentInitFunction: (instance) => {
                            instance.redirectPage = this.redirectPage;
                        },
                        filter: false,
                    },
                    name: {
                        title: name,
                        type: 'custom',
                        renderComponent: RedirectNameComponent,
                        onComponentInitFunction: (instance) => {
                            instance.redirectPage = this.redirectPage;
                        },
                    },
                    phone: {
                        title: phone,
                        type: 'custom',
                        renderComponent: CarrierPhoneComponent,
                    },
                    status: { title: status },
                    address: { title: address },
                    deliveries: { title: deliveries, filter: false },
                    actions: {
                        title: 'Actions',
                        filter: false,
                        type: 'custom',
                        renderComponent: CarrierActionsComponent,
                    },
                },
                pager: {
                    display: true,
                    perPage,
                },
            };
        });
    }
    smartTableChange() {
        return __awaiter(this, void 0, void 0, function* () {
            this.sourceSmartTable
                .onChanged()
                .pipe(takeUntil(this.ngDestroy$))
                .subscribe((event) => __awaiter(this, void 0, void 0, function* () {
                if (event.action === 'page') {
                    const page = event.paging.page;
                    this.pageChange.emit(page);
                }
            }));
        });
    }
    static getCarrierSmartTableObject(c) {
        return {
            id: c.id,
            image: c.logo || CarriersSmartTableComponent_1.noInfoSign,
            name: `${c.firstName || CarriersSmartTableComponent_1.noInfoSign} ${c.lastName || CarriersSmartTableComponent_1.noInfoSign}`,
            phone: c.phone || CarriersSmartTableComponent_1.noInfoSign,
            status: {
                [CarrierStatus.Offline]: 'Offline',
                [CarrierStatus.Online]: 'Online',
                [CarrierStatus.Blocked]: 'Blocked',
            }[c.status],
            address: `${c.geoLocation.city || CarriersSmartTableComponent_1.noInfoSign} st. ${c.geoLocation.streetAddress ||
                CarriersSmartTableComponent_1.noInfoSign}, hse. № ${c.geoLocation.house || CarriersSmartTableComponent_1.noInfoSign}`,
            deliveries: c.numberOfDeliveries,
            carrier: c,
        };
    }
};
CarriersSmartTableComponent.noInfoSign = '';
__decorate([
    Input(),
    __metadata("design:type", Number)
], CarriersSmartTableComponent.prototype, "perPage", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CarriersSmartTableComponent.prototype, "selectMode", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], CarriersSmartTableComponent.prototype, "actions", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CarriersSmartTableComponent.prototype, "redirectPage", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], CarriersSmartTableComponent.prototype, "loadWholeData", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CarriersSmartTableComponent.prototype, "editRow", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CarriersSmartTableComponent.prototype, "deleteRow", void 0);
CarriersSmartTableComponent = CarriersSmartTableComponent_1 = __decorate([
    Component({
        selector: 'ea-carriers-smart-table',
        templateUrl: 'carriers-table.component.html',
        styleUrls: ['carriers-table.component.scss'],
    }),
    __metadata("design:paramtypes", [TranslateService])
], CarriersSmartTableComponent);
export { CarriersSmartTableComponent };
//# sourceMappingURL=carriers-table.component.js.map