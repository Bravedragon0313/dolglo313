var CustomersComponent_1;
import { __awaiter, __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { UsersService } from '../../@core/data/users.service';
import { OrdersService } from '../../@core/data/orders.service';
import { UserMutationComponent } from '../../@shared/user/user-mutation';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/Rx';
import { takeUntil, first } from 'rxjs/operators';
import { getCountryName } from '@modules/server.common/entities/GeoLocation';
import { CountryRenderComponent } from './+invites/country-render/country-render.component';
import { RedirectNameComponent } from '../../@shared/render-component/name-redirect/name-redirect.component';
import { CustomerImageComponent } from '../../@shared/render-component/customer-table/customer-table/customer-image.component';
import { NotifyService } from '../../@core/services/notify/notify.service';
import { CustomerOrdersNumberComponent } from '../../@shared/render-component/customer-table/customer-orders-number/customer-orders-number.component';
import { CustomerEmailComponent } from '../../@shared/render-component/customer-email/customer-email.component';
import { CustomerPhoneComponent } from '../../@shared/render-component/customer-phone/customer-phone.component';
import { BanConfirmComponent } from '@app/@shared/user/ban-confirm';
const perPage = 7;
let CustomersComponent = CustomersComponent_1 = class CustomersComponent {
    constructor(_router, _ordersService, _usersService, _modalService, _translateService, _notifyService) {
        this._router = _router;
        this._ordersService = _ordersService;
        this._usersService = _usersService;
        this._modalService = _modalService;
        this._translateService = _translateService;
        this._notifyService = _notifyService;
        this.ngDestroy$ = new Subject();
        this.showBanLoading = false;
        this.customers = [];
        this.orders = [];
        this.sourceSmartTable = new LocalDataSource();
        this._selectedCustomers = [];
        this._loadSettingsSmartTable();
    }
    get hasSelectedCustomers() {
        return this._selectedCustomers.length > 0;
    }
    ngAfterViewInit() {
        this._addCustomHTMLElements();
        this._applyTranslationOnSmartTable();
        this.smartTableChange();
        this._loadDataSmartTable();
    }
    selectUser(ev) {
        const userId = ev.data.id;
        this._router.navigate(['/customers/list' + userId]);
    }
    showCreateUserModal() {
        this._modalService.open(UserMutationComponent, {
            size: 'lg',
            container: 'nb-layout',
            windowClass: 'ng-custom',
            backdrop: 'static',
        });
    }
    selectCustomerTmp(ev) {
        this._selectedCustomers = ev.selected;
    }
    deleteSelectedRows() {
        const idsForDelete = this._selectedCustomers.map((w) => w.id);
        try {
            this.loading = true;
            this._usersService
                .removeByIds(idsForDelete)
                .pipe(first())
                .toPromise();
            this._selectedCustomers = [];
            this.loading = false;
            const message = `Users was removed`;
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
    }
    banSelectedRows() {
        if (this.isUserBanned) {
            this.showUnbanPopup();
        }
        else {
            this.showBanPopup();
        }
    }
    showUnbanPopup() {
        const modal = this._modalService.open(BanConfirmComponent, {
            size: 'lg',
            container: 'nb-layout',
            windowClass: 'ng-custom',
            backdrop: 'static',
        });
        modal.componentInstance.user = this._selectedCustomers[0];
        modal.result
            .then((user) => __awaiter(this, void 0, void 0, function* () {
            this.showBanLoading = true;
            yield this._usersService.unbanUser(user.id);
            this._loadDataSmartTable();
            this.showBanLoading = false;
            this._notifyService.success(`${user.name} is unbanned!`);
        }))
            .catch((_) => { });
    }
    showBanPopup() {
        const modal = this._modalService.open(BanConfirmComponent, {
            size: 'lg',
            container: 'nb-layout',
            windowClass: 'ng-custom',
            backdrop: 'static',
        });
        modal.componentInstance.user = this._selectedCustomers[0];
        modal.result
            .then((user) => __awaiter(this, void 0, void 0, function* () {
            this.showBanLoading = true;
            yield this._usersService.banUser(user.id);
            this._loadDataSmartTable();
            this.showBanLoading = false;
            this._notifyService.success(`${user.name} is banned!`);
        }))
            .catch((_) => { });
    }
    _loadSettingsSmartTable() {
        const columnTitlePrefix = 'CUSTOMERS_VIEW.SMART_TABLE_COLUMNS.';
        const getTranslate = (name) => this._translateService.get(columnTitlePrefix + name);
        forkJoin(this._translateService.get('Id'), getTranslate('IMAGE'), getTranslate('NAME'), getTranslate('EMAIL'), getTranslate('PHONE'), getTranslate('COUNTRY'), getTranslate('CITY'), getTranslate('ADDRESS'), getTranslate('ORDERS_QTY')).subscribe(([id, image, name, email, phone, country, city, address, ordersQty,]) => {
            this.settingsSmartTable = {
                actions: false,
                selectMode: 'multi',
                columns: {
                    images: {
                        title: image,
                        class: 'customer-image',
                        type: 'custom',
                        renderComponent: CustomerImageComponent,
                        onComponentInitFunction: (instance) => {
                            instance.redirectPage = 'customers/list';
                        },
                        filter: false,
                    },
                    name: {
                        title: name,
                        type: 'custom',
                        renderComponent: RedirectNameComponent,
                        onComponentInitFunction: (instance) => {
                            instance.redirectPage = 'customers/list';
                        },
                    },
                    email: {
                        title: email,
                        type: 'custom',
                        renderComponent: CustomerEmailComponent,
                    },
                    phone: {
                        title: phone,
                        type: 'custom',
                        renderComponent: CustomerPhoneComponent,
                    },
                    country: {
                        title: country,
                        editor: {
                            type: 'custom',
                            component: CountryRenderComponent,
                        },
                    },
                    city: { title: city },
                    address: { title: address },
                    ordersQty: {
                        title: ordersQty,
                        type: 'custom',
                        renderComponent: CustomerOrdersNumberComponent,
                        filter: false,
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
            if (this.$users) {
                yield this.$users.unsubscribe();
            }
            let users = [];
            const loadData = () => __awaiter(this, void 0, void 0, function* () {
                const usersOrders = yield this._ordersService.getUsersOrdersCountInfo(users.map((u) => u.id));
                let usersVM = users.map((user) => {
                    const userOrders = usersOrders.find((res) => res['id'] === user.id);
                    return {
                        id: user.id,
                        image: user.image || CustomersComponent_1.noInfoSign,
                        name: user.firstName && user.lastName
                            ? `${user.firstName} ${user.lastName}`
                            : user.firstName
                                ? user.firstName
                                : user.lastName
                                    ? user.lastName
                                    : user.id,
                        email: user.email || CustomersComponent_1.noInfoSign,
                        phone: user.phone || CustomersComponent_1.noInfoSign,
                        country: getCountryName(user.geoLocation.countryId).trim() ||
                            CustomersComponent_1.noInfoSign,
                        city: user.geoLocation.city || CustomersComponent_1.noInfoSign,
                        address: `st. ${user.geoLocation.streetAddress ||
                            CustomersComponent_1.noInfoSign}, hse. № ${user.geoLocation.house || CustomersComponent_1.noInfoSign}`,
                        ordersQty: userOrders ? userOrders.ordersCount : 0,
                        isBanned: user.isBanned,
                    };
                });
                yield this.loadDataCount();
                if (this.showOnlyBanned) {
                    usersVM = usersVM.filter((user) => user.isBanned);
                }
                const usersData = new Array(this.dataCount);
                usersData.splice(perPage * (page - 1), perPage, ...usersVM);
                yield this.sourceSmartTable.load(usersData);
            });
            this.$users = this._usersService
                .getUsers({
                skip: perPage * (page - 1),
                limit: perPage,
            })
                .pipe(takeUntil(this.ngDestroy$))
                .subscribe((u) => __awaiter(this, void 0, void 0, function* () {
                users = u;
                yield loadData();
            }));
        });
    }
    _applyTranslationOnSmartTable() {
        this._translateService.onLangChange
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(() => {
            this._loadSettingsSmartTable();
        });
    }
    _addCustomHTMLElements() {
        document.querySelector('tr.ng2-smart-filters > th:nth-child(1)').innerHTML = '<i class="fa fa-search" style="font-size: 1.3em"/>';
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
            this.dataCount = yield this._usersService.getCountOfUsers();
        });
    }
    get isOnlyOneCustomerSelected() {
        return this._selectedCustomers.length === 1;
    }
    get isUserBanned() {
        return (this._selectedCustomers[0] && this._selectedCustomers[0].isBanned);
    }
    set showOnlyBanned(v) {
        this._showOnlyBanned = v;
        this._loadDataSmartTable();
    }
    get showOnlyBanned() {
        return this._showOnlyBanned;
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
};
CustomersComponent.noInfoSign = '';
CustomersComponent = CustomersComponent_1 = __decorate([
    Component({
        selector: 'ea-customers',
        templateUrl: './customers.component.html',
        styleUrls: ['/customers.component.scss'],
    }),
    __metadata("design:paramtypes", [Router,
        OrdersService,
        UsersService,
        NgbModal,
        TranslateService,
        NotifyService])
], CustomersComponent);
export { CustomersComponent };
//# sourceMappingURL=customers.component.js.map