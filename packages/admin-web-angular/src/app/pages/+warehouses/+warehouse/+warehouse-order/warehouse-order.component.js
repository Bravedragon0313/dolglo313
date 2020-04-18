import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild, EventEmitter, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { WizardComponent } from 'angular2-wizard';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UsersService } from '../../../../@core/data/users.service';
import { WarehouseOrdersService } from '../../../../@core/data/warehouseOrders.service';
import { WarehouseOrderCreateUserComponent } from './create-user/warehouse-order-create-user.component';
import { WarehouseOrderModalComponent } from '../../../../@shared/warehouse/+warehouse-order-modal/warehouse-order-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/finally';
const perPage = 5;
let WarehouseOrderComponent = class WarehouseOrderComponent {
    constructor(activeModal, _activatedRoute, _toasterService, _translateService, _usersService, _warehouseOrdersService) {
        this.activeModal = activeModal;
        this._activatedRoute = _activatedRoute;
        this._toasterService = _toasterService;
        this._translateService = _translateService;
        this._usersService = _usersService;
        this._warehouseOrdersService = _warehouseOrdersService;
        this.titleSelectAdd = this._translate(this.TRANSLATE_PREFIXES.STEP2.TITLE.SELECT_ADD);
        this.showNextButton = false;
        this.isOrderAllowed = false;
        this.sourceSmartTable = new LocalDataSource();
        this.createUserEmitter = new EventEmitter();
        this.orderFinishedEmitter = new EventEmitter();
        this._dataIsLoaded = false;
        this._noInfoSign = '';
        this._ngDestroy$ = new Subject();
    }
    get TRANSLATE_PREFIXES() {
        const wizardFormPrefix = 'WAREHOUSE_VIEW.CREATE_ORDER_MODAL.WIZARD_FORM';
        const step1Prefix = 'STEP1';
        const step2Prefix = 'STEP2';
        const step3Prefix = 'STEP3';
        return {
            BUTTON_NEXT: `${wizardFormPrefix}.BUTTON_NEXT`,
            BUTTON_PREV: `${wizardFormPrefix}.BUTTON_PREV`,
            BUTTON_DONE: `${wizardFormPrefix}.BUTTON_DONE`,
            STEP1: {
                TITLE: `${wizardFormPrefix}.${step1Prefix}.TITLE`,
                SELECT_FROM_EXISTING: `${wizardFormPrefix}.${step1Prefix}.SELECT_FROM_EXISTING`,
                ADD_NEW_CUSTOMER: `${wizardFormPrefix}.${step1Prefix}.ADD_NEW_CUSTOMER`,
            },
            STEP2: {
                TITLE: {
                    SELECT_ADD: `${wizardFormPrefix}.${step2Prefix}.TITLE.SELECT_ADD`,
                    SELECT_CUSTOMER: `${wizardFormPrefix}.${step2Prefix}.TITLE.SELECT_CUSTOMER`,
                    ADD_NEW: `${wizardFormPrefix}.${step2Prefix}.TITLE.ADD_NEW`,
                },
                SMART_TABLE: {
                    TITLES: {
                        FULL_NAME: `${wizardFormPrefix}.${step2Prefix}.SMART_TABLE.TITLES.FULL_NAME`,
                        EMAIL: `${wizardFormPrefix}.${step2Prefix}.SMART_TABLE.TITLES.EMAIL`,
                        PHONE: `${wizardFormPrefix}.${step2Prefix}.SMART_TABLE.TITLES.PHONE`,
                        ADDRESS: `${wizardFormPrefix}.${step2Prefix}.SMART_TABLE.TITLES.ADDRESS`,
                    },
                },
            },
            STEP3: {
                TITLE: `${wizardFormPrefix}.${step3Prefix}.TITLE`,
            },
        };
    }
    get isCreateOrderWizardAllowed() {
        return (this.isSelectedFromExisting ||
            (this._warehouseOrderCreateUser !== undefined &&
                this._warehouseOrderCreateUser.form.valid));
    }
    get buttonDone() {
        return this._translate(this.TRANSLATE_PREFIXES.BUTTON_DONE);
    }
    get buttonNext() {
        return this._translate(this.TRANSLATE_PREFIXES.BUTTON_NEXT);
    }
    get buttonPrevious() {
        return this._translate(this.TRANSLATE_PREFIXES.BUTTON_PREV);
    }
    get _isAllowedToCreateCustomer() {
        return !this.isSelectedFromExisting;
    }
    ngOnInit() {
        this._listenStepWizard();
        this._getWarehouseIdFromRoute();
        this.smartTableChange();
    }
    onIsOrderAllowed(orderAllowed) {
        this.isOrderAllowed = orderAllowed;
    }
    onMakeOrder(orderProducts) {
        this.loading = true;
        this._warehouseOrdersService
            .createOrder({
            userId: this._userIdToOrder,
            warehouseId: this.warehouseId,
            products: orderProducts,
        })
            .pipe(takeUntil(this._ngDestroy$))
            .finally(() => this.orderFinishedEmitter.emit())
            .subscribe(() => {
            this.loading = false;
            this._toasterService.pop(`success`, `User ${this.userSelected.name} finish the order`);
        }, () => {
            this.loading = false;
            this._toasterService.pop('error', 'Something is wrong, unable to place order');
        });
    }
    onNewUser(userData) {
        userData.name =
            (userData.firstName ? userData.firstName : '') +
                ' ' +
                (userData.lastName ? userData.lastName : '');
        this.userSelected = userData;
        this._userIdToOrder = userData.id;
    }
    onNextStep() {
        this._wizardForm.next();
    }
    selectExistingCustomer() {
        this.titleSelectAdd = this._translate(this.TRANSLATE_PREFIXES.STEP2.TITLE.SELECT_CUSTOMER);
        this.isSelectedFromExisting = true;
        this.showNextButton = false;
        this._loadAndSetupData();
        this.onNextStep();
    }
    addNewCustomer() {
        this.titleSelectAdd = this._translate(this.TRANSLATE_PREFIXES.STEP2.TITLE.ADD_NEW);
        this.isSelectedFromExisting = false;
        this.showNextButton = true;
        this.onNextStep();
    }
    selectFromExisting(ev) {
        this.userSelected = ev.data;
        this._userIdToOrder = ev.data.id;
        this._wizardForm.next();
    }
    completeOrder() {
        this._warehouseOrderModal.makeOrder();
    }
    cancel() {
        this.activeModal.dismiss('canceled');
    }
    _translate(key) {
        let translationResult = '';
        this._translateService.get(key).subscribe((res) => {
            translationResult = res;
        });
        return translationResult;
    }
    _loadAndSetupData() {
        if (!this._dataIsLoaded) {
            this._setupSmartTableSettings();
            this._loadDataSmartTable();
            this._dataIsLoaded = true;
        }
    }
    _listenStepWizard() {
        this._wizardForm.onStepChanged
            .pipe(takeUntil(this._ngDestroy$))
            .subscribe((wizardStep) => {
            const currentStepIndex = this._wizardForm.activeStepIndex;
            if (currentStepIndex === 0) {
                this.titleSelectAdd = this._translate(this.TRANSLATE_PREFIXES.STEP2.TITLE.SELECT_ADD);
            }
            if (currentStepIndex === 2 && this._isAllowedToCreateCustomer) {
                this.createUserEmitter.emit();
            }
        });
    }
    _setupSmartTableSettings() {
        const fullName = this._translate(this.TRANSLATE_PREFIXES.STEP2.SMART_TABLE.TITLES.FULL_NAME);
        const email = this._translate(this.TRANSLATE_PREFIXES.STEP2.SMART_TABLE.TITLES.EMAIL);
        const phone = this._translate(this.TRANSLATE_PREFIXES.STEP2.SMART_TABLE.TITLES.PHONE);
        const address = this._translate(this.TRANSLATE_PREFIXES.STEP2.SMART_TABLE.TITLES.ADDRESS);
        this.settingsSmartTable = {
            actions: false,
            columns: {
                name: { title: fullName },
                email: { title: email },
                phone: { title: phone },
                address: { title: address },
            },
            pager: {
                display: true,
                perPage,
            },
        };
    }
    _loadDataSmartTable(page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.$users) {
                yield this.$users.unsubscribe();
            }
            this.$users = this._usersService
                .getUsers({
                skip: perPage * (page - 1),
                limit: perPage,
            })
                .pipe(takeUntil(this._ngDestroy$))
                .subscribe((users) => __awaiter(this, void 0, void 0, function* () {
                yield this.loadDataCount();
                const formattedData = this._setupDataForSmartTable(users);
                const usersData = new Array(this.dataCount);
                usersData.splice(perPage * (page - 1), perPage, ...formattedData);
                yield this.sourceSmartTable.load(usersData);
            }));
        });
    }
    _setupDataForSmartTable(users) {
        return users.map((user) => {
            return {
                id: user.id,
                name: `
					${user.firstName || this._noInfoSign} ${user.lastName || this._noInfoSign}
				`,
                email: user.email || this._noInfoSign,
                phone: user.phone || this._noInfoSign,
                address: user.fullAddress || this._noInfoSign,
            };
        });
    }
    _getWarehouseIdFromRoute() {
        this._activatedRoute.children[0].children[0].children[0].children[0].params
            .pipe(takeUntil(this._ngDestroy$))
            .subscribe((params) => {
            this.warehouseId = params.id;
        });
    }
    smartTableChange() {
        return __awaiter(this, void 0, void 0, function* () {
            this.sourceSmartTable
                .onChanged()
                .pipe(takeUntil(this._ngDestroy$))
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
    ngOnDestroy() {
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
    }
};
__decorate([
    ViewChild('wizardForm', { static: true }),
    __metadata("design:type", WizardComponent)
], WarehouseOrderComponent.prototype, "_wizardForm", void 0);
__decorate([
    ViewChild('wizardFormStepTwo'),
    __metadata("design:type", WizardComponent)
], WarehouseOrderComponent.prototype, "wizardFormStepTwo", void 0);
__decorate([
    ViewChild('warehouseOrderCreateUser'),
    __metadata("design:type", WarehouseOrderCreateUserComponent)
], WarehouseOrderComponent.prototype, "_warehouseOrderCreateUser", void 0);
__decorate([
    ViewChild('warehouseOrderModal'),
    __metadata("design:type", WarehouseOrderModalComponent)
], WarehouseOrderComponent.prototype, "_warehouseOrderModal", void 0);
WarehouseOrderComponent = __decorate([
    Component({
        styleUrls: ['./warehouse-order.component.scss'],
        templateUrl: './warehouse-order.component.html',
    }),
    __metadata("design:paramtypes", [NgbActiveModal,
        ActivatedRoute,
        ToasterService,
        TranslateService,
        UsersService,
        WarehouseOrdersService])
], WarehouseOrderComponent);
export { WarehouseOrderComponent };
//# sourceMappingURL=warehouse-order.component.js.map