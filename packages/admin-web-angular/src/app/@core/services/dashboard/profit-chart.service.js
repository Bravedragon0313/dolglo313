import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { PeriodsService } from './periods.service';
export class ProfitChart {
}
let ProfitChartService = class ProfitChartService {
    constructor(period) {
        this.period = period;
        this._years = ['2012', '2013', '2014', '2015', '2016', '2017', '2018'];
        this.data = {};
        this.data = {
            today: this.getDataForDayPeriod(),
            lastWeek: this.getDataForWeekPeriod(),
            currentYear: this.getDataForMonthPeriod(),
            years: this.getDataForYearPeriod(),
        };
    }
    getProfitChartData(period) {
        return this.data[period];
    }
    getDataForDayPeriod() {
        const nPoint = this.period.getHours().length;
        return {
            chartLabel: this.period.getHours(),
            data: [
                this.getRandomData(nPoint),
                this.getRandomData(nPoint),
                this.getRandomData(nPoint),
            ],
        };
    }
    getDataForWeekPeriod() {
        const nPoint = this.period.getWeekDays().length;
        return {
            chartLabel: this.period.getWeekDays(),
            data: [
                this.getRandomData(nPoint),
                this.getRandomData(nPoint),
                this.getRandomData(nPoint),
            ],
        };
    }
    getDataForMonthPeriod() {
        const nPoint = this.period.getMonths().length;
        return {
            chartLabel: this.period.getMonths(),
            data: [
                this.getRandomData(nPoint),
                this.getRandomData(nPoint),
                this.getRandomData(nPoint),
            ],
        };
    }
    getDataForYearPeriod() {
        const nPoint = this._years.length;
        return {
            chartLabel: this._years,
            data: [
                this.getRandomData(nPoint),
                this.getRandomData(nPoint),
                this.getRandomData(nPoint),
            ],
        };
    }
    getRandomData(nPoints) {
        return Array.from(Array(nPoints)).map(() => {
            return 0;
        });
    }
};
ProfitChartService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PeriodsService])
], ProfitChartService);
export { ProfitChartService };
//# sourceMappingURL=profit-chart.service.js.map