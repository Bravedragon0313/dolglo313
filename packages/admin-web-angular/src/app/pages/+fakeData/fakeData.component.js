import { __awaiter, __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { InviteRouter } from '@modules/client.common.angular2/routers/invite-router.service';
import { CarrierRouter } from '@modules/client.common.angular2/routers/carrier-router.service';
import { UserRouter } from '@modules/client.common.angular2/routers/user-router.service';
import { ProductRouter } from '@modules/client.common.angular2/routers/product-router.service';
import { WarehouseRouter } from '@modules/client.common.angular2/routers/warehouse-router.service';
import { WarehouseProductsRouter } from '@modules/client.common.angular2/routers/warehouse-products-router.service';
import { WarehouseOrdersRouter } from '@modules/client.common.angular2/routers/warehouse-orders-router.service';
import { OrderRouter } from '@modules/client.common.angular2/routers/order-router.service';
import { FakeDataBtnState } from '../../models/FakeDataBtnState';
import FakeDataCarriers from '../../@core/data/fakeDataServices/carriers';
import FakeDataInvites from '../../@core/data/fakeDataServices/invites';
import FakeDataProducts from '../../@core/data/fakeDataServices/products';
import FakeDataWarehouses from '../../@core/data/fakeDataServices/warehouses';
import FakeDataWarehousesProducts from '../../@core/data/fakeDataServices/warehousesProducts';
import FakeDataUsers from '../../@core/data/fakeDataServices/users';
import { UserAuthRouter } from '@modules/client.common.angular2/routers/user-auth-router.service';
import { CarriersService } from '../../@core/data/carriers.service';
import { Subject } from 'rxjs';
import { ToasterService } from 'angular2-toaster';
import { first, takeUntil } from 'rxjs/operators';
import { WarehousesService } from '../../@core/data/warehouses.service';
import { DataService } from '../../@core/data/data.service';
import { ProductsCategoryService } from '../../@core/data/productsCategory.service';
import FakeDataProductsCategories from '../../@core/data/fakeDataServices/productsCategories';
import { NotifyService } from '@app/@core/services/notify/notify.service';
import { OrdersService } from '@app/@core/data/orders.service';
import { InvitesService } from '@app/@core/data/invites.service';
import { InvitesRequestsService } from '@app/@core/data/invites-requests.service';
import { UsersService } from '@app/@core/data/users.service';
import { environment } from 'environments/environment';
import _ from 'lodash';
import { CurrenciesService } from '@app/@core/data/currencies.service';
const NEED_DEFAULT_SETTINGS_MESSAGE = "Can't generate fake data without DEFAULT_LONGITUDE and DEFAULT_LATITUDE";
const lng = environment['DEFAULT_LONGITUDE'];
const lat = environment['DEFAULT_LATITUDE'];
let FakeDataComponent = class FakeDataComponent {
    constructor(fakeDataWarehousesProducts, fakeDataWarehouses, fakeDataInvites, fakeDataUsers, fakeDataCarriers, _fakeDataProductsCategories, carrierRouter, userRouter, userAuthRouter, fakeDataProducts, productRouter, warehouseRouter, toasterService, inviteRouter, warehouseProductsRouter, warehouseOrdersRouter, orderRouter, _carriersService, _warehousesService, _dataService, _productsCategoriesService, _ordersService, _invitesService, _inviteRequestsService, _notifyService, _usersService, _currenciesService) {
        this.fakeDataWarehousesProducts = fakeDataWarehousesProducts;
        this.fakeDataWarehouses = fakeDataWarehouses;
        this.fakeDataInvites = fakeDataInvites;
        this.fakeDataUsers = fakeDataUsers;
        this.fakeDataCarriers = fakeDataCarriers;
        this._fakeDataProductsCategories = _fakeDataProductsCategories;
        this.carrierRouter = carrierRouter;
        this.userRouter = userRouter;
        this.userAuthRouter = userAuthRouter;
        this.fakeDataProducts = fakeDataProducts;
        this.productRouter = productRouter;
        this.warehouseRouter = warehouseRouter;
        this.toasterService = toasterService;
        this.inviteRouter = inviteRouter;
        this.warehouseProductsRouter = warehouseProductsRouter;
        this.warehouseOrdersRouter = warehouseOrdersRouter;
        this.orderRouter = orderRouter;
        this._carriersService = _carriersService;
        this._warehousesService = _warehousesService;
        this._dataService = _dataService;
        this._productsCategoriesService = _productsCategoriesService;
        this._ordersService = _ordersService;
        this._invitesService = _invitesService;
        this._inviteRequestsService = _inviteRequestsService;
        this._notifyService = _notifyService;
        this._usersService = _usersService;
        this._currenciesService = _currenciesService;
        this.invite = null;
        this.includeHardcodedData = true;
        this._existingWarehouses = [];
        this._ngDestroy$ = new Subject();
        this._hardcodedCarrierIds = [];
        this._productCategories = [];
        this._hardcodedWarehouses = [];
        this._setupButtonStatuses();
        this._setupButtonLoading();
    }
    ngOnInit() {
        this._listenForExistingWarehouses();
    }
    get _hasProducts() {
        return (this.peperoniAndMushroomPizzaProduct &&
            this.sushiAndCaviarMixProduct &&
            this.sushiMixProduct &&
            this.pastaProduct &&
            this.sushiBoxProduct &&
            this.peperoniAndTomatoPizzaProduct);
    }
    get _notify() {
        const showMessage = (message) => this._notifyService.success(message);
        const errror = (message) => this._notifyService.error(message);
        return {
            invite: (id) => showMessage(`Invite with id "${id}" created successfully`),
            user: (id) => showMessage(`User with id "${id}" created successfully`),
            carrier: (id) => showMessage(`Carrier with id "${id}" created successfully`),
            product: (id) => showMessage(`Product with id "${id}" created successfully`),
            warehouse: (id) => showMessage(`Warehouse with id "${id}" created successfully`),
            warehouseAddProducts: (id) => showMessage(`Warehouse with id "${id}" added products successfully`),
            geoLocation: (id) => showMessage(`Warehouse with id "${id}" update geo location`),
            order: (id) => showMessage(`Order with id "${id}" created successfully`),
            confirmOrder: (id) => showMessage(`Order with id "${id}" confirmed`),
            clearAll: () => showMessage('All data was removed from database'),
            generateRandomOrdersPerStore: (storeId, ordersCount) => showMessage(`Store with id "${storeId}" has new ${ordersCount} orders.`),
            errorGenerate: (msg) => errror(msg),
        };
    }
    callAll() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBtnDisabled.all = true;
            this.loading.all = true;
            if (!this.includeHardcodedData) {
                yield this._generateCurrencies();
            }
            yield this.createInvite1();
            yield this.createInvite2();
            yield this.createInvite3();
            yield this.createInvite4();
            yield this._generate1000InvitesConnectedToInviteRequests();
            yield this._generate1000InviteRequests();
            yield this.createUser();
            yield this.createCarrier1();
            yield this.createCarrier2();
            yield this.createCarrier3();
            yield this._generateProducts();
            yield this.createWarehouse1();
            yield this.createWarehouse2();
            yield this.createWarehouse3();
            yield this.createWarehouse1Products();
            yield this.createWarehouse2Products();
            yield this.createWarehouse3Products();
            yield this.updateWarehouse1GeoLocation();
            yield this.createOrder1();
            yield this.createOrder2();
            yield this.confirmOrder1();
            yield this.confirmOrder2();
            yield this._generate1000Customers();
            if (this.includeHardcodedData === true) {
                yield this.generateHardcoded();
            }
            yield this.generate100CustomersStoresCarriers();
            yield this._generageRangeCustomers(300);
            yield this.generateRandomOrdersPerStore();
            yield this._generate1000Customers();
            if (this.includeHardcodedData === false) {
                yield this._generateRandomOrdersPerCarrier();
            }
            this.isBtnDisabled.all = false;
            this.loading.all = false;
        });
    }
    generate100CustomersStoresCarriers() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._generateCustomerEntities();
        });
    }
    generateHardcoded() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loading.hardcoded = true;
            this.isBtnDisabled.hardcoded = true;
            yield this._generateCurrencies();
            yield this._createHardcodedInvites();
            yield this._createHardcodedWarehouses();
            yield this._generateProducts();
            yield this._createWarehouseProductsForHardcodedWarehouses();
            yield this._createHardcodedCarriers();
            yield this._generateRandomOrdersPerCarrier();
            this.loading.hardcoded = false;
            this.isBtnDisabled.hardcoded = false;
        });
    }
    clearAll() {
        return __awaiter(this, void 0, void 0, function* () {
            if (window.confirm('Are you sure?')) {
                this.isBtnDisabled.clearAll = true;
                this.loading.clearAll = true;
                yield this._dataService.clearAll();
                this.isBtnDisabled.clearAll = false;
                this.loading.clearAll = false;
                this._notify.clearAll();
            }
        });
    }
    createInvite1() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loading.invite1 = true;
            this.isBtnDisabled.invite1 = true;
            yield this._createInvite();
            this.loading.invite1 = false;
            this.isBtnDisabled.invite1 = false;
        });
    }
    createInvite2() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loading.invite2 = true;
            this.isBtnDisabled.invite2 = true;
            yield this._createInvite();
            this.loading.invite2 = false;
            this.isBtnDisabled.invite2 = false;
        });
    }
    createInvite3() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loading.invite3 = true;
            this.isBtnDisabled.invite3 = true;
            yield this._createInvite();
            this.loading.invite3 = false;
            this.isBtnDisabled.invite3 = false;
        });
    }
    createInvite4() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loading.invite4 = true;
            this.isBtnDisabled.invite4 = true;
            yield this._createInvite();
            this.loading.invite4 = false;
            this.isBtnDisabled.invite4 = false;
        });
    }
    generate100Customers() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loading.users100 = true;
            this.isBtnDisabled.users100 = true;
            let userNumber = 1;
            const create = () => __awaiter(this, void 0, void 0, function* () {
                const userRegisterInput = this.fakeDataUsers.getUserRegistrationInput();
                const user = yield this.userAuthRouter.register(userRegisterInput);
                this._notify.user(user.id);
                if (userNumber <= 100) {
                    userNumber += 1;
                    yield create();
                }
            });
            yield create();
            this.loading.users100 = false;
            this.isBtnDisabled.users100 = false;
        });
    }
    createUser() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBtnDisabled.user = true;
            this.loading.user = true;
            if (this.invite === null) {
                yield this._createInvite();
            }
            this.user = yield this.userAuthRouter.register({
                user: {
                    geoLocation: this.invite.geoLocation,
                    apartment: this.invite.apartment,
                },
            });
            this.isBtnDisabled.user = false;
            this.loading.user = false;
            this._notify.user(this.user.id);
        });
    }
    createCarrier1() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBtnDisabled.carrier1 = true;
            this.loading.carrier1 = true;
            yield this._createCarrier();
            this.loading.carrier1 = false;
            this.isBtnDisabled.carrier1 = false;
        });
    }
    createCarrier2() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loading.carrier2 = true;
            this.isBtnDisabled.carrier2 = true;
            yield this._createCarrier();
            this.loading.carrier2 = false;
            this.isBtnDisabled.carrier2 = false;
        });
    }
    createCarrier3() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loading.carrier3 = true;
            this.isBtnDisabled.carrier3 = true;
            yield this._createCarrier();
            this.loading.carrier3 = false;
            this.isBtnDisabled.carrier3 = false;
        });
    }
    generate100Carriers() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loading.carriers100 = true;
            this.isBtnDisabled.carriers100 = true;
            yield this._generate100Carriers();
            this.loading.carriers100 = false;
            this.isBtnDisabled.carriers100 = false;
        });
    }
    createPeperoniAndMushroomPizzaProduct(categories) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBtnDisabled.product1 = true;
            this.loading.product1 = true;
            const productCreateObject = yield this.fakeDataProducts.getPeperoniAndMushroomPizzaCreateObject(categories);
            this.peperoniAndMushroomPizzaProduct = yield this.productRouter.create(productCreateObject);
            this.isBtnDisabled.product1 = false;
            this.loading.product1 = false;
            this._notify.product(this.peperoniAndMushroomPizzaProduct.id);
        });
    }
    createSushiAndCaviarMixProduct(categories) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBtnDisabled.product2 = true;
            this.loading.product2 = true;
            const productCreateObject = yield this.fakeDataProducts.getSushiAndCaviarMixCreateObject(categories);
            this.sushiAndCaviarMixProduct = yield this.productRouter.create(productCreateObject);
            this.isBtnDisabled.product2 = false;
            this.loading.product2 = false;
            this._notify.product(this.sushiAndCaviarMixProduct.id);
        });
    }
    createSushiMixProduct(categories) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBtnDisabled.product3 = true;
            this.loading.product3 = true;
            const productCreateObject = yield this.fakeDataProducts.getSushiMixCreateObject(categories);
            this.sushiMixProduct = yield this.productRouter.create(productCreateObject);
            this.isBtnDisabled.product3 = false;
            this.loading.product3 = false;
            this._notify.product(this.sushiMixProduct.id);
        });
    }
    createPastaProduct(categories) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBtnDisabled.product4 = true;
            this.loading.product4 = true;
            const productCreateObject = yield this.fakeDataProducts.getPastaCreateObject(categories);
            this.pastaProduct = yield this.productRouter.create(productCreateObject);
            this.isBtnDisabled.product4 = false;
            this.loading.product4 = false;
            this._notify.product(this.pastaProduct.id);
        });
    }
    createSushiBoxProduct(categories) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBtnDisabled.product5 = true;
            this.loading.product5 = true;
            const productCreateObject = yield this.fakeDataProducts.getSushiBoxCreateObject(categories);
            this.sushiBoxProduct = yield this.productRouter.create(productCreateObject);
            this.isBtnDisabled.product5 = false;
            this.loading.product5 = false;
            this._notify.product(this.sushiBoxProduct.id);
        });
    }
    createPeperoniAndTomatoPizzaProduct(categories) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBtnDisabled.product6 = true;
            this.loading.product6 = true;
            const productCreateObject = yield this.fakeDataProducts.getPeperoniAndTomatoPizzaCreateObject(categories);
            this.peperoniAndTomatoPizzaProduct = yield this.productRouter.create(productCreateObject);
            this.isBtnDisabled.product6 = false;
            this.loading.product6 = false;
            this._notify.product(this.peperoniAndTomatoPizzaProduct.id);
        });
    }
    generate100Warehouses() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBtnDisabled.warehouse100 = true;
            this.loading.warehouse100 = true;
            let warehouseCount = 0;
            const create = () => __awaiter(this, void 0, void 0, function* () {
                const warehouseRegisterInput = this.fakeDataWarehouses.registrationInputs.generate();
                const warehouse = yield this.warehouseRouter.register(warehouseRegisterInput);
                this._notify.warehouse(warehouse.id);
                if (warehouseCount <= 100) {
                    warehouseCount += 1;
                    yield create();
                }
            });
            yield create();
            this.isBtnDisabled.warehouse100 = false;
            this.loading.warehouse100 = false;
        });
    }
    createWarehouse1() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBtnDisabled.warehouse1 = true;
            this.loading.warehouse1 = true;
            this.warehouse1 = yield this._createWarehouseWithCarrier();
            this.isBtnDisabled.warehouse1 = false;
            this.loading.warehouse1 = false;
        });
    }
    createWarehouse2() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBtnDisabled.warehouse2 = true;
            this.loading.warehouse2 = true;
            this.warehouse2 = yield this._createWarehouseWithCarrier();
            this.isBtnDisabled.warehouse2 = false;
            this.loading.warehouse2 = false;
        });
    }
    createWarehouse3() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBtnDisabled.warehouse3 = true;
            this.loading.warehouse3 = true;
            this.warehouse3 = yield this._createWarehouseWithCarrier();
            this.isBtnDisabled.warehouse3 = false;
            this.loading.warehouse3 = false;
        });
    }
    createWarehouse1Products() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBtnDisabled.warehouseProduct1 = true;
            this.loading.warehouseProduct1 = true;
            const products = [
                this.peperoniAndMushroomPizzaProduct,
                this.sushiAndCaviarMixProduct,
                this.sushiMixProduct,
                this.pastaProduct,
                this.sushiBoxProduct,
                this.peperoniAndTomatoPizzaProduct,
            ];
            yield this._createWarehouseProducts(this.warehouse1.id, products.map((p) => p.id));
            this.isBtnDisabled.warehouseProduct1 = false;
            this.loading.warehouseProduct1 = false;
        });
    }
    createWarehouse2Products() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBtnDisabled.warehouseProduct2 = true;
            this.loading.warehouseProduct2 = true;
            const products = [
                this.peperoniAndMushroomPizzaProduct,
                this.sushiAndCaviarMixProduct,
                this.sushiMixProduct,
            ];
            yield this._createWarehouseProducts(this.warehouse2.id, products.map((p) => p.id));
            this.isBtnDisabled.warehouseProduct2 = false;
            this.loading.warehouseProduct2 = false;
        });
    }
    createWarehouse3Products() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBtnDisabled.warehouseProduct3 = true;
            this.loading.warehouseProduct3 = true;
            this._createWarehouseProducts(this.warehouse3.id, [
                this.sushiBoxProduct.id,
            ]);
            this.isBtnDisabled.warehouseProduct3 = false;
            this.loading.warehouseProduct3 = false;
        });
    }
    updateWarehouse1GeoLocation() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBtnDisabled.warehouseGeoLocation = true;
            this.loading.warehouseGeoLocation = true;
            const newGeoLocation = this.fakeDataWarehouses.getNewGeoLocation1();
            yield this.warehouseRouter.updateGeoLocation(this.warehouse1.id, newGeoLocation);
            this.isBtnDisabled.warehouseGeoLocation = false;
            this.loading.warehouseGeoLocation = false;
            this._notify.geoLocation(this.warehouse1.id);
        });
    }
    createOrder1() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBtnDisabled.createOrder1 = true;
            this.loading.createOrder1 = true;
            this.order1 = yield this._createOrder(this.user.id, this.warehouse1.id, this.peperoniAndMushroomPizzaProduct.id);
            this.isBtnDisabled.createOrder1 = false;
            this.loading.createOrder1 = false;
        });
    }
    confirmOrder1() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBtnDisabled.confirmOrder1 = true;
            this.loading.confirmOrder1 = true;
            yield this.orderRouter.confirm(this.order1.id);
            this.isBtnDisabled.confirmOrder1 = false;
            this.loading.confirmOrder1 = false;
            this._notify.confirmOrder(this.order1.id);
        });
    }
    createOrder2() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBtnDisabled.createOrder2 = true;
            this.loading.createOrder2 = true;
            this.order2 = yield this._createOrder(this.user.id, this.warehouse1.id, this.sushiBoxProduct.id);
            this.isBtnDisabled.createOrder2 = false;
            this.loading.createOrder2 = false;
        });
    }
    confirmOrder2() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBtnDisabled.confirmOrder2 = true;
            this.loading.confirmOrder2 = true;
            yield this.orderRouter.confirm(this.order2.id);
            this.isBtnDisabled.confirmOrder2 = false;
            this.loading.confirmOrder2 = false;
            this._notify.confirmOrder(this.order2.id);
        });
    }
    generateRandomOrdersPerStore(ordersLimit = 1000) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBtnDisabled.create1000Orders = true;
            this.loading.create1000Orders = true;
            let stores = yield this._warehousesService
                .getAllStores()
                .toPromise();
            for (let store of stores) {
                let storeId = store.id;
                let storeCreatedAt = new Date(store._createdAt);
                const response = yield this._ordersService
                    .generateRandomOrdersCurrentStore(storeId, storeCreatedAt, ordersLimit)
                    .toPromise();
                if (response.error) {
                    this._notify.errorGenerate(response.message);
                }
                else {
                    this._notify.generateRandomOrdersPerStore(storeId, ordersLimit);
                }
            }
            this.isBtnDisabled.create1000Orders = false;
            this.loading.create1000Orders = false;
        });
    }
    _createOrder(userId, warehouseId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.warehouseOrdersRouter.createByProductType(userId, warehouseId, productId);
            this._notify.order(order.id);
            return order;
        });
    }
    _setupButtonLoading() {
        this.isBtnDisabled = new FakeDataBtnState();
    }
    _setupButtonStatuses() {
        this.loading = new FakeDataBtnState();
    }
    _generate1000Customers() {
        return __awaiter(this, void 0, void 0, function* () {
            if (lng && lat) {
                const response = yield this._usersService
                    .generate1000Customers(lng, lat)
                    .toPromise();
                if (!response.success) {
                    this._notify.errorGenerate(response.message);
                }
            }
            else {
                console.warn(NEED_DEFAULT_SETTINGS_MESSAGE);
            }
        });
    }
    _generate1000InviteRequests() {
        return __awaiter(this, void 0, void 0, function* () {
            if (lng && lat) {
                yield this._inviteRequestsService
                    .generate1000InviteRequests(lng, lat)
                    .toPromise();
            }
            else {
                console.warn(NEED_DEFAULT_SETTINGS_MESSAGE);
            }
        });
    }
    _generate1000InvitesConnectedToInviteRequests() {
        return __awaiter(this, void 0, void 0, function* () {
            if (lng && lat) {
                yield this._invitesService
                    .generate1000InvitesConnectedToInviteRequests(lng, lat)
                    .toPromise();
            }
            else {
                console.warn(NEED_DEFAULT_SETTINGS_MESSAGE);
            }
        });
    }
    _generateRandomOrdersPerCarrier() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._generateActiveAndAvailableOrdersPerCarrier();
            yield this._generatePastOrdersPerCarrier();
        });
    }
    _generateActiveAndAvailableOrdersPerCarrier() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._ordersService
                .generateActiveAndAvailableOrdersPerCarrier()
                .toPromise();
        });
    }
    _generatePastOrdersPerCarrier() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._ordersService.generatePastOrdersPerCarrier().toPromise();
        });
    }
    _generageRangeCustomers(count) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < count; i += 1) {
                yield this._createRandomUser();
            }
        });
    }
    _createHardcodedInvites() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const objKey of ['a', 'b', 'c', 'd']) {
                const objToCreate = this.fakeDataInvites.getHardcodedCreateObject[objKey];
                const createdObject = yield this.inviteRouter.create(objToCreate);
                this._notify.invite(createdObject.id);
            }
        });
    }
    _createInvite() {
        return __awaiter(this, void 0, void 0, function* () {
            const inviteCreateObject = this.fakeDataInvites.getCreateObject();
            this.invite = yield this.inviteRouter.create(inviteCreateObject);
            this._notify.invite(this.invite.id);
        });
    }
    _isUserEmailExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._usersService.isUserEmailExists(email);
        });
    }
    _createHardcodedCarriers() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const objKey of ['josh', 'tom', 'mike']) {
                const objToRegister = this.fakeDataCarriers.registrationInputs[objKey];
                if (yield this._isCarrierUsernameExists(objToRegister.carrier.username)) {
                    return;
                }
                const createdObject = yield this.carrierRouter.register(objToRegister);
                const carrierId = createdObject.id;
                this._hardcodedCarrierIds.push(carrierId);
                this._notify.carrier(carrierId);
            }
            yield this._generageRangeCustomers(15);
            yield this._addOrdersToTake();
            yield this._addTakenOrders();
        });
    }
    _addOrdersToTake() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._hardcodedCarrierIds.length > 0) {
                yield this._ordersService.addOrdersToTake().toPromise();
            }
        });
    }
    _addTakenOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._hardcodedCarrierIds.length > 0) {
                yield this._ordersService
                    .addTakenOrders(this._hardcodedCarrierIds)
                    .toPromise();
            }
        });
    }
    _createCarrier() {
        return __awaiter(this, void 0, void 0, function* () {
            const carrierRegisterInput = this.fakeDataCarriers.registrationInputs.generate();
            if (yield this._isCarrierUsernameExists(carrierRegisterInput.carrier.username)) {
                return this._createCarrier();
            }
            const carrier = yield this.carrierRouter.register(carrierRegisterInput);
            this._notify.carrier(carrier.id);
            return carrier;
        });
    }
    _generate100Carriers() {
        return __awaiter(this, void 0, void 0, function* () {
            const rawCarriers = [];
            const carriersUsernames = [];
            for (let i = 1; i <= 100; i += 1) {
                const carrierRegisterInput = this.fakeDataCarriers.registrationInputs.generate();
                const carrierUsername = carrierRegisterInput.carrier.username;
                if (!carriersUsernames.includes(carrierUsername)) {
                    carriersUsernames.push(carrierUsername);
                    rawCarriers.push(carrierRegisterInput);
                }
            }
            const carriers = [];
            for (const raw of rawCarriers) {
                const carrier = yield this.carrierRouter.register(raw);
                carriers.push(carrier);
                this._notify.carrier(carrier.id);
            }
            return carriers;
        });
    }
    _generateCustomerEntities() {
        return __awaiter(this, void 0, void 0, function* () {
            let userNumber = 1;
            const create = () => __awaiter(this, void 0, void 0, function* () {
                yield this._createRandomUserWithOrder();
                if (userNumber <= 90) {
                    userNumber += 1;
                    yield create();
                }
            });
            yield create();
        });
    }
    _isCarrierUsernameExists(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const carrierUsername = yield this._carriersService
                .getCarrierByUsername(username)
                .pipe(first())
                .toPromise();
            return carrierUsername !== null;
        });
    }
    _createHardcodedWarehouses() {
        return __awaiter(this, void 0, void 0, function* () {
            const carriers = yield this._generate100Carriers();
            const carrierIds = carriers.map((c) => c.id);
            for (const objKey of [
                'pizzaRestaurant',
                'pizzaHit',
                'pizzaTroya',
                'dominexPizza',
            ]) {
                const objToRegister = this.fakeDataWarehouses.registrationInputs[objKey];
                if (this._existingWarehouses.some((w) => w.username === objToRegister.warehouse.username)) {
                    return;
                }
                carrierIds.forEach((carrierId) => {
                    objToRegister.warehouse.usedCarriersIds.push(carrierId);
                });
                const createdObject = yield this.warehouseRouter.register(objToRegister);
                this._hardcodedWarehouses.push(createdObject);
                this._notify.warehouse(createdObject.id);
            }
        });
    }
    _createWarehouseWithCarrier() {
        return __awaiter(this, void 0, void 0, function* () {
            const warehouseRegisterInput = this.fakeDataWarehouses.registrationInputs.generate();
            const carrier = yield this._createCarrier();
            warehouseRegisterInput.warehouse.usedCarriersIds.push(carrier.id);
            const warehouse = yield this.warehouseRouter.register(warehouseRegisterInput);
            this._notify.warehouse(warehouse.id);
            return warehouse;
        });
    }
    _createRandomUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const userRegisterInput = this.fakeDataUsers.getUserRegistrationInput();
            const isUserEmailExists = yield this._isUserEmailExists(userRegisterInput.user.email);
            if (isUserEmailExists) {
                return this._createRandomUser();
            }
            else {
                const user = yield this.userAuthRouter.register(userRegisterInput);
                return user;
            }
        });
    }
    _createRandomUserWithOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._createRandomUser();
            const warehouse = yield this._createWarehouseWithCarrier();
            const p1 = yield this._createProduct();
            const p2 = yield this._createProduct();
            yield this._createWarehouseProducts(warehouse.id, [p1.id, p2.id]);
            yield this._createOrder(user.id, warehouse.id, p1.id);
            yield this._createOrder(user.id, warehouse.id, p2.id);
            this._notify.user(user.id);
        });
    }
    _generateProductCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._productCategories.length === 0) {
                this._productCategories = (yield this.generateCategories()).map((c) => {
                    return {
                        _id: c.id,
                        name: c.name.map((n) => {
                            return {
                                locale: n.locale,
                                value: n.value,
                            };
                        }),
                        _createdAt: c._createdAt,
                        _updatedAt: c._updatedAt,
                    };
                });
            }
        });
    }
    _createProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._generateProductCategories();
            const getRandomCategory = () => {
                return this._productCategories[_.random(this._productCategories.length - 1)];
            };
            const productCreateObject = yield this.fakeDataProducts.getRandomProduct([getRandomCategory()]);
            const product = yield this.productRouter.create(productCreateObject);
            this._notify.product(product.id);
            return product;
        });
    }
    _generateProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._generateProductCategories();
            const filter = (predicate) => {
                return this._productCategories.filter((c) => c.name.some(predicate));
            };
            const categoriesPizza = filter((cName) => cName.value.toLowerCase() === 'pizza');
            const categoriesSushi = filter((cName) => cName.value.toLowerCase() === 'sushi');
            const categoriesPasta = filter((cName) => cName.value.toLowerCase() === 'pasta');
            yield this.createPeperoniAndMushroomPizzaProduct(categoriesPizza);
            yield this.createSushiAndCaviarMixProduct(categoriesSushi);
            yield this.createSushiMixProduct(categoriesSushi);
            yield this.createPastaProduct(categoriesPasta);
            yield this.createSushiBoxProduct(categoriesSushi);
            yield this.createPeperoniAndTomatoPizzaProduct(categoriesPizza);
        });
    }
    generateCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const create = (inputObject) => __awaiter(this, void 0, void 0, function* () {
                return this._productsCategoriesService
                    .create(inputObject)
                    .toPromise();
            });
            let resultCategories = yield this._productsCategoriesService
                .getCategories()
                .pipe(first())
                .toPromise();
            if (resultCategories.length === 0) {
                const rawCategories = this._fakeDataProductsCategories.getDifferentKindsOfCategories();
                const categoryPizza = yield create(rawCategories.pizza);
                const categorySushi = yield create(rawCategories.sushi);
                const categoryBurger = yield create(rawCategories.burger);
                const categoryVegetarian = yield create(rawCategories.vegetarian);
                const categorySalads = yield create(rawCategories.salads);
                const categoryDessert = yield create(rawCategories.dessert);
                const categoryDrinks = yield create(rawCategories.drinks);
                const categoryMeatDishes = yield create(rawCategories.meatDishes);
                const categorySoups = yield create(rawCategories.soups);
                const categoryAlcohol = yield create(rawCategories.alcohol);
                const categoryFastFood = yield create(rawCategories.fastFood);
                const categoryPasta = yield create(rawCategories.pasta);
                resultCategories = [
                    categoryPizza,
                    categorySushi,
                    categoryBurger,
                    categoryVegetarian,
                    categorySalads,
                    categoryDessert,
                    categoryDrinks,
                    categoryMeatDishes,
                    categorySoups,
                    categoryAlcohol,
                    categoryFastFood,
                    categoryPasta,
                ];
            }
            return resultCategories;
        });
    }
    _listenForExistingWarehouses() {
        this._warehousesService
            .getStores()
            .pipe(takeUntil(this._ngDestroy$))
            .subscribe((existingWarehouses) => {
            this._existingWarehouses = existingWarehouses;
        });
    }
    _createWarehouseProducts(warehouseId, productIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const createObjects = productIds.map((id) => this.fakeDataWarehousesProducts.getCreateObject(id));
            yield this.warehouseProductsRouter.add(warehouseId, createObjects);
            this._notify.warehouseAddProducts(warehouseId);
        });
    }
    _createWarehouseProductsForHardcodedWarehouses() {
        return __awaiter(this, void 0, void 0, function* () {
            const warehouseProductCreateObjects = this.fakeDataWarehousesProducts.getHardcodedCreateObject([
                this.peperoniAndMushroomPizzaProduct.id,
                this.peperoniAndTomatoPizzaProduct.id,
                this.sushiAndCaviarMixProduct.id,
                this.sushiMixProduct.id,
                this.pastaProduct.id,
                this.sushiBoxProduct.id,
            ]);
            const moreWarehouseProducts = yield this._generateProductsForWarehouseProducts();
            for (const w of this._hardcodedWarehouses) {
                yield this.warehouseProductsRouter.add(w.id, warehouseProductCreateObjects.concat(moreWarehouseProducts));
            }
        });
    }
    _generateProductsForWarehouseProducts(productsLimit = 150) {
        return __awaiter(this, void 0, void 0, function* () {
            const warehouseProductCreateObjects = [];
            for (let i = 1; i <= productsLimit; i += 1) {
                const product = yield this._createProduct();
                const warehouseProductCreateObject = this.fakeDataWarehousesProducts.getCreateObject(product.id);
                warehouseProductCreateObjects.push(warehouseProductCreateObject);
            }
            return warehouseProductCreateObjects;
        });
    }
    _generateCurrencies() {
        return __awaiter(this, void 0, void 0, function* () {
            const currenciesCodes = ['USD', 'ILS', 'EUR', 'BGN', 'RUB'];
            for (const currencyCode of currenciesCodes) {
                const res = yield this._currenciesService
                    .create({ currencyCode })
                    .pipe(first())
                    .toPromise();
                this.toasterService.pop(res.success ? 'success' : 'warning', res.message);
            }
        });
    }
    ngOnDestroy() {
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
    }
};
FakeDataComponent = __decorate([
    Component({
        selector: 'ea-fake-data',
        templateUrl: './fakeData.component.html',
        styleUrls: ['./fakeData.component.scss'],
    }),
    __metadata("design:paramtypes", [FakeDataWarehousesProducts,
        FakeDataWarehouses,
        FakeDataInvites,
        FakeDataUsers,
        FakeDataCarriers,
        FakeDataProductsCategories,
        CarrierRouter,
        UserRouter,
        UserAuthRouter,
        FakeDataProducts,
        ProductRouter,
        WarehouseRouter,
        ToasterService,
        InviteRouter,
        WarehouseProductsRouter,
        WarehouseOrdersRouter,
        OrderRouter,
        CarriersService,
        WarehousesService,
        DataService,
        ProductsCategoryService,
        OrdersService,
        InvitesService,
        InvitesRequestsService,
        NotifyService,
        UsersService,
        CurrenciesService])
], FakeDataComponent);
export { FakeDataComponent };
//# sourceMappingURL=fakeData.component.js.map