import { __decorate, __metadata } from "tslib";
import { of as observableOf } from 'rxjs';
import { Injectable } from '@angular/core';
import { OrdersChartService } from './orders-chart.service';
import { ProfitChartService } from './profit-chart.service';
export class OrderProfitChartSummary {
}
let OrdersProfitChartService = class OrdersProfitChartService {
    constructor(ordersChartService, profitChartService) {
        this.ordersChartService = ordersChartService;
        this.profitChartService = profitChartService;
        this.summaryNew = [
            {
                values: {
                    total: {
                        title: 'Dummy title',
                        value: 9999,
                    },
                    completed: {
                        title: 'Dummy title completed',
                        value: 9999,
                    },
                    cancelled: {
                        title: 'Dummy title cancelled',
                        value: 8888,
                    },
                },
            },
        ];
    }
    getOrderProfitChartSummary() {
        return observableOf(this.summaryNew);
    }
    getOrdersChartData(period) {
        return observableOf(this.ordersChartService.getOrdersChartData(period));
    }
    getProfitChartData(period) {
        return observableOf(this.profitChartService.getProfitChartData(period));
    }
};
OrdersProfitChartService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [OrdersChartService,
        ProfitChartService])
], OrdersProfitChartService);
export { OrdersProfitChartService };
//# sourceMappingURL=orders-profit-chart.service.js.map