import { __awaiter, __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { UsersService } from '../../../../@core/data/users.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
let CustomerInfoComponent = class CustomerInfoComponent {
    constructor(_userService, _router) {
        this._userService = _userService;
        this._router = _router;
        this.showCode = false;
        this.params$ = this._router.params.subscribe((r) => __awaiter(this, void 0, void 0, function* () {
            this.user = yield this._userService
                .getUserById(r.id)
                .pipe(first())
                .toPromise();
        }));
    }
    ngOnDestroy() {
        if (this.params$) {
            this.params$.unsubscribe();
        }
    }
};
CustomerInfoComponent = __decorate([
    Component({
        selector: 'ea-customer-info',
        styleUrls: ['ea-customer-info.component.scss'],
        templateUrl: './ea-customer-info.component.html',
    }),
    __metadata("design:paramtypes", [UsersService,
        ActivatedRoute])
], CustomerInfoComponent);
export { CustomerInfoComponent };
//# sourceMappingURL=ea-customer-info.component.js.map