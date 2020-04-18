var ChartsPanelComponent_1;
import { __decorate, __metadata } from "tslib";
import { Component, ViewChild, Input } from '@angular/core';
import { OrdersChartComponent } from './charts/orders-chart/orders-chart.component';
import { ProfitChartComponent } from './charts/profit-chart/profit-chart.component';
import { TranslateService } from '@ngx-translate/core';
import { OrdersChartService, } from '@app/@core/services/dashboard/orders-chart.service';
import { Subject } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { OrdersProfitChartService, } from '@app/@core/services/dashboard/orders-profit-chart.service';
import { PeriodsService } from '@app/@core/services/dashboard/periods.service';
import { DashboardLoadingIndicatorState } from '@app/models/DashboardLoadingIndicatorState';
import { toDate } from '@modules/server.common/utils';
import { takeUntil } from 'rxjs/operators';
let ChartsPanelComponent = ChartsPanelComponent_1 = class ChartsPanelComponent {
    constructor(_translateService, _ordersProfitChartService, _periodService, _ordersChartService) {
        this._translateService = _translateService;
        this._ordersProfitChartService = _ordersProfitChartService;
        this._periodService = _periodService;
        this._ordersChartService = _ordersChartService;
        this.preservedRanges$ = new Subject();
        this.clearRange$ = new Subject();
        this.loading = new DashboardLoadingIndicatorState();
        this.period = ChartsPanelComponent_1._PERIODS.today;
        this.chartPanelSummary = [];
        this._yearsLabelRange = {
            from: null,
            to: null,
        };
        this._dateLabelRange = {
            from: null,
            to: null,
        };
        this._orders = [];
        this._chartPanelSummaryTotal = 0;
        this._chartPanelSummaryCompleted = 0;
        this._chartPanelSummaryCancelled = 0;
        this._isOrderChartSelected = true;
        this._isDateRangeSelected = false;
        this._alive = true;
        this._ngDestroy$ = new Subject();
        this._ordersProfitChartService
            .getOrderProfitChartSummary()
            .pipe(takeWhile(() => this._alive))
            .subscribe((summary) => {
            this.chartPanelSummary = summary;
        });
        this.getOrdersChartData(this.period);
        this.getProfitChartData(this.period);
    }
    ngOnInit() {
        this._resetChartData();
        this._listenLangChange();
    }
    set orders(orders) {
        this._orders = orders;
        this._setupAndDisplayChartsData();
    }
    get orders() {
        return this._orders;
    }
    set isOrdersLoad(isLoading) {
        this._toggleLoading.chartPanelSummary(isLoading);
        this._toggleLoading.chart(isLoading);
    }
    static get _PERIODS() {
        return {
            today: 'today',
            lastWeek: 'lastWeek',
            lastMonth: 'lastMonth',
            currentYear: 'currentYear',
            years: 'years',
            rangeDay: 'range day',
            rangeDays: 'range days',
            rangeWeeks: 'range weeks',
            rangeMonths: 'range months',
            rangeYears: 'range years',
        };
    }
    get _translations() {
        const rootPrefix = 'DASHBOARD_VIEW.CHARTS';
        return {
            TOTAL_ORDERS_OVER_PERIOD: this._translate(`${rootPrefix}.TOTAL_ORDERS`),
            TOTAL_COMPLETED_ORDERS_OVER_PERIOD: this._translate(`${rootPrefix}.TOTAL_COMPLETED_ORDERS`),
            TOTAL_CANCELLED_ORDERS_OVER_PERIOD: this._translate(`${rootPrefix}.TOTAL_CANCELLED_ORDERS`),
            TOTAL_REVENUE_OVER_PERIOD: this._translate(`${rootPrefix}.TOTAL_REVENUE_ALL_ORDERS`),
            TOTAL_REVENUE_COMPLETED_ORDERS_OVER_PERIOD: this._translate(`${rootPrefix}.TOTAL_REVENUE_COMPLETED_ORDERS`),
            TOTAL_REVENUE_CANCELLED_ORDERS_OVER_PERIOD: this._translate(`${rootPrefix}.TOTAL_LOST_REVENUE_CANCELLED_ORDERS`),
        };
    }
    get _toggleLoading() {
        return {
            chartPanelSummary: (isLoading) => (this.loading.chartPanelSummary = isLoading),
            chart: (isLoading) => (this.loading.chart = isLoading),
        };
    }
    ngOnDestroy() {
        this._alive = false;
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
    }
    clearRange() {
        this.setPeriodAndGetChartData(ChartsPanelComponent_1._PERIODS.today);
    }
    setPeriodAndGetChartData(value) {
        if (this.period !== value) {
            this.period = value;
        }
        this._isDateRangeSelected = false;
        this._setupAndDisplayChartsData();
    }
    selectDateRangeOrderCharts({ fromDate, toDate, daysDiff, }) {
        this._dateLabelRange.from = fromDate;
        this._dateLabelRange.to = toDate;
        this.period = this._calculateCustomPeriod(daysDiff);
        this._isDateRangeSelected = true;
        this._setupAndDisplayChartsData();
    }
    changeTab(selectedTab) {
        const isOrdersTabActive = this.ordersProfitTab.tabs.first.active;
        if (!isOrdersTabActive) {
            this.profitChart.resizeChart();
            this._isOrderChartSelected = false;
        }
        else {
            this._isOrderChartSelected = true;
            this.ordersChart.resizeChart();
        }
        if (this._isDateRangeSelected) {
            this._sendRangeIfSelected();
        }
        else {
            this._clearRangeFromHeader();
        }
        this._setupAndDisplayChartsData();
    }
    getOrdersChartData(period) {
        this._ordersProfitChartService
            .getOrdersChartData(period)
            .pipe(takeWhile(() => this._alive))
            .subscribe((ordersChartData) => {
            this.ordersChartData = ordersChartData;
        });
    }
    getProfitChartData(period) {
        this._ordersProfitChartService
            .getProfitChartData(period)
            .pipe(takeWhile(() => this._alive))
            .subscribe((profitChartData) => {
            this.profitChartData = profitChartData;
        });
    }
    _setChartsSummary() {
        this.chartPanelSummary = [];
        if (this._isOrderChartSelected) {
            this._setOrdersChartSummary();
        }
        else {
            this._setProfitChartSummary();
        }
    }
    _setOrdersChartSummary() {
        this.chartPanelSummary.push({
            values: {
                total: {
                    title: this._translations.TOTAL_ORDERS_OVER_PERIOD,
                    value: this._chartPanelSummaryTotal,
                },
                completed: {
                    title: this._translations
                        .TOTAL_COMPLETED_ORDERS_OVER_PERIOD,
                    value: this._chartPanelSummaryCompleted,
                },
                cancelled: {
                    title: this._translations
                        .TOTAL_CANCELLED_ORDERS_OVER_PERIOD,
                    value: this._chartPanelSummaryCancelled,
                },
            },
            isPrice: false,
        });
    }
    _setProfitChartSummary() {
        this.chartPanelSummary.push({
            values: {
                total: {
                    title: this._translations.TOTAL_REVENUE_OVER_PERIOD,
                    value: this._chartPanelSummaryTotal,
                },
                completed: {
                    title: this._translations
                        .TOTAL_REVENUE_COMPLETED_ORDERS_OVER_PERIOD,
                    value: this._chartPanelSummaryCompleted,
                },
                cancelled: {
                    title: this._translations
                        .TOTAL_REVENUE_CANCELLED_ORDERS_OVER_PERIOD,
                    value: this._chartPanelSummaryCancelled,
                },
            },
            isPrice: true,
        });
    }
    _setupLabelsYearsRange(order) {
        const orderYear = toDate(order._createdAt).getFullYear();
        if (orderYear < this._yearsLabelRange.from) {
            this._yearsLabelRange.from = orderYear;
        }
    }
    _resetYearsLabelRange() {
        this._yearsLabelRange = {
            from: Number.MAX_SAFE_INTEGER,
            to: new Date().getFullYear(),
        };
    }
    _setupAndDisplayChartsData() {
        this._resetChartData();
        this._resetYearsLabelRange();
        this._resetChartPanelSummaryValues();
        this._orders
            .filter((order) => {
            switch (this.period) {
                case ChartsPanelComponent_1._PERIODS.today:
                    return this._isOrderTodayPeriodMatch(order);
                case ChartsPanelComponent_1._PERIODS.lastWeek:
                    return this._isOrderLastWeekPeriodMatch(order);
                case ChartsPanelComponent_1._PERIODS.lastMonth:
                    return this._isOrderLastMonthPeriodMatch(order);
                case ChartsPanelComponent_1._PERIODS.currentYear:
                    return this._isOrderCurrentYearPeriodMatch(order);
                case ChartsPanelComponent_1._PERIODS.years:
                    this._setupLabelsYearsRange(order);
                    return true;
                case ChartsPanelComponent_1._PERIODS.rangeDay:
                    return this._isOrderCustomDayPeriodMatch(order);
                case ChartsPanelComponent_1._PERIODS.rangeDays:
                case ChartsPanelComponent_1._PERIODS.rangeWeeks:
                case ChartsPanelComponent_1._PERIODS.rangeMonths:
                case ChartsPanelComponent_1._PERIODS.rangeYears:
                    return this._isOrderRangePeriodMatch(order);
            }
        })
            .forEach((order) => {
            const orderDateCreated = new Date(order._createdAt);
            const orderHour = orderDateCreated.getHours();
            const orderWeekDay = orderDateCreated.getDay();
            const orderDate = orderDateCreated.getDate();
            const orderMonth = orderDateCreated.getMonth();
            const orderYear = orderDateCreated.getFullYear();
            const orderDateRange = this._periodService.getDateLabelKey(orderDateCreated);
            const orderWeekRange = this._periodService.getWeekLabelKey(orderDateCreated, this._getDateWeekNumber);
            const orderMonthRange = this._periodService.getMonthLabelKey(orderDateCreated);
            if (this._isOrderChartSelected) {
                this._incrementOrdersAmountSummary(order);
                this._setupOrdersChartData(orderHour, orderWeekDay, orderDate, orderMonth, orderYear, orderDateRange, orderWeekRange, orderMonthRange, order.isCancelled);
            }
            else {
                const orderTotalPrice = order.totalPrice;
                this._incrementOrdersProfitSummary(order, orderTotalPrice);
                this._setupProfitChartData(orderHour, orderWeekDay, orderDate, orderMonth, orderYear, orderDateRange, orderWeekRange, orderMonthRange, orderTotalPrice, order.isCancelled);
            }
        });
        if (this._isOrderChartSelected) {
            this._displayOrdersChart();
        }
        else {
            this._displayProfitChart();
        }
        this._setChartsSummary();
    }
    _incrementOrdersAmountSummary(order) {
        this._chartPanelSummaryTotal += 1;
        order.isCancelled
            ? (this._chartPanelSummaryCancelled += 1)
            : (this._chartPanelSummaryCompleted += 1);
    }
    _incrementOrdersProfitSummary(order, orderTotalPrice) {
        this._chartPanelSummaryTotal += orderTotalPrice;
        order.isCancelled
            ? (this._chartPanelSummaryCancelled += orderTotalPrice)
            : (this._chartPanelSummaryCompleted += orderTotalPrice);
    }
    _setupOrdersChartData(orderHour, orderWeekDay, orderDate, orderMonth, orderYear, orderDateRange, orderWeekRange, orderMonthRange, isCancelled) {
        this._setupOrdersChartTotal(orderHour, orderWeekDay, orderDate, orderMonth, orderYear, orderDateRange, orderWeekRange, orderMonthRange);
        if (isCancelled) {
            this._setupOrdersChartCanceled(orderHour, orderWeekDay, orderDate, orderMonth, orderYear, orderDateRange, orderWeekRange, orderMonthRange);
        }
        else {
            this._setupOrdersChartCompleted(orderHour, orderWeekDay, orderDate, orderMonth, orderYear, orderDateRange, orderWeekRange, orderMonthRange);
        }
    }
    _setupProfitChartData(orderHour, orderWeekDay, orderDate, orderMonth, orderYear, orderDateRange, orderWeekRange, orderMonthRange, orderTotalPrice, isCancelled) {
        this._setupProfitChartTotal(orderHour, orderWeekDay, orderDate, orderMonth, orderYear, orderDateRange, orderWeekRange, orderMonthRange, orderTotalPrice);
        if (isCancelled) {
            this._setupProfitChartCanceled(orderHour, orderWeekDay, orderDate, orderMonth, orderYear, orderDateRange, orderWeekRange, orderMonthRange, orderTotalPrice);
        }
        else {
            this._setupProfitChartCompleted(orderHour, orderWeekDay, orderDate, orderMonth, orderYear, orderDateRange, orderWeekRange, orderMonthRange, orderTotalPrice);
        }
    }
    _setupOrdersChartTotal(orderHour, orderWeekDay, orderDate, orderMonth, orderYear, orderDateRange, orderWeekRange, orderMonthRange) {
        switch (this.period) {
            case ChartsPanelComponent_1._PERIODS.today:
                this._incrementTotalOrdersAmount(this._ordersToday, orderHour);
                break;
            case ChartsPanelComponent_1._PERIODS.lastWeek:
                this._incrementTotalOrdersAmount(this._ordersLastWeek, orderWeekDay);
                break;
            case ChartsPanelComponent_1._PERIODS.lastMonth:
                this._incrementTotalOrdersAmount(this._ordersLastMonth, orderDate);
                break;
            case ChartsPanelComponent_1._PERIODS.currentYear:
                this._incrementTotalOrdersAmount(this._ordersCurrentYear, orderMonth);
                break;
            case ChartsPanelComponent_1._PERIODS.years:
                this._incrementTotalOrdersAmount(this._ordersYears, orderYear);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeDay:
                this._incrementTotalOrdersAmount(this._ordersToday, orderHour);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeDays:
                this._incrementTotalOrdersAmount(this._ordersDateRange, orderDateRange);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeWeeks:
                this._incrementTotalOrdersAmount(this._ordersWeeksRange, orderWeekRange);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeMonths:
                this._incrementTotalOrdersAmount(this._ordersMonthsRange, orderMonthRange);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeYears:
                this._incrementTotalOrdersAmount(this._ordersYearsRange, orderYear);
                break;
        }
    }
    _setupOrdersChartCanceled(orderHour, orderWeekDay, orderDate, orderMonth, orderYear, orderDateRange, orderWeekRange, orderMonthRange) {
        switch (this.period) {
            case ChartsPanelComponent_1._PERIODS.today:
                this._incrementCanceledOrdersAmount(this._ordersToday, orderHour);
                break;
            case ChartsPanelComponent_1._PERIODS.lastWeek:
                this._incrementCanceledOrdersAmount(this._ordersLastWeek, orderWeekDay);
                break;
            case ChartsPanelComponent_1._PERIODS.lastMonth:
                this._incrementCanceledOrdersAmount(this._ordersLastMonth, orderDate);
                break;
            case ChartsPanelComponent_1._PERIODS.currentYear:
                this._incrementCanceledOrdersAmount(this._ordersCurrentYear, orderMonth);
                break;
            case ChartsPanelComponent_1._PERIODS.years:
                this._incrementCanceledOrdersAmount(this._ordersYears, orderYear);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeDay:
                this._incrementCanceledOrdersAmount(this._ordersToday, orderHour);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeDays:
                this._incrementCanceledOrdersAmount(this._ordersDateRange, orderDateRange);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeWeeks:
                this._incrementCanceledOrdersAmount(this._ordersWeeksRange, orderWeekRange);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeMonths:
                this._incrementCanceledOrdersAmount(this._ordersMonthsRange, orderMonthRange);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeYears:
                this._incrementCanceledOrdersAmount(this._ordersYearsRange, orderYear);
                break;
        }
    }
    _setupOrdersChartCompleted(orderHour, orderWeekDay, orderDate, orderMonth, orderYear, orderDateRange, orderWeekRange, orderMonthRange) {
        switch (this.period) {
            case ChartsPanelComponent_1._PERIODS.today:
                this._incrementCompletedOrdersAmount(this._ordersToday, orderHour);
                break;
            case ChartsPanelComponent_1._PERIODS.lastWeek:
                this._incrementCompletedOrdersAmount(this._ordersLastWeek, orderWeekDay);
                break;
            case ChartsPanelComponent_1._PERIODS.lastMonth:
                this._incrementCompletedOrdersAmount(this._ordersLastMonth, orderDate);
                break;
            case ChartsPanelComponent_1._PERIODS.currentYear:
                this._incrementCompletedOrdersAmount(this._ordersCurrentYear, orderMonth);
                break;
            case ChartsPanelComponent_1._PERIODS.years:
                this._incrementCompletedOrdersAmount(this._ordersYears, orderYear);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeDay:
                this._incrementCompletedOrdersAmount(this._ordersToday, orderHour);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeDays:
                this._incrementCompletedOrdersAmount(this._ordersDateRange, orderDateRange);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeWeeks:
                this._incrementCompletedOrdersAmount(this._ordersWeeksRange, orderWeekRange);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeMonths:
                this._incrementCompletedOrdersAmount(this._ordersMonthsRange, orderMonthRange);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeYears:
                this._incrementCompletedOrdersAmount(this._ordersYearsRange, orderYear);
                break;
        }
    }
    _setupProfitChartTotal(orderHour, orderWeekDay, orderDate, orderMonth, orderYear, orderDateRange, orderWeekRange, orderMonthRange, orderTotalPrice) {
        switch (this.period) {
            case ChartsPanelComponent_1._PERIODS.today:
                this._incrementTotalOrdersProfit(this._ordersToday, orderHour, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.lastWeek:
                this._incrementTotalOrdersProfit(this._ordersLastWeek, orderWeekDay, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.lastMonth:
                this._incrementTotalOrdersProfit(this._ordersLastMonth, orderDate, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.currentYear:
                this._incrementTotalOrdersProfit(this._ordersCurrentYear, orderMonth, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.years:
                this._incrementTotalOrdersProfit(this._ordersYears, orderYear, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeDay:
                this._incrementTotalOrdersProfit(this._ordersToday, orderHour, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeDays:
                this._incrementTotalOrdersProfit(this._ordersDateRange, orderDateRange, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeWeeks:
                this._incrementTotalOrdersProfit(this._ordersWeeksRange, orderWeekRange, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeMonths:
                this._incrementTotalOrdersProfit(this._ordersMonthsRange, orderMonthRange, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeYears:
                this._incrementTotalOrdersProfit(this._ordersYearsRange, orderYear, orderTotalPrice);
                break;
        }
    }
    _setupProfitChartCanceled(orderHour, orderWeekDay, orderDate, orderMonth, orderYear, orderDateRange, orderWeekRange, orderMonthRange, orderTotalPrice) {
        switch (this.period) {
            case ChartsPanelComponent_1._PERIODS.today:
                this._incrementCanceledOrdersProfit(this._ordersToday, orderHour, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.lastWeek:
                this._incrementCanceledOrdersProfit(this._ordersLastWeek, orderWeekDay, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.lastMonth:
                this._incrementCanceledOrdersProfit(this._ordersLastMonth, orderDate, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.currentYear:
                this._incrementCanceledOrdersProfit(this._ordersCurrentYear, orderMonth, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.years:
                this._incrementCanceledOrdersProfit(this._ordersYears, orderYear, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeDay:
                this._incrementCanceledOrdersProfit(this._ordersToday, orderHour, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeDays:
                this._incrementCanceledOrdersProfit(this._ordersDateRange, orderDateRange, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeWeeks:
                this._incrementCanceledOrdersProfit(this._ordersWeeksRange, orderWeekRange, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeMonths:
                this._incrementCanceledOrdersProfit(this._ordersMonthsRange, orderMonthRange, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeYears:
                this._incrementCanceledOrdersProfit(this._ordersYearsRange, orderYear, orderTotalPrice);
                break;
        }
    }
    _setupProfitChartCompleted(orderHour, orderWeekDay, orderDate, orderMonth, orderYear, orderDateRange, orderWeekRange, orderMonthRange, orderTotalPrice) {
        switch (this.period) {
            case ChartsPanelComponent_1._PERIODS.today:
                this._incrementCompletedOrdersProfit(this._ordersToday, orderHour, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.lastWeek:
                this._incrementCompletedOrdersProfit(this._ordersLastWeek, orderWeekDay, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.lastMonth:
                this._incrementCompletedOrdersProfit(this._ordersLastMonth, orderDate, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.currentYear:
                this._incrementCompletedOrdersProfit(this._ordersCurrentYear, orderMonth, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.years:
                this._incrementCompletedOrdersProfit(this._ordersYears, orderYear, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeDay:
                this._incrementCompletedOrdersProfit(this._ordersToday, orderHour, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeDays:
                this._incrementCompletedOrdersProfit(this._ordersDateRange, orderDateRange, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeWeeks:
                this._incrementCompletedOrdersProfit(this._ordersWeeksRange, orderWeekRange, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeMonths:
                this._incrementCompletedOrdersProfit(this._ordersMonthsRange, orderMonthRange, orderTotalPrice);
                break;
            case ChartsPanelComponent_1._PERIODS.rangeYears:
                this._incrementCompletedOrdersProfit(this._ordersYearsRange, orderYear, orderTotalPrice);
                break;
        }
    }
    _setupOrdersChartTotalCommon(orderHour) {
        this._incrementTotalOrdersAmount(this._ordersToday, orderHour);
    }
    _setupOrdersChartTotalOptionSelected(orderWeekDay, orderDate, orderMonth, orderYear) {
        this._incrementTotalOrdersAmount(this._ordersLastWeek, orderWeekDay);
        this._incrementTotalOrdersAmount(this._ordersLastMonth, orderDate);
        this._incrementTotalOrdersAmount(this._ordersCurrentYear, orderMonth);
        this._incrementTotalOrdersAmount(this._ordersYears, orderYear);
    }
    _setupOrdersChartTotalRangeSelected(orderDateRange, orderWeekRange, orderMonthRange, orderYear) {
        this._incrementTotalOrdersAmount(this._ordersDateRange, orderDateRange);
        this._incrementTotalOrdersAmount(this._ordersWeeksRange, orderWeekRange);
        this._incrementTotalOrdersAmount(this._ordersMonthsRange, orderMonthRange);
        this._incrementTotalOrdersAmount(this._ordersYearsRange, orderYear);
    }
    _setupOrdersChartCancelledCommon(orderHour) {
        this._incrementCanceledOrdersAmount(this._ordersToday, orderHour);
    }
    _setupOrdersChartCancelledOptionSelected(orderWeekDay, orderDate, orderMonth, orderYear) {
        this._incrementCanceledOrdersAmount(this._ordersLastWeek, orderWeekDay);
        this._incrementCanceledOrdersAmount(this._ordersLastMonth, orderDate);
        this._incrementCanceledOrdersAmount(this._ordersCurrentYear, orderMonth);
        this._incrementCanceledOrdersAmount(this._ordersYears, orderYear);
    }
    _setupOrdersChartCancelledRangeSelected(orderDateRange, orderWeekRange, orderMonthRange, orderYear) {
        this._incrementCanceledOrdersAmount(this._ordersDateRange, orderDateRange);
        this._incrementCanceledOrdersAmount(this._ordersWeeksRange, orderWeekRange);
        this._incrementCanceledOrdersAmount(this._ordersMonthsRange, orderMonthRange);
        this._incrementCanceledOrdersAmount(this._ordersYearsRange, orderYear);
    }
    _setupOrdersChartCompletedCommon(orderHour) {
        this._incrementCompletedOrdersAmount(this._ordersToday, orderHour);
    }
    _setupOrdersChartCompletedOptionSelected(orderWeekDay, orderDate, orderMonth, orderYear) {
        this._incrementCompletedOrdersAmount(this._ordersLastWeek, orderWeekDay);
        this._incrementCompletedOrdersAmount(this._ordersLastMonth, orderDate);
        this._incrementCompletedOrdersAmount(this._ordersCurrentYear, orderMonth);
        this._incrementCompletedOrdersAmount(this._ordersYears, orderYear);
    }
    _setupOrdersChartCompletedRangeSelected(orderDateRange, orderWeekRange, orderMonthRange, orderYear) {
        this._incrementCompletedOrdersAmount(this._ordersDateRange, orderDateRange);
        this._incrementCompletedOrdersAmount(this._ordersWeeksRange, orderWeekRange);
        this._incrementCompletedOrdersAmount(this._ordersMonthsRange, orderMonthRange);
        this._incrementCompletedOrdersAmount(this._ordersYearsRange, orderYear);
    }
    _setupProfitChartTotalCommon(orderHour, orderTotalPrice) {
        this._incrementTotalOrdersProfit(this._ordersToday, orderHour, orderTotalPrice);
    }
    _setupProfitChartTotalOptionSelected(orderWeekDay, orderDate, orderMonth, orderYear, orderTotalPrice) {
        this._incrementTotalOrdersProfit(this._ordersLastWeek, orderWeekDay, orderTotalPrice);
        this._incrementTotalOrdersProfit(this._ordersLastMonth, orderDate, orderTotalPrice);
        this._incrementTotalOrdersProfit(this._ordersCurrentYear, orderMonth, orderTotalPrice);
        this._incrementTotalOrdersProfit(this._ordersYears, orderYear, orderTotalPrice);
    }
    _setupProfitChartTotalRangeSelected(orderDateRange, orderWeekRange, orderMonthRange, orderYear, orderTotalPrice) {
        this._incrementTotalOrdersProfit(this._ordersDateRange, orderDateRange, orderTotalPrice);
        this._incrementTotalOrdersProfit(this._ordersWeeksRange, orderWeekRange, orderTotalPrice);
        this._incrementTotalOrdersProfit(this._ordersMonthsRange, orderMonthRange, orderTotalPrice);
        this._incrementTotalOrdersProfit(this._ordersYearsRange, orderYear, orderTotalPrice);
    }
    _setupProfitChartCancelledCommon(orderHour, orderTotalPrice) {
        this._incrementCanceledOrdersProfit(this._ordersToday, orderHour, orderTotalPrice);
    }
    _setupProfitChartCancelledOptionSelected(orderWeekDay, orderDate, orderMonth, orderYear, orderTotalPrice) {
        this._incrementCanceledOrdersProfit(this._ordersLastWeek, orderWeekDay, orderTotalPrice);
        this._incrementCanceledOrdersProfit(this._ordersLastMonth, orderDate, orderTotalPrice);
        this._incrementCanceledOrdersProfit(this._ordersCurrentYear, orderMonth, orderTotalPrice);
        this._incrementCanceledOrdersProfit(this._ordersYears, orderYear, orderTotalPrice);
    }
    _setupProfitChartCancelledRangeSelected(orderDateRange, orderTotalPrice, orderWeekRange, orderMonthRange, orderYear) {
        this._incrementCanceledOrdersProfit(this._ordersDateRange, orderDateRange, orderTotalPrice);
        this._incrementCanceledOrdersProfit(this._ordersWeeksRange, orderWeekRange, orderTotalPrice);
        this._incrementCanceledOrdersProfit(this._ordersMonthsRange, orderMonthRange, orderTotalPrice);
        this._incrementCanceledOrdersProfit(this._ordersYearsRange, orderYear, orderTotalPrice);
    }
    _setupProfitChartCompletedCommon(orderHour, orderTotalPrice) {
        this._incrementCompletedOrdersProfit(this._ordersToday, orderHour, orderTotalPrice);
    }
    _setupProfitChartCompletedOptionSelected(orderWeekDay, orderDate, orderMonth, orderYear, orderTotalPrice) {
        this._incrementCompletedOrdersProfit(this._ordersLastWeek, orderWeekDay, orderTotalPrice);
        this._incrementCompletedOrdersProfit(this._ordersLastMonth, orderDate, orderTotalPrice);
        this._incrementCompletedOrdersProfit(this._ordersCurrentYear, orderMonth, orderTotalPrice);
        this._incrementCompletedOrdersProfit(this._ordersYears, orderYear, orderTotalPrice);
    }
    _setupProfitChartCompletedRangeSelected(orderDateRange, orderTotalPrice, orderWeekRange, orderMonthRange, orderYear) {
        this._incrementCompletedOrdersProfit(this._ordersDateRange, orderDateRange, orderTotalPrice);
        this._incrementCompletedOrdersProfit(this._ordersWeeksRange, orderWeekRange, orderTotalPrice);
        this._incrementCompletedOrdersProfit(this._ordersMonthsRange, orderMonthRange, orderTotalPrice);
        this._incrementCompletedOrdersProfit(this._ordersYearsRange, orderYear, orderTotalPrice);
    }
    _incrementTotalOrdersAmount(varToStore, key) {
        if (!varToStore.total[key]) {
            varToStore.total[key] = 0;
        }
        varToStore.total[key] += 1;
    }
    _incrementCanceledOrdersAmount(varToStore, key) {
        if (!varToStore.cancelled[key]) {
            varToStore.cancelled[key] = 0;
        }
        varToStore.cancelled[key] += 1;
    }
    _incrementCompletedOrdersAmount(varToStore, key) {
        if (!varToStore.completed[key]) {
            varToStore.completed[key] = 0;
        }
        varToStore.completed[key] += 1;
    }
    _incrementTotalOrdersProfit(varToStore, key, value) {
        if (!varToStore.total[key]) {
            varToStore.total[key] = 0;
        }
        varToStore.total[key] += value;
    }
    _incrementCanceledOrdersProfit(varToStore, key, value) {
        if (!varToStore.cancelled[key]) {
            varToStore.cancelled[key] = 0;
        }
        varToStore.cancelled[key] += value;
    }
    _incrementCompletedOrdersProfit(varToStore, key, value) {
        if (!varToStore.completed[key]) {
            varToStore.completed[key] = 0;
        }
        varToStore.completed[key] += value;
    }
    _displayOrdersChart() {
        if (this.period === ChartsPanelComponent_1._PERIODS.today) {
            this._setupOrdersChartForToday();
        }
        else if (this.period === ChartsPanelComponent_1._PERIODS.lastWeek) {
            this._setupOrdersChartForLastWeek();
        }
        else if (this.period === ChartsPanelComponent_1._PERIODS.lastMonth) {
            this._setupOrdersChartForLastMonth();
        }
        else if (this.period === ChartsPanelComponent_1._PERIODS.currentYear) {
            this._setupOrdersChartForCurrentYear();
        }
        else if (this.period === ChartsPanelComponent_1._PERIODS.years) {
            this._setupOrdersChartForYears();
        }
        else if (this.period === ChartsPanelComponent_1._PERIODS.rangeDay) {
            this._setupOrdersChartForToday();
        }
        else if (this.period === ChartsPanelComponent_1._PERIODS.rangeDays) {
            this._setupOrdersChartForDaysRange();
        }
        else if (this.period === ChartsPanelComponent_1._PERIODS.rangeWeeks) {
            this._setupOrdersChartForWeeksRange();
        }
        else if (this.period === ChartsPanelComponent_1._PERIODS.rangeMonths) {
            this._setupOrdersChartForMonthsRange();
        }
        else if (this.period === ChartsPanelComponent_1._PERIODS.rangeYears) {
            this._setupOrdersChartForYearsRange();
        }
    }
    _displayProfitChart() {
        if (this.period === ChartsPanelComponent_1._PERIODS.today) {
            this._setupProfitChartForToday();
        }
        else if (this.period === ChartsPanelComponent_1._PERIODS.lastWeek) {
            this._setupProfitChartForLastWeek();
        }
        else if (this.period === ChartsPanelComponent_1._PERIODS.lastMonth) {
            this._setupProfitChartForLastMonth();
        }
        else if (this.period === ChartsPanelComponent_1._PERIODS.currentYear) {
            this._setupProfitChartForCurrentYear();
        }
        else if (this.period === ChartsPanelComponent_1._PERIODS.years) {
            this._setupProfitChartForYears();
        }
        else if (this.period === ChartsPanelComponent_1._PERIODS.rangeDay) {
            this._setupProfitChartForToday();
        }
        else if (this.period === ChartsPanelComponent_1._PERIODS.rangeDays) {
            this._setupProfitChartForDaysRange();
        }
        else if (this.period === ChartsPanelComponent_1._PERIODS.rangeWeeks) {
            this._setupProfitChartForWeeksRange();
        }
        else if (this.period === ChartsPanelComponent_1._PERIODS.rangeMonths) {
            this._setupProfitChartForMonthsRange();
        }
        else if (this.period === ChartsPanelComponent_1._PERIODS.rangeYears) {
            this._setupProfitChartForYearsRange();
        }
    }
    _setupOrdersChartForToday() {
        const hours = this._periodService.getHours();
        const initialLinesData = this._getInitialChartData(hours.length);
        this.ordersChartData = {
            chartLabel: this._ordersChartService.getDataLabels(hours.length, hours),
            linesData: initialLinesData,
        };
        Object.keys(this._ordersToday.total).forEach((key) => {
            const val = this._ordersToday.total[key];
            const indexKey = this._getIndexKey(key, hours.length - 1);
            this.ordersChartData.linesData[0][indexKey] = val;
        });
        Object.keys(this._ordersToday.cancelled).forEach((key) => {
            const val = this._ordersToday.cancelled[key];
            const indexKey = this._getIndexKey(key, hours.length - 1);
            this.ordersChartData.linesData[1][indexKey] = val;
        });
        Object.keys(this._ordersToday.completed).forEach((key) => {
            const val = this._ordersToday.completed[key];
            const indexKey = this._getIndexKey(key, hours.length - 1);
            this.ordersChartData.linesData[2][indexKey] = val;
        });
    }
    _setupOrdersChartForLastWeek() {
        const weeksDays = this._periodService.getWeekDays();
        const initialLinesData = this._getInitialChartData(weeksDays.length);
        this.ordersChartData = {
            chartLabel: this._ordersChartService.getDataLabels(weeksDays.length, weeksDays),
            linesData: initialLinesData,
        };
        Object.keys(this._ordersLastWeek.total).forEach((key) => {
            const val = this._ordersLastWeek.total[key];
            const indexKey = this._getIndexKey(key, weeksDays.length - 1);
            this.ordersChartData.linesData[0][indexKey] = val;
        });
        Object.keys(this._ordersLastWeek.cancelled).forEach((key) => {
            const val = this._ordersLastWeek.cancelled[key];
            const indexKey = this._getIndexKey(key, weeksDays.length - 1);
            this.ordersChartData.linesData[1][indexKey] = val;
        });
        Object.keys(this._ordersLastWeek.completed).forEach((key) => {
            const val = this._ordersLastWeek.completed[key];
            const indexKey = this._getIndexKey(key, weeksDays.length - 1);
            this.ordersChartData.linesData[2][indexKey] = val;
        });
    }
    _setupOrdersChartForLastMonth() {
        const dates = this._periodService.getDatesLastMonth();
        const initialLinesData = this._getInitialChartData(dates.length);
        this.ordersChartData = {
            chartLabel: this._ordersChartService.getDataLabels(dates.length, dates),
            linesData: initialLinesData,
        };
        const indexFromDate = (key) => +key - 1;
        Object.keys(this._ordersLastMonth.total).forEach((key) => {
            const val = this._ordersLastMonth.total[key];
            const indexKey = indexFromDate(key);
            this.ordersChartData.linesData[0][indexKey] = val;
        });
        Object.keys(this._ordersLastMonth.cancelled).forEach((key) => {
            const val = this._ordersLastMonth.cancelled[key];
            const indexKey = indexFromDate(key);
            this.ordersChartData.linesData[1][indexKey] = val;
        });
        Object.keys(this._ordersLastMonth.completed).forEach((key) => {
            const val = this._ordersLastMonth.completed[key];
            const indexKey = indexFromDate(key);
            this.ordersChartData.linesData[2][indexKey] = val;
        });
        console.log(this.ordersChartData.linesData);
    }
    _setupOrdersChartForCurrentYear() {
        const months = this._periodService.getMonths();
        const initialLinesData = this._getInitialChartData(months.length);
        this.ordersChartData = {
            chartLabel: this._ordersChartService.getDataLabels(months.length, months),
            linesData: initialLinesData,
        };
        Object.keys(this._ordersCurrentYear.total).forEach((key) => {
            const val = this._ordersCurrentYear.total[key];
            this.ordersChartData.linesData[0][key] = val;
        });
        Object.keys(this._ordersCurrentYear.cancelled).forEach((key) => {
            const val = this._ordersCurrentYear.cancelled[key];
            this.ordersChartData.linesData[1][key] = val;
        });
        Object.keys(this._ordersCurrentYear.completed).forEach((key) => {
            const val = this._ordersCurrentYear.completed[key];
            this.ordersChartData.linesData[2][key] = val;
        });
    }
    _setupOrdersChartForYears() {
        const years = this._periodService.getYearLabels(this._yearsLabelRange);
        if (years.length === 1) {
            years.push(`${this._yearsLabelRange.to}`);
        }
        const initialLinesData = this._getInitialChartData(years.length);
        this.ordersChartData = {
            chartLabel: this._ordersChartService.getDataLabels(years.length, years),
            linesData: initialLinesData,
        };
        const indexByKey = this._generageIndexesByKeys(years);
        Object.keys(this._ordersYears.total).forEach((key) => {
            const val = this._ordersYears.total[key];
            this.ordersChartData.linesData[0][indexByKey[key]] = val;
        });
        Object.keys(this._ordersYears.cancelled).forEach((key) => {
            const val = this._ordersYears.cancelled[key];
            this.ordersChartData.linesData[1][indexByKey[key]] = val;
        });
        Object.keys(this._ordersYears.completed).forEach((key) => {
            const val = this._ordersYears.completed[key];
            this.ordersChartData.linesData[2][indexByKey[key]] = val;
        });
    }
    _setupOrdersChartForDaysRange() {
        const { keys, labels } = this._periodService.getDatesLabelsKeys(this._dateLabelRange);
        const initialLinesData = this._getInitialChartData(labels.length);
        this.ordersChartData = {
            chartLabel: this._ordersChartService.getDataLabels(labels.length, labels),
            linesData: initialLinesData,
        };
        const indexByKey = this._generageIndexesByKeys(keys);
        Object.keys(this._ordersDateRange.total).forEach((key) => {
            const val = this._ordersDateRange.total[key];
            this.ordersChartData.linesData[0][indexByKey[key]] = val;
        });
        Object.keys(this._ordersDateRange.cancelled).forEach((key) => {
            const val = this._ordersDateRange.cancelled[key];
            this.ordersChartData.linesData[1][indexByKey[key]] = val;
        });
        Object.keys(this._ordersDateRange.completed).forEach((key) => {
            const val = this._ordersDateRange.completed[key];
            this.ordersChartData.linesData[2][indexByKey[key]] = val;
        });
    }
    _setupOrdersChartForWeeksRange() {
        const { keys, labels } = this._periodService.getWeekLabelsKeys(this._dateLabelRange, this._getDateWeekNumber);
        const initialLinesData = this._getInitialChartData(labels.length);
        this.ordersChartData = {
            chartLabel: this._ordersChartService.getDataLabels(labels.length, labels),
            linesData: initialLinesData,
        };
        const indexByKey = this._generageIndexesByKeys(keys);
        Object.keys(this._ordersWeeksRange.total).forEach((key) => {
            const val = this._ordersWeeksRange.total[key];
            this.ordersChartData.linesData[0][indexByKey[key]] = val;
        });
        Object.keys(this._ordersWeeksRange.cancelled).forEach((key) => {
            const val = this._ordersWeeksRange.cancelled[key];
            this.ordersChartData.linesData[1][indexByKey[key]] = val;
        });
        Object.keys(this._ordersWeeksRange.completed).forEach((key) => {
            const val = this._ordersWeeksRange.completed[key];
            this.ordersChartData.linesData[2][indexByKey[key]] = val;
        });
    }
    _setupOrdersChartForMonthsRange() {
        const { keys, labels } = this._periodService.getMonthLabelsKeys(this._dateLabelRange);
        const initialLinesData = this._getInitialChartData(labels.length);
        this.ordersChartData = {
            chartLabel: this._ordersChartService.getDataLabels(labels.length, labels),
            linesData: initialLinesData,
        };
        const indexByKey = this._generageIndexesByKeys(keys);
        Object.keys(this._ordersMonthsRange.total).forEach((key) => {
            const val = this._ordersMonthsRange.total[key];
            this.ordersChartData.linesData[0][indexByKey[key]] = val;
        });
        Object.keys(this._ordersMonthsRange.cancelled).forEach((key) => {
            const val = this._ordersMonthsRange.cancelled[key];
            this.ordersChartData.linesData[1][indexByKey[key]] = val;
        });
        Object.keys(this._ordersMonthsRange.completed).forEach((key) => {
            const val = this._ordersMonthsRange.completed[key];
            this.ordersChartData.linesData[2][indexByKey[key]] = val;
        });
    }
    _setupOrdersChartForYearsRange() {
        const years = this._periodService.getYearsByRange(this._dateLabelRange);
        const initialLinesData = this._getInitialChartData(years.length);
        this.ordersChartData = {
            chartLabel: this._ordersChartService.getDataLabels(years.length, years),
            linesData: initialLinesData,
        };
        const indexByKey = this._generageIndexesByKeys(years);
        Object.keys(this._ordersYearsRange.total).forEach((key) => {
            const val = this._ordersYearsRange.total[key];
            this.ordersChartData.linesData[0][indexByKey[key]] = val;
        });
        Object.keys(this._ordersYearsRange.cancelled).forEach((key) => {
            const val = this._ordersYearsRange.cancelled[key];
            this.ordersChartData.linesData[1][indexByKey[key]] = val;
        });
        Object.keys(this._ordersYearsRange.completed).forEach((key) => {
            const val = this._ordersYearsRange.completed[key];
            this.ordersChartData.linesData[2][indexByKey[key]] = val;
        });
    }
    _setupProfitChartForToday() {
        const hours = this._periodService.getHours();
        const initialLinesData = this._getInitialChartData(hours.length);
        this.profitChartData = {
            chartLabel: this._ordersChartService.getDataLabels(hours.length, hours),
            data: initialLinesData,
        };
        Object.keys(this._ordersToday.total).forEach((key) => {
            const val = this._ordersToday.total[key];
            const indexKey = this._getIndexKey(key, hours.length - 1);
            this.profitChartData.data[2][indexKey] = val;
        });
        Object.keys(this._ordersToday.cancelled).forEach((key) => {
            const val = this._ordersToday.cancelled[key];
            const indexKey = this._getIndexKey(key, hours.length - 1);
            this.profitChartData.data[1][indexKey] = val;
        });
        Object.keys(this._ordersToday.completed).forEach((key) => {
            const val = this._ordersToday.completed[key];
            const indexKey = this._getIndexKey(key, hours.length - 1);
            this.profitChartData.data[0][indexKey] = val;
        });
    }
    _setupProfitChartForLastWeek() {
        const weeks = this._periodService.getWeekDays();
        const initialLinesData = this._getInitialChartData(weeks.length);
        this.profitChartData = {
            chartLabel: this._ordersChartService.getDataLabels(weeks.length, weeks),
            data: initialLinesData,
        };
        Object.keys(this._ordersLastWeek.total).forEach((key) => {
            const val = this._ordersLastWeek.total[key];
            const indexKey = this._getIndexKey(key, weeks.length - 1);
            this.profitChartData.data[2][indexKey] = val;
        });
        Object.keys(this._ordersLastWeek.cancelled).forEach((key) => {
            const val = this._ordersLastWeek.cancelled[key];
            const indexKey = this._getIndexKey(key, weeks.length - 1);
            this.profitChartData.data[1][indexKey] = val;
        });
        Object.keys(this._ordersLastWeek.completed).forEach((key) => {
            const val = this._ordersLastWeek.completed[key];
            const indexKey = this._getIndexKey(key, weeks.length - 1);
            this.profitChartData.data[0][indexKey] = val;
        });
    }
    _setupProfitChartForLastMonth() {
        const dates = this._periodService.getDatesLastMonth();
        const initialLinesData = this._getInitialChartData(dates.length);
        this.profitChartData = {
            chartLabel: this._ordersChartService.getDataLabels(dates.length, dates),
            data: initialLinesData,
        };
        const indexFromDate = (key) => +key - 1;
        Object.keys(this._ordersLastMonth.total).forEach((key) => {
            const val = this._ordersLastMonth.total[key];
            const indexKey = indexFromDate(key);
            this.profitChartData.data[2][indexKey] = val;
        });
        Object.keys(this._ordersLastMonth.cancelled).forEach((key) => {
            const val = this._ordersLastMonth.cancelled[key];
            const indexKey = indexFromDate(key);
            this.profitChartData.data[1][indexKey] = val;
        });
        Object.keys(this._ordersLastMonth.completed).forEach((key) => {
            const val = this._ordersLastMonth.completed[key];
            const indexKey = indexFromDate(key);
            this.profitChartData.data[0][indexKey] = val;
        });
    }
    _setupProfitChartForCurrentYear() {
        const months = this._periodService.getMonths();
        const initialLinesData = this._getInitialChartData(months.length);
        this.profitChartData = {
            chartLabel: this._ordersChartService.getDataLabels(months.length, months),
            data: initialLinesData,
        };
        Object.keys(this._ordersCurrentYear.total).forEach((key) => {
            const val = this._ordersCurrentYear.total[key];
            this.profitChartData.data[2][key] = val;
        });
        Object.keys(this._ordersCurrentYear.cancelled).forEach((key) => {
            const val = this._ordersCurrentYear.cancelled[key];
            this.profitChartData.data[1][key] = val;
        });
        Object.keys(this._ordersCurrentYear.completed).forEach((key) => {
            const val = this._ordersCurrentYear.completed[key];
            this.profitChartData.data[0][key] = val;
        });
    }
    _setupProfitChartForYears() {
        const years = this._periodService.getYearLabels(this._yearsLabelRange);
        const initialLinesData = this._getInitialChartData(years.length);
        this.profitChartData = {
            chartLabel: this._ordersChartService.getDataLabels(years.length, years),
            data: initialLinesData,
        };
        const indexByKey = this._generageIndexesByKeys(years);
        Object.keys(this._ordersYears.total).forEach((key) => {
            const val = this._ordersYears.total[key];
            this.profitChartData.data[2][indexByKey[key]] = val;
        });
        Object.keys(this._ordersYears.cancelled).forEach((key) => {
            const val = this._ordersYears.cancelled[key];
            this.profitChartData.data[1][indexByKey[key]] = val;
        });
        Object.keys(this._ordersYears.completed).forEach((key) => {
            const val = this._ordersYears.completed[key];
            this.profitChartData.data[0][indexByKey[key]] = val;
        });
    }
    _setupProfitChartForDaysRange() {
        const { keys, labels } = this._periodService.getDatesLabelsKeys(this._dateLabelRange);
        const initialLinesData = this._getInitialChartData(labels.length);
        this.profitChartData = {
            chartLabel: this._ordersChartService.getDataLabels(labels.length, labels),
            data: initialLinesData,
        };
        const indexByKey = this._generageIndexesByKeys(keys);
        Object.keys(this._ordersDateRange.total).forEach((key) => {
            const val = this._ordersDateRange.total[key];
            this.profitChartData.data[2][indexByKey[key]] = val;
        });
        Object.keys(this._ordersDateRange.cancelled).forEach((key) => {
            const val = this._ordersDateRange.cancelled[key];
            this.profitChartData.data[1][indexByKey[key]] = val;
        });
        Object.keys(this._ordersDateRange.completed).forEach((key) => {
            const val = this._ordersDateRange.completed[key];
            this.profitChartData.data[0][indexByKey[key]] = val;
        });
    }
    _setupProfitChartForWeeksRange() {
        const { keys, labels } = this._periodService.getWeekLabelsKeys(this._dateLabelRange, this._getDateWeekNumber);
        const initialLinesData = this._getInitialChartData(labels.length);
        this.profitChartData = {
            chartLabel: this._ordersChartService.getDataLabels(labels.length, labels),
            data: initialLinesData,
        };
        const indexByKey = this._generageIndexesByKeys(keys);
        Object.keys(this._ordersWeeksRange.total).forEach((key) => {
            const val = this._ordersWeeksRange.total[key];
            this.profitChartData.data[2][indexByKey[key]] = val;
        });
        Object.keys(this._ordersWeeksRange.cancelled).forEach((key) => {
            const val = this._ordersWeeksRange.cancelled[key];
            this.profitChartData.data[1][indexByKey[key]] = val;
        });
        Object.keys(this._ordersWeeksRange.completed).forEach((key) => {
            const val = this._ordersWeeksRange.completed[key];
            this.profitChartData.data[0][indexByKey[key]] = val;
        });
    }
    _setupProfitChartForMonthsRange() {
        const { keys, labels } = this._periodService.getMonthLabelsKeys(this._dateLabelRange);
        const initialLinesData = this._getInitialChartData(labels.length);
        this.profitChartData = {
            chartLabel: this._ordersChartService.getDataLabels(labels.length, labels),
            data: initialLinesData,
        };
        const indexByKey = this._generageIndexesByKeys(keys);
        Object.keys(this._ordersMonthsRange.total).forEach((key) => {
            const val = this._ordersMonthsRange.total[key];
            this.profitChartData.data[2][indexByKey[key]] = val;
        });
        Object.keys(this._ordersMonthsRange.cancelled).forEach((key) => {
            const val = this._ordersMonthsRange.cancelled[key];
            this.profitChartData.data[1][indexByKey[key]] = val;
        });
        Object.keys(this._ordersMonthsRange.completed).forEach((key) => {
            const val = this._ordersMonthsRange.completed[key];
            this.profitChartData.data[0][indexByKey[key]] = val;
        });
    }
    _setupProfitChartForYearsRange() {
        const years = this._periodService.getYearsByRange(this._dateLabelRange);
        const initialLinesData = this._getInitialChartData(years.length);
        this.profitChartData = {
            chartLabel: this._ordersChartService.getDataLabels(years.length, years),
            data: initialLinesData,
        };
        const indexByKey = this._generageIndexesByKeys(years);
        Object.keys(this._ordersYearsRange.total).forEach((key) => {
            const val = this._ordersYearsRange.total[key];
            this.profitChartData.data[2][indexByKey[key]] = val;
        });
        Object.keys(this._ordersYearsRange.cancelled).forEach((key) => {
            const val = this._ordersYearsRange.cancelled[key];
            this.profitChartData.data[1][indexByKey[key]] = val;
        });
        Object.keys(this._ordersYearsRange.completed).forEach((key) => {
            const val = this._ordersYearsRange.completed[key];
            this.profitChartData.data[0][indexByKey[key]] = val;
        });
    }
    _isOrderTodayPeriodMatch(order) {
        const dateToCompare = new Date();
        const orderDate = new Date(order._createdAt);
        const dateToCompareDay = dateToCompare.getDate();
        const dateToCompareWeek = this._getDateWeekNumber(dateToCompare);
        const dateToCompareMonth = dateToCompare.getMonth();
        const dateToCompareYear = dateToCompare.getFullYear();
        const orderDay = orderDate.getDate();
        const orderWeek = this._getDateWeekNumber(orderDate);
        const orderMonth = orderDate.getMonth();
        const orderYear = orderDate.getFullYear();
        return (orderDay === dateToCompareDay &&
            orderWeek === dateToCompareWeek &&
            orderMonth === dateToCompareMonth &&
            orderYear === dateToCompareYear);
    }
    _isOrderLastWeekPeriodMatch(order) {
        const dateToCompare = new Date();
        const orderDate = new Date(order._createdAt);
        dateToCompare.setDate(dateToCompare.getDate() - 7);
        const dateToCompareWeek = this._getDateWeekNumber(dateToCompare);
        const dateToCompareYear = dateToCompare.getFullYear();
        const orderWeek = this._getDateWeekNumber(orderDate);
        const orderYear = orderDate.getFullYear();
        return ((orderWeek === dateToCompareWeek &&
            orderYear === dateToCompareYear) ||
            ((orderWeek === 1 || orderWeek === 52) &&
                orderWeek === dateToCompareWeek &&
                Math.abs(orderYear - dateToCompareYear) === 1));
    }
    _isOrderLastMonthPeriodMatch(order) {
        const orderDate = new Date(order._createdAt);
        const today = new Date();
        return (orderDate.getFullYear() === today.getFullYear() &&
            orderDate.getMonth() === today.getMonth());
    }
    _isOrderCurrentYearPeriodMatch(order) {
        const dateToCompare = new Date();
        const orderDate = new Date(order._createdAt);
        return orderDate.getFullYear() === dateToCompare.getFullYear();
    }
    _isOrderCustomDayPeriodMatch(order) {
        const dateToCompareDay = this._dateLabelRange.from.getDate();
        const dateToCompareWeek = this._getDateWeekNumber(this._dateLabelRange.from);
        const dateToCompareMonth = this._dateLabelRange.from.getMonth();
        const dateToCompareYear = this._dateLabelRange.from.getFullYear();
        const orderDate = new Date(order._createdAt);
        const orderDay = orderDate.getDate();
        const orderWeek = this._getDateWeekNumber(orderDate);
        const orderMonth = orderDate.getMonth();
        const orderYear = orderDate.getFullYear();
        return (orderDay === dateToCompareDay &&
            orderWeek === dateToCompareWeek &&
            orderMonth === dateToCompareMonth &&
            orderYear === dateToCompareYear);
    }
    _isOrderRangePeriodMatch(order) {
        const from = this._dateLabelRange.from;
        const to = this._dateLabelRange.to;
        const orderDate = new Date(order._createdAt);
        return (orderDate.getTime() >= from.getTime() &&
            orderDate.getTime() <= to.getTime());
    }
    _resetChartData() {
        this._ordersToday = {
            total: {},
            cancelled: {},
            completed: {},
        };
        this._ordersLastWeek = {
            total: {},
            cancelled: {},
            completed: {},
        };
        this._ordersLastMonth = {
            total: {},
            cancelled: {},
            completed: {},
        };
        this._ordersCurrentYear = {
            total: {},
            cancelled: {},
            completed: {},
        };
        this._ordersYears = {
            total: {},
            cancelled: {},
            completed: {},
        };
        this._ordersDateRange = {
            total: {},
            cancelled: {},
            completed: {},
        };
        this._ordersWeeksRange = {
            total: {},
            cancelled: {},
            completed: {},
        };
        this._ordersMonthsRange = {
            total: {},
            cancelled: {},
            completed: {},
        };
        this._ordersYearsRange = {
            total: {},
            cancelled: {},
            completed: {},
        };
    }
    _resetChartPanelSummaryValues() {
        this._chartPanelSummaryTotal = 0;
        this._chartPanelSummaryCompleted = 0;
        this._chartPanelSummaryCancelled = 0;
    }
    _sendRangeIfSelected() {
        this.preservedRanges$.next(this._dateLabelRange);
    }
    _clearRangeFromHeader() {
        this.clearRange$.next();
    }
    _translate(key) {
        let translationResult = '';
        this._translateService.get(key).subscribe((res) => {
            translationResult = res;
        });
        return translationResult;
    }
    _getIndexKey(key, maxIndexValue) {
        let indexKey = +key;
        indexKey = indexKey === 0 ? maxIndexValue : (indexKey -= 1);
        return indexKey;
    }
    _calculateCustomPeriod(daysDiff) {
        switch (true) {
            case daysDiff === 0:
                return ChartsPanelComponent_1._PERIODS.rangeDay;
            case daysDiff > 0 && daysDiff <= 27:
                return ChartsPanelComponent_1._PERIODS.rangeDays;
            case daysDiff > 27 && daysDiff <= 60:
                return ChartsPanelComponent_1._PERIODS.rangeWeeks;
            case daysDiff > 60 && daysDiff <= 365:
                return ChartsPanelComponent_1._PERIODS.rangeMonths;
            case daysDiff > 365:
                return ChartsPanelComponent_1._PERIODS.rangeYears;
        }
    }
    _getInitialChartData(dataLength) {
        const dataRow = Array.from('0'.repeat(dataLength)).map((x) => +x);
        return [
            JSON.parse(JSON.stringify(dataRow)),
            JSON.parse(JSON.stringify(dataRow)),
            JSON.parse(JSON.stringify(dataRow)),
        ];
    }
    _generageIndexesByKeys(keys) {
        const indexByKey = {};
        keys.forEach((key, index) => (indexByKey[key] = index));
        return indexByKey;
    }
    _getDateWeekNumber(date) {
        const target = new Date(date.valueOf());
        const dayNumber = (date.getUTCDay() + 6) % 7;
        let firstThursday;
        target.setUTCDate(target.getUTCDate() - dayNumber + 3);
        firstThursday = target.valueOf();
        target.setUTCMonth(0, 1);
        if (target.getUTCDay() !== 4) {
            target.setUTCMonth(0, 1 + ((4 - target.getUTCDay() + 7) % 7));
        }
        return (Math.ceil((firstThursday - target) / (7 * 24 * 3600 * 1000)) + 1);
    }
    _listenLangChange() {
        this._translateService.onLangChange
            .pipe(takeUntil(this._ngDestroy$))
            .subscribe(() => {
            this._refreshChartData();
            this._setChartsSummary();
        });
    }
    _refreshChartData() {
        switch (this.period) {
            case ChartsPanelComponent_1._PERIODS.lastWeek:
                this._refreshLastWeekChartData();
                break;
            case ChartsPanelComponent_1._PERIODS.lastMonth:
                this._refreshLastMonthChartData();
                break;
            case ChartsPanelComponent_1._PERIODS.currentYear:
                this._refreshCurrentYearChartData();
                break;
            case ChartsPanelComponent_1._PERIODS.rangeDays:
                this._refreshDaysRangeChartData();
                break;
            case ChartsPanelComponent_1._PERIODS.rangeWeeks:
                this._refreshWeeksRangeChartData();
                break;
            case ChartsPanelComponent_1._PERIODS.rangeMonths:
                this._refreshMonthsRangeChartData();
                break;
        }
    }
    _refreshLastWeekChartData() {
        this._isOrderChartSelected
            ? this._setupOrdersChartForLastWeek()
            : this._setupProfitChartForLastWeek();
    }
    _refreshLastMonthChartData() {
        this._isOrderChartSelected
            ? this._setupOrdersChartForLastMonth()
            : this._setupProfitChartForLastMonth();
    }
    _refreshCurrentYearChartData() {
        this._isOrderChartSelected
            ? this._setupOrdersChartForCurrentYear()
            : this._setupProfitChartForCurrentYear();
    }
    _refreshDaysRangeChartData() {
        this._isOrderChartSelected
            ? this._setupOrdersChartForDaysRange()
            : this._setupProfitChartForDaysRange();
    }
    _refreshWeeksRangeChartData() {
        this._isOrderChartSelected
            ? this._setupOrdersChartForWeeksRange()
            : this._setupProfitChartForWeeksRange();
    }
    _refreshMonthsRangeChartData() {
        this._isOrderChartSelected
            ? this._setupOrdersChartForMonthsRange()
            : this._setupProfitChartForMonthsRange();
    }
};
__decorate([
    ViewChild('ordersChart'),
    __metadata("design:type", OrdersChartComponent)
], ChartsPanelComponent.prototype, "ordersChart", void 0);
__decorate([
    ViewChild('profitChart'),
    __metadata("design:type", ProfitChartComponent)
], ChartsPanelComponent.prototype, "profitChart", void 0);
__decorate([
    ViewChild('ordersProfitTab'),
    __metadata("design:type", Object)
], ChartsPanelComponent.prototype, "ordersProfitTab", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], ChartsPanelComponent.prototype, "orders", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ChartsPanelComponent.prototype, "isOrdersLoad", null);
ChartsPanelComponent = ChartsPanelComponent_1 = __decorate([
    Component({
        selector: 'ea-ecommerce-charts',
        styleUrls: ['./charts-panel.component.scss'],
        templateUrl: './charts-panel.component.html',
    }),
    __metadata("design:paramtypes", [TranslateService,
        OrdersProfitChartService,
        PeriodsService,
        OrdersChartService])
], ChartsPanelComponent);
export { ChartsPanelComponent };
//# sourceMappingURL=charts-panel.component.js.map