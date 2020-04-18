import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { BasicInfoFormComponent } from '../../../../@shared/product/forms/basic-info';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../../@core/data/products.service';
import { takeUntil, first } from 'rxjs/operators';
import { ToasterService } from 'angular2-toaster';
import { ProductsCategoryService } from '../../../../@core/data/productsCategory.service';
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
let ProductEditComponent = class ProductEditComponent {
    constructor(formBuilder, activatedRoute, productsService, toasterService, router, productsCategoryService, location) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this.productsService = productsService;
        this.toasterService = toasterService;
        this.router = router;
        this.productsCategoryService = productsCategoryService;
        this.location = location;
        this.ngDestroy$ = new Subject();
        this.form = this.formBuilder.group({
            basicInfo: BasicInfoFormComponent.buildForm(this.formBuilder),
        });
        this.basicInfo = this.form.get('basicInfo');
        this.loadProductCategories();
        this.product$ = this.activatedRoute.params.switchMap((p) => {
            return this.productsService.getProductById(p.id);
        });
    }
    get isProductValid() {
        return this.basicInfo.valid && this.status === 'changes';
    }
    updateProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.basicInfoForm.setupProductCreateObject();
                this.loading = true;
                const updatedProd = yield this.productsService
                    .save({
                    _id: this.product.id,
                    title: res.title,
                    description: res.description,
                    details: res.details,
                    images: res.images,
                    categories: res.categories,
                })
                    .pipe(first())
                    .toPromise();
                this.toasterService.pop('success', `Product ${updatedProd.title} was updated!`);
                this.loading = false;
                yield this.router.navigate([`/products/list/${updatedProd.id}`], {
                    relativeTo: this.activatedRoute,
                });
            }
            catch (err) {
                this.loading = false;
                this.toasterService.pop('error', `Error in updating carrier: "${err.message}"`);
            }
        });
    }
    back() {
        this.location.back();
    }
    ngOnInit() {
        this.basicInfoForm.productCategories = this.productsCategories;
        this.product$.pipe(takeUntil(this.ngDestroy$)).subscribe((product) => {
            this.basicInfoForm.productCategories = this.productsCategories;
            this.basicInfoForm.setValue(product);
            this.product = product;
            this.changes();
        });
    }
    changes() {
        return __awaiter(this, void 0, void 0, function* () {
            this.basicInfo.valueChanges
                .pipe(first())
                .toPromise()
                .then(() => {
                this.status = 'changes';
            });
        });
    }
    loadProductCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            this.productsCategories = yield this.productsCategoryService
                .getCategories()
                .pipe(first())
                .toPromise();
        });
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
};
__decorate([
    ViewChild('basicInfoForm', { static: true }),
    __metadata("design:type", BasicInfoFormComponent)
], ProductEditComponent.prototype, "basicInfoForm", void 0);
ProductEditComponent = __decorate([
    Component({
        styleUrls: ['./product-edit.component.scss'],
        templateUrl: './product-edit.component.html',
    }),
    __metadata("design:paramtypes", [FormBuilder,
        ActivatedRoute,
        ProductsService,
        ToasterService,
        Router,
        ProductsCategoryService,
        Location])
], ProductEditComponent);
export { ProductEditComponent };
//# sourceMappingURL=product-edit.component.js.map