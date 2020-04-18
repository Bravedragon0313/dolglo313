var DeviceComponent_1;
import { __awaiter, __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { DeviceService } from '../../@core/data/device.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeviceMutationComponent } from './device-mutation/device-mutation.component';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';
import { NotifyService } from '../../@core/services/notify/notify.service';
import { ConfimationModalComponent } from '../../@shared/confirmation-modal/confirmation-modal.component';
let DeviceComponent = DeviceComponent_1 = class DeviceComponent {
    constructor(_deviceService, _modalService, _translateService, _notifyService) {
        this._deviceService = _deviceService;
        this._modalService = _modalService;
        this._translateService = _translateService;
        this._notifyService = _notifyService;
        this.ngDestroy$ = new Subject();
        this._selectedDevices = [];
        this.sourceSmartTable = new LocalDataSource();
        this._loadSmartTableSettings();
        this._setupDataForSmartTable();
        this._listenForEntityLocaleTranslate();
        this._applyTranslationOnSmartTable();
    }
    updateDevice(device) {
        const activeModal = this._modalService.open(DeviceMutationComponent, {
            size: 'lg',
            container: 'nb-layout',
            backdrop: 'static',
        });
        const modalComponent = activeModal.componentInstance;
        modalComponent.device = device;
    }
    ngOnInit() { }
    edit(event) {
        const activeModal = this._modalService.open(DeviceMutationComponent, {
            size: 'lg',
            container: 'nb-layout',
            backdrop: 'static',
        });
        const modalComponent = activeModal.componentInstance;
        modalComponent.device = event.data;
        modalComponent.loading = this.loading;
    }
    deleteSelectedDevices() {
        return __awaiter(this, void 0, void 0, function* () {
            const idsForDelete = this._selectedDevices.map((c) => c.id);
            try {
                this.loading = true;
                yield this._deviceService
                    .removeByIds(idsForDelete)
                    .pipe(first())
                    .toPromise();
                this.loading = false;
                const message = `${idsForDelete.length} devices was deleted`;
                this._notifyService.success(message);
            }
            catch (error) {
                this.loading = false;
                const message = `Something went wrong!`;
                this._notifyService.error(message);
            }
        });
    }
    get hasSelectedDevices() {
        return this._selectedDevices.length > 0;
    }
    selectProductTmp(ev) {
        this._selectedDevices = ev.selected;
    }
    get selectedProducts() {
        return [...this._selectedDevices];
    }
    deleteDevice(e) {
        return __awaiter(this, void 0, void 0, function* () {
            const activeModal = this._modalService.open(ConfimationModalComponent, {
                size: 'sm',
                container: 'nb-layout',
                backdrop: 'static',
            });
            const modalComponent = activeModal.componentInstance;
            yield modalComponent.confirmEvent
                .pipe(takeUntil(modalComponent.ngDestroy$))
                .subscribe((dataEvent) => {
                const idsArray = [];
                idsArray.push(e.data.id);
                try {
                    this.loading = true;
                    this._deviceService
                        .removeByIds(idsArray)
                        .pipe()
                        .toPromise();
                    this.loading = false;
                    const message = `${idsArray[0]} device was deleted`;
                    this._notifyService.success(message);
                }
                catch (error) {
                    this.loading = false;
                    const message = `Something went wrong!`;
                    this._notifyService.error(message);
                }
                modalComponent.cancel();
            });
        });
    }
    _listenForEntityLocaleTranslate() {
        this._translateService.onLangChange
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(() => {
            this._setupDataForSmartTable();
            this._loadSmartTableSettings();
        });
    }
    _applyTranslationOnSmartTable() {
        this._translateService.onLangChange.subscribe(() => {
            this._loadSmartTableSettings();
        });
    }
    _loadSmartTableSettings() {
        const columnTitlePrefix = 'CUSTOMERS_VIEW.DEVICE.';
        const getTranslate = (name) => this._translateService.get(columnTitlePrefix + name);
        forkJoin(getTranslate('ID'), getTranslate('LANGUAGE'), getTranslate('TYPE'), getTranslate('UUID'))
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(([id, language, type, uuid]) => {
            this.settingsSmartTable = {
                selectMode: 'multi',
                actions: {
                    add: false,
                    position: 'left',
                },
                edit: {
                    editButtonContent: '<i class="ion-md-create"></i>',
                },
                delete: {
                    deleteButtonContent: '<i class="ion-md-trash"></i>',
                    confirmDelete: true,
                },
                mode: 'external',
                hideSubHeader: true,
                columns: {
                    id: {
                        title: id,
                        filter: false,
                    },
                    language: {
                        title: language,
                        filter: false,
                    },
                    type: {
                        title: type,
                        filter: false,
                    },
                    uuid: {
                        title: uuid,
                        filter: false,
                    },
                },
                pager: {
                    display: true,
                    perPage: 5,
                },
            };
        });
    }
    _setupDataForSmartTable() {
        this._deviceService
            .getDevices()
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe((data) => {
            const devicesVm = data.map((c) => {
                return {
                    id: c.id,
                    language: c.language || DeviceComponent_1.noInfoSign,
                    type: c.type || DeviceComponent_1.noInfoSign,
                    uuid: c.uuid || DeviceComponent_1.noInfoSign,
                };
            });
            this.sourceSmartTable.load(devicesVm);
        });
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
        if (this.device$) {
            this.device$.unsubscribe();
        }
    }
};
DeviceComponent.noInfoSign = '';
DeviceComponent = DeviceComponent_1 = __decorate([
    Component({
        selector: 'ea-device',
        styleUrls: ['./device.component.scss'],
        templateUrl: './device.component.html',
    }),
    __metadata("design:paramtypes", [DeviceService,
        NgbModal,
        TranslateService,
        NotifyService])
], DeviceComponent);
export { DeviceComponent };
//# sourceMappingURL=device.component.js.map