import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
let TrackComponent = class TrackComponent {
    constructor(activeModal) {
        this.activeModal = activeModal;
    }
    cancel() {
        this.activeModal.dismiss('canceled');
    }
    ngOnInit() { }
};
TrackComponent = __decorate([
    Component({
        templateUrl: './track.component.html',
        styleUrls: ['./track.component.scss'],
    }),
    __metadata("design:paramtypes", [NgbActiveModal])
], TrackComponent);
export { TrackComponent };
//# sourceMappingURL=track.component.js.map