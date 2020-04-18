import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ElementRef, Renderer2, } from '@angular/core';
import { Subject, forkJoin } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { InvitesService } from '../../../@core/data/invites.service';
import { takeUntil, first } from 'rxjs/operators';
import { Country, getCountryName, } from '@modules/server.common/entities/GeoLocation';
import { CountryRenderComponent } from './country-render/country-render.component';
import { TranslateService } from '@ngx-translate/core';
import { NotifyService } from '@app/@core/services/notify/notify.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfimationModalComponent } from '../../../@shared/confirmation-modal/confirmation-modal.component';
const perPage = 10;
let InvitesComponent = class InvitesComponent {
    constructor(_invitesService, _elRef, _renderer, _translateService, _notifyService, modalService) {
        this._invitesService = _invitesService;
        this._elRef = _elRef;
        this._renderer = _renderer;
        this._translateService = _translateService;
        this._notifyService = _notifyService;
        this.modalService = modalService;
        this.sourceSmartTable = new LocalDataSource();
        this.ngDestroy$ = new Subject();
        this.noInfoSign = '';
        this.selectedInvites = [];
    }
    ngOnInit() {
        this._loadSettingsSmartTable();
        this._loadDataSmartTable();
        this._applyTranslationOnSmartTable();
        this.smartTableChange();
    }
    ngAfterViewChecked() {
        if (this._elRef.nativeElement.querySelector('.ng2-smart-action-add-create')) {
            const firstRow = 2;
            const columnOffset = 0;
            const td = this._renderer.createElement('td');
            const tr = this._elRef.nativeElement.getElementsByTagName('tr')[firstRow];
            const refChild = tr.childNodes[columnOffset];
            if (!this.addClick2 && tr.className !== 'ng-star-inserted') {
                this._renderer.insertBefore(tr, td, refChild);
                this.addClick2 = true;
            }
        }
        else {
            this.addClick2 = false;
        }
    }
    get hasSelectedInvites() {
        return this.selectedInvites.length > 0;
    }
    selectInviteTmp(ev) {
        this.selectedInvites = ev.selected;
    }
    createConfirm(e) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.loading = true;
                const createDataObject = this.inviteCreateObject(e.newData);
                const createInput = yield this._invitesService.getCreateInviteObject(createDataObject);
                yield this._invitesService
                    .createInvite(createInput)
                    .pipe(first())
                    .toPromise();
                e.confirm.resolve();
                this.loading = false;
                const message = `Invite was created`;
                this._notifyService.success(message);
            }
            catch (error) {
                let message = `Something went wrong`;
                if (error.message === 'Validation error') {
                    message = error.message;
                }
                this.loading = false;
                this._notifyService.error(message);
            }
        });
    }
    deleteConfirm(e) {
        return __awaiter(this, void 0, void 0, function* () {
            const activeModal = this.modalService.open(ConfimationModalComponent, {
                size: 'sm',
                container: 'nb-layout',
                backdrop: 'static',
            });
            const modalComponent = activeModal.componentInstance;
            yield modalComponent.confirmEvent
                .pipe(takeUntil(modalComponent.ngDestroy$))
                .subscribe((dataEvent) => {
                try {
                    this.loading = true;
                    this._invitesService
                        .removeByIds([e.data.id])
                        .pipe(first())
                        .toPromise();
                    this.loading = false;
                    const message = `Invite was deleted`;
                    this._notifyService.success(message);
                    e.confirm.resolve();
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
    editConfirm(e) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.loading = true;
                const createDataObject = this.inviteCreateObject(e.newData);
                const createInput = yield this._invitesService.getCreateInviteObject(createDataObject);
                const res = yield this._invitesService
                    .updateInvite(e.data.id, createInput)
                    .pipe(first())
                    .toPromise();
                e.confirm.resolve(res);
                this.loading = false;
                const message = `Invite was updated`;
                this._notifyService.success(message);
            }
            catch (error) {
                this.loading = false;
                let message = `Something went wrong`;
                if (error.message === 'Validation error') {
                    message = error.message;
                }
                this._notifyService.error(message);
            }
        });
    }
    deleteSelectedRows() {
        return __awaiter(this, void 0, void 0, function* () {
            const idsForDelete = this.selectedInvites.map((c) => c.id);
            try {
                this.loading = true;
                yield this._invitesService
                    .removeByIds(idsForDelete)
                    .pipe(first())
                    .toPromise();
                this.loading = false;
                const message = `${idsForDelete.length} invites was deleted`;
                this._notifyService.success(message);
                this.selectedInvites = [];
            }
            catch (error) {
                this.loading = false;
                const message = `Something went wrong!`;
                this._notifyService.error(message);
            }
        });
    }
    _applyTranslationOnSmartTable() {
        this._translateService.onLangChange.subscribe(() => {
            this._loadSettingsSmartTable();
        });
    }
    _loadSettingsSmartTable() {
        const columnTitlePrefix = 'CUSTOMERS_VIEW.SMART_TABLE_COLUMNS.';
        const getTranslate = (name) => this._translateService.get(columnTitlePrefix + name);
        forkJoin(this._translateService.get('Id'), getTranslate('CITY'), getTranslate('COUNTRY'), getTranslate('STREET_ADDRESS'), getTranslate('HOUSE'), getTranslate('APARTMENT'), getTranslate('INVITE_CODE'))
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(([id, city, country, streetAddress, apartment, house, inviteCode,]) => {
            this.settingsSmartTable = {
                selectMode: 'multi',
                add: {
                    addButtonContent: '<i class="ion-md-add"></i>',
                    createButtonContent: '<i class="ion-md-checkmark"></i>',
                    cancelButtonContent: '<i class="ion-md-close"></i>',
                    confirmCreate: true,
                },
                edit: {
                    editButtonContent: '<i class="ion-md-create"></i>',
                    saveButtonContent: '<i class="ion-md-checkmark"></i>',
                    cancelButtonContent: '<i class="ion-md-close"></i>',
                    confirmSave: true,
                },
                delete: {
                    deleteButtonContent: '<i class="ion-md-trash"></i>',
                    confirmDelete: true,
                },
                columns: {
                    country: {
                        title: country,
                        editor: {
                            type: 'custom',
                            component: CountryRenderComponent,
                        },
                    },
                    city: { title: city },
                    address: { title: streetAddress },
                    house: { title: house },
                    apartment: { title: apartment },
                    invite: { title: inviteCode },
                },
                pager: {
                    display: true,
                    perPage,
                },
            };
        });
    }
    _loadDataSmartTable(page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.$invites) {
                yield this.$invites.unsubscribe();
            }
            let invites = [];
            const loadData = () => __awaiter(this, void 0, void 0, function* () {
                const invitesVM = invites.map((invite) => {
                    this.loading = false;
                    return {
                        country: getCountryName(invite.geoLocation.countryId).trim() ||
                            this.noInfoSign,
                        city: invite.geoLocation.city.trim() || this.noInfoSign,
                        address: invite.geoLocation.streetAddress.trim() ||
                            this.noInfoSign,
                        house: invite.geoLocation.house.trim() || this.noInfoSign,
                        apartment: invite.apartment.trim() || this.noInfoSign,
                        invite: invite.code.trim() || this.noInfoSign,
                        id: invite.id,
                        geoLocation: invite.geoLocation,
                    };
                });
                yield this.loadDataCount();
                const invitesData = new Array(this.dataCount);
                invitesData.splice(perPage * (page - 1), perPage, ...invitesVM);
                yield this.sourceSmartTable.load(invitesData);
            });
            this.loading = true;
            this.$invites = this._invitesService
                .getInvites({
                skip: perPage * (page - 1),
                limit: perPage,
            })
                .pipe(takeUntil(this.ngDestroy$))
                .subscribe((i) => __awaiter(this, void 0, void 0, function* () {
                this.loading = true;
                invites = i;
                yield loadData();
                this.loading = false;
            }));
        });
    }
    getUpdateInviteObject(data) {
        const geoLocation = {
            countryId: Country[data.country],
            city: data.city,
            streetAddress: data.address,
            house: data.house,
        };
        const invite = {
            code: data.invite,
            apartment: data.apartment,
            geoLocation,
        };
        return invite;
    }
    inviteCreateObject(data) {
        this.inviteValidation(data);
        data.apartment = data.apartment || ' ';
        return data;
    }
    inviteValidation(data) {
        if (!data.address || !data.city || !data.country || !data.house) {
            throw new Error('Validation error');
        }
    }
    smartTableChange() {
        return __awaiter(this, void 0, void 0, function* () {
            this.sourceSmartTable
                .onChanged()
                .pipe(takeUntil(this.ngDestroy$))
                .subscribe((event) => __awaiter(this, void 0, void 0, function* () {
                if (event.action === 'page') {
                    const page = event.paging.page;
                    this._loadDataSmartTable(page);
                }
            }));
        });
    }
    loadDataCount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dataCount = yield this._invitesService.getCountOfInvites();
        });
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
};
InvitesComponent = __decorate([
    Component({
        selector: 'ea-invites',
        templateUrl: './invites.component.html',
        styleUrls: ['/invites.component.scss'],
    }),
    __metadata("design:paramtypes", [InvitesService,
        ElementRef,
        Renderer2,
        TranslateService,
        NotifyService,
        NgbModal])
], InvitesComponent);
export { InvitesComponent };
//# sourceMappingURL=invites.component.js.map