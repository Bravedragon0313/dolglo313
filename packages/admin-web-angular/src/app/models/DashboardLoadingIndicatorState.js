export class DashboardLoadingIndicatorState {
    constructor(totalInfo = {
        customers: true,
        orders: true,
        revenue: true,
    }, todayInfo = {
        customers: true,
        orders: true,
        revenue: true,
    }, chartPanelSummary = true, chart = true) {
        this.totalInfo = totalInfo;
        this.todayInfo = todayInfo;
        this.chartPanelSummary = chartPanelSummary;
        this.chart = chart;
    }
}
//# sourceMappingURL=DashboardLoadingIndicatorState.js.map