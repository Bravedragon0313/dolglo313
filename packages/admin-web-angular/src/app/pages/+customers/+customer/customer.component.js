import { __awaiter, __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../@core/data/users.service';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
let CustomerComponent = class CustomerComponent {
    constructor(_userService, _router, _route) {
        this._userService = _userService;
        this._router = _router;
        this._route = _route;
        this.users = [];
        this._ngDestroy$ = new Subject();
    }
    ngOnInit() {
        this.user$ = this._router.params.switchMap((p) => {
            return this._userService.getUserById(p.id);
        });
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.loadUsers();
        }))();
    }
    ngOnDestroy() {
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
    }
    loadUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            this._userService
                .getUsers()
                .pipe(takeUntil(this._ngDestroy$))
                .subscribe((users) => {
                this.users = users;
                this._selectCurrentUser();
            });
        });
    }
    customerSelect(e) {
        return __awaiter(this, void 0, void 0, function* () {
            this._route.navigate([`/customers/list/${e.id}`]);
            yield this.loadUsers();
        });
    }
    _selectCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const routeParams = yield this._router.params.pipe(first()).toPromise();
            this.selectedUser = this.users.filter((u) => u.id === routeParams.id)[0];
        });
    }
};
CustomerComponent = __decorate([
    Component({
        selector: 'ea-customer',
        templateUrl: './customer.component.html',
        styleUrls: ['./customer.component.scss'],
    }),
    __metadata("design:paramtypes", [UsersService,
        ActivatedRoute,
        Router])
], CustomerComponent);
export { CustomerComponent };
//# sourceMappingURL=customer.component.js.map