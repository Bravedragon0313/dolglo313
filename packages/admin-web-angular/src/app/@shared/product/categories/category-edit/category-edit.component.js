import { __awaiter, __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/operators/map';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { ProductsCategoryService } from '../../../../@core/data/productsCategory.service';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
import { NotifyService } from '@app/@core/services/notify/notify.service';
let CategoryEditComponent = class CategoryEditComponent {
    constructor(_activeModal, _productsCategoryService, _productLocalesService, _notifyService) {
        this._activeModal = _activeModal;
        this._productsCategoryService = _productsCategoryService;
        this._productLocalesService = _productLocalesService;
        this._notifyService = _notifyService;
        this._ngDestroy$ = new Subject();
    }
    ngOnDestroy() {
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
    }
    cancel() {
        this._activeModal.dismiss('canceled');
    }
    editCategory(categoryRaw) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._productsCategoryService
                    .update(this.currentCategory.id, categoryRaw)
                    .pipe(first())
                    .toPromise();
                const message = `Category ${this.localeTranslate(categoryRaw.name)} is edited`;
                this._notifyService.success(message);
                this.cancel();
            }
            catch (err) {
                const message = `Something went wrong!`;
                this._notifyService.error(message);
            }
        });
    }
    localeTranslate(member) {
        return this._productLocalesService.getTranslate(member);
    }
};
CategoryEditComponent = __decorate([
    Component({
        selector: 'ea-category-edit',
        templateUrl: './category-edit.component.html',
        styleUrls: ['./category-edit.component.scss'],
    }),
    __metadata("design:paramtypes", [NgbActiveModal,
        ProductsCategoryService,
        ProductLocalesService,
        NotifyService])
], CategoryEditComponent);
export { CategoryEditComponent };
//# sourceMappingURL=category-edit.component.js.map