import { __awaiter, __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { WarehousesService } from '../../@core/data/warehouses.service';
import { OrdersService } from '../../@core/data/orders.service';
import { WarehouseOrdersService } from '@app/@core/data/warehouseOrders.service';
import { DashboardLoadingIndicatorState } from '@app/models/DashboardLoadingIndicatorState';
import { TranslateService } from '@ngx-translate/core';
import { DashboardInfoViewModel } from '@app/models/DashboardInfoViewModel';
import { takeUntil } from 'rxjs/operators';
let DashboardComponent = class DashboardComponent {
    constructor(_storesService, _storeOrdersService, _ordersService, _translateService) {
        this._storesService = _storesService;
        this._storeOrdersService = _storeOrdersService;
        this._ordersService = _ordersService;
        this._translateService = _translateService;
        this.stores = [];
        this.loading = new DashboardLoadingIndicatorState();
        this.totalInfo = new DashboardInfoViewModel();
        this.todayInfo = new DashboardInfoViewModel();
        this.completedOrders = [];
        this.completedOrdersToday = [];
        this.chartPanelOrders = [];
        this.hasSelectedStore = false;
        this.isChartPanelOrdersLoad = true;
        this.averageRateCustomersToday = {
            value: 0,
            allStores: 0,
            perStore: {},
        };
        this.averageRateOrdersToday = {
            value: 0,
            allStores: 0,
            perStore: {},
        };
        this.averageRateRevenueToday = {
            value: 0,
            allStores: 0,
            perStore: {},
        };
        this._ngDestroy$ = new Subject();
    }
    get labelAvgPercent() {
        const maxPercentRate = 100;
        return {
            customers: this.averageRateCustomersToday.value > maxPercentRate
                ? this._translations.labelBetterThanAverage
                : this._translations.labelTillAverage,
            orders: this.averageRateOrdersToday.value > maxPercentRate
                ? this._translations.labelBetterThanAverage
                : this._translations.labelTillAverage,
            revenue: this.averageRateRevenueToday.value > maxPercentRate
                ? this._translations.labelBetterThanAverage
                : this._translations.labelTillAverage,
        };
    }
    get _translations() {
        const translationPrefix = 'DASHBOARD_VIEW';
        return {
            labelTillAverage: this._translate(`${translationPrefix}.TILL_AVERAGE`),
            labelBetterThanAverage: this._translate(`${translationPrefix}.BETTER_THAN_AVERAGE`),
        };
    }
    get _toggleLoading() {
        return {
            totalCustomers: (isLoading) => (this.loading.totalInfo.customers = isLoading),
            totalOrders: (isLoading) => (this.loading.totalInfo.orders = isLoading),
            totalRevenue: (isLoading) => (this.loading.totalInfo.revenue = isLoading),
            todayCustomers: (isLoading) => (this.loading.todayInfo.customers = isLoading),
            todayOrders: (isLoading) => (this.loading.todayInfo.orders = isLoading),
            todayRevenue: (isLoading) => (this.loading.todayInfo.revenue = isLoading),
        };
    }
    ngOnInit() {
        this.loadAllStoresData();
    }
    onSelectStore(storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (storeId) {
                this.hasSelectedStore = true;
                this.selectedStoreId = storeId;
                this._toggleLoadingDashboardMetrics(true);
                this._displayTotalCustomers();
                this._displayTotalCustomersToday();
                yield this._calculatePerMerchantMetrics();
                this._calculatePerMerchantMetricsToday();
                this._calculateAveragePercentagesToday();
                this._toggleLoadingDashboardMetrics(false);
                this._listenChartPanelPerStoreOrders();
            }
            else {
                this.hasSelectedStore = false;
                this.loadAllStoresData();
            }
        });
    }
    loadAllStoresData() {
        this._listenChartPanelTotalOrders();
        this._listenTotalStores();
        this._listenTotalCustomers();
        this._listenTotalCustomersToday();
        this._listenTotalOrders();
        this._listenTotalOrdersToday();
    }
    _listenTotalStores() {
        this._storesService
            .getStores()
            .pipe(takeUntil(this._ngDestroy$))
            .subscribe((stores) => {
            this.stores = stores;
        });
    }
    _toggleLoadingDashboardMetrics(isLoading) {
        this._toggleLoading.totalCustomers(isLoading);
        this._toggleLoading.totalOrders(isLoading);
        this._toggleLoading.totalRevenue(isLoading);
        this._toggleLoading.todayCustomers(isLoading);
        this._toggleLoading.todayOrders(isLoading);
        this._toggleLoading.todayRevenue(isLoading);
    }
    _listenChartPanelTotalOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isChartPanelOrdersLoad = true;
            this.chartPanelOrders = yield this._ordersService.getOrdersChartTotalOrdersNew();
            this.isChartPanelOrdersLoad = false;
        });
    }
    _listenChartPanelPerStoreOrders() {
        if (this._dashboardOrdersChartOrdersSubscription) {
            this._dashboardOrdersChartOrdersSubscription.unsubscribe();
            this._dashboardOrdersChartOrdersSubscription = null;
        }
        this._dashboardOrdersChartOrdersSubscription = this._storeOrdersService
            .getDashboardOrdersChartOrders(this.selectedStoreId)
            .subscribe((orders) => {
            this.chartPanelOrders = orders;
        });
    }
    _listenTotalOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            this._toggleLoading.totalOrders(true);
            this._toggleLoading.totalRevenue(true);
            if (this.hasSelectedStore) {
                yield this._calculatePerMerchantMetrics();
            }
            else {
                yield this._calculateGlobalMetrics();
            }
            this._toggleLoading.totalOrders(false);
            this._toggleLoading.totalRevenue(false);
            this._calculateAveragePercentagesToday();
        });
    }
    _listenTotalOrdersToday() {
        this._toggleLoading.todayOrders(true);
        this._toggleLoading.todayRevenue(true);
        this._ordersService
            .getDashboardCompletedOrdersToday()
            .pipe(takeUntil(this._ngDestroy$))
            .subscribe((orders) => {
            this.completedOrdersToday = orders;
            if (this.hasSelectedStore) {
                this._calculatePerMerchantMetricsToday();
            }
            else {
                this._calculateGlobalMetricsToday();
            }
            this._calculateAveragePercentagesToday();
            this._toggleLoading.todayOrders(false);
            this._toggleLoading.todayRevenue(false);
        });
    }
    _listenTotalCustomers() {
        this._toggleLoading.totalCustomers(true);
        this._storesService
            .getCountExistingCustomers()
            .pipe(takeUntil(this._ngDestroy$))
            .subscribe((existingCustomers) => {
            this.existingCustomers = existingCustomers;
            this._displayTotalCustomers();
            this._toggleLoading.totalCustomers(false);
            this._calculateAveragePercentagesToday();
        });
    }
    _listenTotalCustomersToday() {
        this._toggleLoading.todayCustomers(true);
        this._storesService
            .getCountExistingCustomersToday()
            .pipe(takeUntil(this._ngDestroy$))
            .subscribe((existingCustomersToday) => {
            this.existingCustomersToday = existingCustomersToday;
            this._displayTotalCustomersToday();
            this._toggleLoading.todayCustomers(false);
            this._calculateAveragePercentagesToday();
        });
    }
    _calculateStoreDaysExistence(store) {
        const day = 24 * 60 * 60 * 1000;
        const storeCreatedAt = new Date(store._createdAt);
        const difference = Math.abs(Date.now() - storeCreatedAt.getTime());
        const storeDaysExistence = difference / day;
        return storeDaysExistence;
    }
    _calculateAveragePercentagesToday() {
        let storesDaysTotal = 0;
        this.stores.forEach((store) => {
            let storeDaysExistence = this._calculateStoreDaysExistence(store);
            storesDaysTotal += storeDaysExistence;
            if (storeDaysExistence < 1) {
                storeDaysExistence = 1;
            }
            this._calculateAverageCustomersPercentCurrentStore(storeDaysExistence, store.id);
            this._calculateAverageOrdersPercentCurrentStore(storeDaysExistence, store.id);
            this._calculateAverageRevenuePercentCurrentStore(storeDaysExistence, store.id);
        });
        const daysTotalAverage = storesDaysTotal / this.stores.length || 1;
        this._calculateAverageCustomersPercentGlobal(daysTotalAverage);
        this._calculateAverageOrdersPercentGlobal(daysTotalAverage);
        this._calculateAverageRevenuePercentGlobal(daysTotalAverage);
        this._displayCustomersAveragePercent();
        this._displayOrdersAveragePercent();
        this._displayRevenueAveragePercent();
    }
    _calculateAverageCustomersPercentGlobal(daysTotalAverage) {
        const averageCustomersPerDay = this.totalInfo.customers / daysTotalAverage || 0;
        this.averageRateCustomersToday.allStores =
            (this.todayInfo.customers / averageCustomersPerDay || 0) * 100;
    }
    _calculateAverageOrdersPercentGlobal(daysTotalAverage) {
        const averageOrdersPerDay = this.totalInfo.orders / daysTotalAverage || 0;
        this.averageRateOrdersToday.allStores =
            (this.todayInfo.orders / averageOrdersPerDay || 0) * 100;
    }
    _calculateAverageRevenuePercentGlobal(daysTotalAverage) {
        const averageRevenuePerDay = this.totalInfo.revenue / daysTotalAverage || 0;
        this.averageRateRevenueToday.allStores =
            (this.todayInfo.revenue / averageRevenuePerDay || 0) * 100;
    }
    _calculateAverageCustomersPercentCurrentStore(storeDaysExistence, storeId) {
        const averageCustomers = this.totalInfo.customers / storeDaysExistence || 0;
        this.averageRateCustomersToday.perStore[storeId] =
            (this.todayInfo.customers / averageCustomers || 0) * 100;
    }
    _calculateAverageOrdersPercentCurrentStore(storeDaysExistence, storeId) {
        const averageOrders = this.totalInfo.orders / storeDaysExistence || 0;
        this.averageRateOrdersToday.perStore[storeId] =
            (this.todayInfo.orders / averageOrders || 0) * 100;
    }
    _calculateAverageRevenuePercentCurrentStore(storeDaysExistence, storeId) {
        const averageRevenue = this.totalInfo.revenue / storeDaysExistence || 0;
        this.averageRateRevenueToday.perStore[storeId] =
            (this.todayInfo.revenue / averageRevenue || 0) * 100;
    }
    _calculateGlobalMetrics() {
        return __awaiter(this, void 0, void 0, function* () {
            const orderInfo = yield this._ordersService.getComplatedOrdersInfo();
            this.totalInfo.orders = orderInfo['totalOrders'];
            this.totalInfo.revenue = orderInfo['totalRevenue'];
        });
    }
    _calculateGlobalMetricsToday() {
        this.todayInfo.orders = this.completedOrdersToday.length;
        this.todayInfo.revenue = this.completedOrdersToday
            .map((order) => order.totalPrice)
            .reduce((prevPrice, nextPrice) => prevPrice + nextPrice, 0);
    }
    _calculatePerMerchantMetrics() {
        return __awaiter(this, void 0, void 0, function* () {
            const orderInfo = yield this._ordersService.getComplatedOrdersInfo(this.selectedStoreId);
            this.totalInfo.orders = orderInfo['totalOrders'];
            this.totalInfo.revenue = orderInfo['totalRevenue'];
        });
    }
    _calculatePerMerchantMetricsToday() {
        const storeCompletedOrdersToday = this.completedOrdersToday.filter((o) => o.warehouseId === this.selectedStoreId);
        this.todayInfo.orders = storeCompletedOrdersToday.length;
        this.todayInfo.revenue = storeCompletedOrdersToday
            .map((order) => order.totalPrice)
            .reduce((prevPrice, nextPrice) => prevPrice + nextPrice, 0);
    }
    _displayCustomersAveragePercent() {
        this.hasSelectedStore
            ? (this.averageRateCustomersToday.value = this.averageRateCustomersToday.perStore[this.selectedStoreId])
            : (this.averageRateCustomersToday.value = this.averageRateCustomersToday.allStores);
    }
    _displayOrdersAveragePercent() {
        this.hasSelectedStore
            ? (this.averageRateOrdersToday.value = this.averageRateOrdersToday.perStore[this.selectedStoreId])
            : (this.averageRateOrdersToday.value = this.averageRateOrdersToday.allStores);
    }
    _displayRevenueAveragePercent() {
        this.hasSelectedStore
            ? (this.averageRateRevenueToday.value = this.averageRateRevenueToday.perStore[this.selectedStoreId])
            : (this.averageRateRevenueToday.value = this.averageRateRevenueToday.allStores);
    }
    _displayTotalCustomers() {
        if (this.hasSelectedStore) {
            const store = this.existingCustomers.perStore.find((s) => s.storeId === this.selectedStoreId);
            this.totalInfo.customers = store ? store.customersCount : 0;
        }
        else {
            this.totalInfo.customers = this.existingCustomers.total;
        }
    }
    _displayTotalCustomersToday() {
        if (this.hasSelectedStore) {
            const store = this.existingCustomersToday.perStore.find((s) => s.storeId === this.selectedStoreId);
            this.todayInfo.customers = store ? store.customersCount : 0;
        }
        else {
            this.todayInfo.customers = this.existingCustomersToday.total;
        }
    }
    _translate(key) {
        let translationResult = '';
        this._translateService.get(key).subscribe((res) => {
            translationResult = res;
        });
        return translationResult;
    }
    ngOnDestroy() {
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
        if (this._dashboardOrdersChartOrdersSubscription) {
            this._dashboardOrdersChartOrdersSubscription.unsubscribe();
        }
    }
};
DashboardComponent = __decorate([
    Component({
        selector: 'ea-dashboard',
        styleUrls: ['./dashboard.component.scss'],
        templateUrl: './dashboard.component.html',
    }),
    __metadata("design:paramtypes", [WarehousesService,
        WarehouseOrdersService,
        OrdersService,
        TranslateService])
], DashboardComponent);
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map