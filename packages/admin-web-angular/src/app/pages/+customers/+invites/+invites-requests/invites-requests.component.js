import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, Renderer2, ElementRef, } from '@angular/core';
import { Subject, forkJoin } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { InvitesRequestsService } from '../../../../@core/data/invites-requests.service';
import { getCountryName } from '@modules/server.common/entities/GeoLocation';
import { takeUntil, first } from 'rxjs/operators';
import { CountryRenderComponent } from '../country-render/country-render.component';
import { InvitesService } from '../../../../@core/data/invites.service';
import { TranslateService } from '@ngx-translate/core';
import { countries } from '@modules/server.common/data/abbreviation-to-country';
import { StatusComponent } from '../../../../@shared/render-component/invites-requests/status/status.component';
import { InvitedDateComponent } from '../../../../@shared/render-component/invites-requests/invited-date.component';
import { NotifyService } from '@app/@core/services/notify/notify.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfimationModalComponent } from '../../../../@shared/confirmation-modal/confirmation-modal.component';
const perPage = 10;
let InvitesRequestsComponent = class InvitesRequestsComponent {
    constructor(_invitesRequestsService, _invitesService, _elRef, _renderer, _translateService, _notifyService, modalService) {
        this._invitesRequestsService = _invitesRequestsService;
        this._invitesService = _invitesService;
        this._elRef = _elRef;
        this._renderer = _renderer;
        this._translateService = _translateService;
        this._notifyService = _notifyService;
        this.modalService = modalService;
        this.sourceSmartTable = new LocalDataSource();
        this.ngDestroy$ = new Subject();
        this.noInfoSign = '';
        this.selectedInvitesRequests = [];
        this.notInvitedOnly = true;
        this.currentPage = 1;
        this._loadSettingsSmartTable();
        this._loadDataSmartTable();
        this.smartTableChange();
    }
    ngAfterViewChecked() {
        this.loadSmartTableTranslates();
        if (this._elRef.nativeElement.querySelector('.ng2-smart-action-add-create')) {
            const firstRow = 2;
            const columnOffset = 0;
            const td = this._renderer.createElement('td');
            const tr = this._elRef.nativeElement.getElementsByTagName('tr')[firstRow];
            const refChild = tr.childNodes[columnOffset];
            if (!this.addClick) {
                this._renderer.insertBefore(tr, td, refChild);
                this.addClick = true;
            }
        }
        else {
            this.addClick = false;
        }
    }
    get hasSelectedInvitesRequests() {
        return this.selectedInvitesRequests.length > 0;
    }
    get hasSelectedInvitesRequestsForInvite() {
        return (this.selectedInvitesRequests.filter((i) => !i.isInvited).length > 0);
    }
    selectInvitesRequestsTmp(ev) {
        this.selectedInvitesRequests = ev.selected;
    }
    notInvitedOnlyChanged() {
        this.$invitesRequests.unsubscribe();
        this.notInvitedOnly = !this.notInvitedOnly;
        this._loadDataSmartTable(this.currentPage);
    }
    loadSmartTableTranslates() {
        this._translateService.onLangChange.subscribe((d) => {
            this._loadSettingsSmartTable();
        });
    }
    createConfirm(e) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.loading = true;
                const createDataObject = this.inviteRequestCreateObject(e.newData);
                const createInput = yield this._invitesRequestsService.getCreateInviteRequestObject(createDataObject);
                yield this._invitesRequestsService
                    .createInviteRequest(createInput)
                    .pipe(first())
                    .toPromise();
                e.confirm.resolve();
                this.loading = false;
                const message = `Invite request was created`;
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
                    this._invitesRequestsService
                        .removeByIds([e.data.id])
                        .pipe(first())
                        .toPromise();
                    this.loading = false;
                    const message = `Invite request was deleted`;
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
                const createDataObject = this.inviteRequestCreateObject(e.newData);
                const updateInput = yield this._invitesService.getCreateInviteObject(createDataObject);
                const res = yield this._invitesRequestsService
                    .updateInviteRequest(e.data.id, updateInput)
                    .pipe(first())
                    .toPromise();
                e.confirm.resolve(res);
                this.loading = false;
                const message = `Invite request was updated`;
                this._notifyService.success(message);
            }
            catch (error) {
                this.loading = false;
                const message = `Something went wrong`;
                this._notifyService.error(message);
                console.warn(error);
            }
        });
    }
    inviteSelectedRows() {
        return __awaiter(this, void 0, void 0, function* () {
            let succesInvite = 0;
            const invitesRequests = this.selectedInvitesRequests.filter((i) => !i.isInvited);
            for (const inviteRequest of invitesRequests) {
                try {
                    this.loading = true;
                    yield this._invitesService
                        .createInvite(this.getInviteCreateObject(inviteRequest))
                        .pipe(first())
                        .toPromise();
                    yield this._invitesRequestsService
                        .updateInviteRequest(inviteRequest.id, {
                        isInvited: true,
                        invitedDate: new Date(),
                    })
                        .pipe(first())
                        .toPromise();
                    this.loading = false;
                    succesInvite++;
                }
                catch (error) {
                    this.loading = false;
                    const errorMessage = `Something went wrong!`;
                    this._notifyService.error(errorMessage);
                }
            }
            const message = `${succesInvite} success invites`;
            this._notifyService.success(message);
            this.sourceSmartTable.refresh();
            this.selectInvitesRequestsTmp({ selected: [] });
        });
    }
    deleteSelectedRows() {
        return __awaiter(this, void 0, void 0, function* () {
            const idsForDelete = this.selectedInvitesRequests.map((c) => c.id);
            try {
                this.loading = true;
                yield this._invitesRequestsService
                    .removeByIds(idsForDelete)
                    .pipe(first())
                    .toPromise();
                this.loading = false;
                const message = `${idsForDelete.length} invites requests was deleted`;
                this._notifyService.success(message);
                this.selectedInvitesRequests = [];
            }
            catch (error) {
                this.loading = false;
                const message = `Something went wrong!`;
                this._notifyService.error(message);
            }
        });
    }
    _loadSettingsSmartTable() {
        const columnTitlePrefix = 'CUSTOMERS_VIEW.SMART_TABLE_COLUMNS.';
        const getTranslate = (name) => this._translateService.get(columnTitlePrefix + name);
        forkJoin(getTranslate('COUNTRY'), getTranslate('CITY'), getTranslate('STREET_ADDRESS'), getTranslate('HOUSE'), getTranslate('APARTMENT'), getTranslate('INVITE_CODE'), getTranslate('INVITED_DATE'), getTranslate('STATUS'))
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(([country, city, streetAddress, house, apartment, inviteCode, invitedDate, status,]) => {
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
                    invitedDate: {
                        title: invitedDate,
                        editable: false,
                        addable: false,
                        type: 'custom',
                        renderComponent: InvitedDateComponent,
                    },
                    status: {
                        title: status,
                        class: 'text-center',
                        filter: false,
                        editable: false,
                        addable: false,
                        type: 'custom',
                        renderComponent: StatusComponent,
                    },
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
            let invitesRequests = [];
            if (this.$invitesRequests) {
                yield this.$invitesRequests.unsubscribe();
            }
            const loadData = () => __awaiter(this, void 0, void 0, function* () {
                const invitesRequestsVM = invitesRequests.map((inviteRequest) => {
                    return {
                        country: getCountryName(inviteRequest.geoLocation.countryId) ||
                            this.noInfoSign,
                        city: inviteRequest.geoLocation.city || this.noInfoSign,
                        address: inviteRequest.geoLocation.streetAddress ||
                            this.noInfoSign,
                        house: inviteRequest.geoLocation.house || this.noInfoSign,
                        apartment: inviteRequest.apartment.trim() || this.noInfoSign,
                        id: inviteRequest.id,
                        geoLocation: inviteRequest.geoLocation,
                        invitedDate: inviteRequest.invitedDate &&
                            new Date(inviteRequest.invitedDate).toLocaleDateString() +
                                '\n' +
                                new Date(inviteRequest.invitedDate).toLocaleTimeString(),
                        isInvited: inviteRequest.isInvited,
                        inviteRequest,
                    };
                });
                yield this.loadDataCount();
                const invitesRequestsData = new Array(this.dataCount);
                invitesRequestsData.splice(perPage * (page - 1), perPage, ...invitesRequestsVM);
                yield this.sourceSmartTable.load(invitesRequestsData);
            });
            this.loading = true;
            this.$invitesRequests = this._invitesRequestsService
                .getInvitesRequests({
                skip: perPage * (page - 1),
                limit: perPage,
            }, !this.notInvitedOnly)
                .pipe(takeUntil(this.ngDestroy$))
                .subscribe((i) => __awaiter(this, void 0, void 0, function* () {
                invitesRequests = i;
                yield loadData();
                this.loading = false;
            }));
        });
    }
    inviteRequestCreateObject(data) {
        this.inviteRequestValidation(data);
        data.apartment = data.apartment || ' ';
        return data;
    }
    inviteRequestValidation(data) {
        if (!data.address || !data.city || !data.country || !data.house) {
            throw new Error('Validation error');
        }
    }
    getInviteCreateObject(data) {
        data.apartment =
            data.apartment !== this.noInfoSign ? data.apartment : ' ';
        const geoLocation = {
            countryId: Object.values(countries).indexOf(data.country),
            city: data.city,
            streetAddress: data.address,
            house: data.house,
            loc: {
                coordinates: data.geoLocation.loc.coordinates,
                type: 'Point',
            },
        };
        const invite = {
            apartment: data.apartment,
            geoLocation,
        };
        return invite;
    }
    smartTableChange() {
        return __awaiter(this, void 0, void 0, function* () {
            this.sourceSmartTable
                .onChanged()
                .pipe(takeUntil(this.ngDestroy$))
                .subscribe((event) => __awaiter(this, void 0, void 0, function* () {
                if (event.action === 'page') {
                    const page = event.paging.page;
                    this.currentPage = page;
                    this._loadDataSmartTable(page);
                }
            }));
        });
    }
    loadDataCount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dataCount = yield this._invitesRequestsService.getCountOfInvitesRequests(!this.notInvitedOnly);
        });
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
};
InvitesRequestsComponent = __decorate([
    Component({
        selector: 'ea-invites-requests',
        styleUrls: ['invites-requests.component.scss'],
        templateUrl: 'invites-requests.component.html',
    }),
    __metadata("design:paramtypes", [InvitesRequestsService,
        InvitesService,
        ElementRef,
        Renderer2,
        TranslateService,
        NotifyService,
        NgbModal])
], InvitesRequestsComponent);
export { InvitesRequestsComponent };
//# sourceMappingURL=invites-requests.component.js.map