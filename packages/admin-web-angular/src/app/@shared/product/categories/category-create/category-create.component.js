import { __awaiter, __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
import { TranslateService } from '@ngx-translate/core';
import { NotifyService } from '@app/@core/services/notify/notify.service';
import { first } from 'rxjs/operators';
import { ProductsCategoryService } from '@app/@core/data/productsCategory.service';
let CategoryCreateComponent = class CategoryCreateComponent {
    constructor(activeModal, _productLocalesService, _translateService, _notifyService, _productsCategoryService) {
        this.activeModal = activeModal;
        this._productLocalesService = _productLocalesService;
        this._translateService = _translateService;
        this._notifyService = _notifyService;
        this._productsCategoryService = _productsCategoryService;
        this._ngDestroy$ = new Subject();
        this._translateService.setDefaultLang('en');
        this._translateService.use('en');
    }
    ngOnDestroy() {
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
    }
    cancel() {
        this.activeModal.dismiss('canceled');
    }
    createCategory(createObject) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.storybookVersion) {
                this._notifyService.success('Category ' +
                    this.localeTranslate(createObject.name) +
                    ' is added');
                return true;
            }
            try {
                this.loading = true;
                yield this._productsCategoryService
                    .create(createObject)
                    .pipe(first())
                    .toPromise();
                this.loading = false;
                const message = `Category ${this.localeTranslate(createObject.name)} is added!`;
                this._notifyService.success(message);
                this.cancel();
            }
            catch (err) {
                this.loading = false;
                const message = `Something went wrong!`;
                this._notifyService.error(message);
            }
        });
    }
    localeTranslate(member) {
        return this._productLocalesService.getTranslate(member);
    }
};
CategoryCreateComponent = __decorate([
    Component({
        selector: 'ea-category-create',
        templateUrl: './category-create.component.html',
        styleUrls: ['./category-create.component.scss'],
    }),
    __metadata("design:paramtypes", [NgbActiveModal,
        ProductLocalesService,
        TranslateService,
        NotifyService,
        ProductsCategoryService])
], CategoryCreateComponent);
export { CategoryCreateComponent };
//# sourceMappingURL=category-create.component.js.map