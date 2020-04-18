import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { BasicInfoFormComponent } from '../forms';
import { ProductsService } from '../../../@core/data/products.service';
import { first } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { NotifyService } from '@app/@core/services/notify/notify.service';
let ProductCreateComponent = class ProductCreateComponent {
    constructor(_activeModal, _formBuilder, _productsService, _translateService, _notifyService) {
        this._activeModal = _activeModal;
        this._formBuilder = _formBuilder;
        this._productsService = _productsService;
        this._translateService = _translateService;
        this._notifyService = _notifyService;
        this.BUTTON_DONE = 'BUTTON_DONE';
        this.form = this._formBuilder.group({
            basicInfo: BasicInfoFormComponent.buildForm(this._formBuilder),
        });
        this.basicInfo = this.form.get('basicInfo');
    }
    ngOnInit() {
        this.basicInfoForm.productCategories = this.productsCategories;
    }
    get buttonDone() {
        return this._translate(this.BUTTON_DONE);
    }
    createProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.basicInfo.valid) {
                const productCreateObject = yield this.basicInfoForm.setupProductCreateObject();
                try {
                    this.loading = true;
                    yield this._productsService
                        .create(productCreateObject)
                        .pipe(first())
                        .toPromise();
                    this.loading = false;
                    const message = `Product ${productCreateObject.title[0].value} is created`;
                    this._notifyService.success(message);
                    this._cancelModal();
                }
                catch (error) {
                    const message = `Something went wrong!`;
                    this.loading = false;
                    this._notifyService.error(message);
                    this._cancelModal();
                }
            }
        });
    }
    _translate(key) {
        let translationResult = '';
        this._translateService.get(key).subscribe((res) => {
            translationResult = res;
        });
        return translationResult;
    }
    _cancelModal() {
        this._activeModal.dismiss('canceled');
    }
};
__decorate([
    ViewChild('basicInfoForm', { static: true }),
    __metadata("design:type", BasicInfoFormComponent)
], ProductCreateComponent.prototype, "basicInfoForm", void 0);
ProductCreateComponent = __decorate([
    Component({
        selector: 'ea-product-create',
        templateUrl: './product-create.component.html',
        styleUrls: ['./product-create.component.scss'],
    }),
    __metadata("design:paramtypes", [NgbActiveModal,
        FormBuilder,
        ProductsService,
        TranslateService,
        NotifyService])
], ProductCreateComponent);
export { ProductCreateComponent };
//# sourceMappingURL=product-create.component.js.map