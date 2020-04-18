import { __awaiter, __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { InviteRouter } from '@modules/client.common.angular2/routers/invite-router.service';
import { UserAuthRouter } from '@modules/client.common.angular2/routers/user-auth-router.service';
import { ToasterService } from 'angular2-toaster';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
let ByCodeModalComponent = class ByCodeModalComponent {
    constructor(inviteRouter, userAuthRouter, toasterService, activeModal) {
        this.inviteRouter = inviteRouter;
        this.userAuthRouter = userAuthRouter;
        this.toasterService = toasterService;
        this.activeModal = activeModal;
    }
    closeModal() {
        this.activeModal.close();
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.code > 999 && this.code < 10000 && this.location) {
                try {
                    const invite = yield this.inviteRouter
                        .getByCode({
                        location: this.location,
                        inviteCode: this.code.toString(),
                    })
                        .pipe(first())
                        .toPromise();
                    if (invite) {
                        const user = yield this.userAuthRouter.register({
                            user: {
                                apartment: invite.apartment,
                                geoLocation: invite.geoLocation,
                            },
                        });
                        this.toasterService.pop('success', `Successful logen with code`);
                        this.activeModal.close(user);
                    }
                    else {
                        this.invalidCodeToaster();
                    }
                }
                catch (error) {
                    this.toasterService.pop('error', `Error: "${error.message}"`);
                }
            }
            else {
                this.invalidCodeToaster();
            }
        });
    }
    invalidCodeToaster() {
        this.toasterService.pop('error', `Invalid code.`);
    }
};
ByCodeModalComponent = __decorate([
    Component({
        templateUrl: './by-code-modal.component.html',
    }),
    __metadata("design:paramtypes", [InviteRouter,
        UserAuthRouter,
        ToasterService,
        NgbActiveModal])
], ByCodeModalComponent);
export { ByCodeModalComponent };
//# sourceMappingURL=by-code-modal.component.js.map