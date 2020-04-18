import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
let ElapsedTimeComponent = class ElapsedTimeComponent {
    constructor() {
        this.timePasssed = { timePassed: '00 : 00' };
    }
    ngOnInit() {
        if (this._getEndTime) {
            this.timePasssed = JSON.parse(this._getEndTime);
        }
        else {
            this.timer = setInterval(this.updateTime, 1000, [this.timePasssed]);
        }
    }
    updateTime(comp) {
        const currDate = new Date();
        const startDate = new Date(JSON.parse(localStorage.getItem('simulationStartDate')));
        if (startDate) {
            let diff = (currDate.getTime() - startDate.getTime()) / 1000;
            const hoursPassed = Math.floor(diff / 3600);
            diff = diff - hoursPassed * 3600;
            const minutesPassed = Math.floor(diff / 60);
            const secondsPassed = Number((diff - minutesPassed * 60).toFixed(0));
            let minutesPassedStr = '';
            let secondsPassedStr = '';
            let hoursPassedStr = '';
            if (hoursPassed >= 1) {
                hoursPassedStr = hoursPassed.toString() + ' : ';
            }
            minutesPassedStr =
                minutesPassed < 10
                    ? '0' + minutesPassed
                    : minutesPassed.toString();
            secondsPassedStr =
                secondsPassed < 10
                    ? '0' + secondsPassed
                    : secondsPassed.toString();
            comp[0].timePassed =
                hoursPassedStr + minutesPassedStr + ' : ' + secondsPassedStr;
        }
    }
    get _getEndTime() {
        return localStorage.getItem('simulationEndTime');
    }
};
ElapsedTimeComponent = __decorate([
    Component({
        selector: 'ea-elapsed-time',
        templateUrl: './elapsed-time.component.html',
        styleUrls: ['./elapsed-time.component.scss'],
    }),
    __metadata("design:paramtypes", [])
], ElapsedTimeComponent);
export { ElapsedTimeComponent };
//# sourceMappingURL=elapsed-time.component.js.map