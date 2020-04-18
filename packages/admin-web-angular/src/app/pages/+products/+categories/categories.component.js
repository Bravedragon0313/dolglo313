import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsCategoryService } from '../../../@core/data/productsCategory.service';
import { CategoryCreateComponent } from '../../../@shared/product/categories/category-create/category-create.component';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesTableComponent } from '../../../@shared/product/categories/categories-table/categories-table.component';
import { NotifyService } from '@app/@core/services/notify/notify.service';
let CategoriesComponent = class CategoriesComponent {
    constructor(_productsCategoryService, _modalService, _notifyService) {
        this._productsCategoryService = _productsCategoryService;
        this._modalService = _modalService;
        this._notifyService = _notifyService;
        this.sourceSmartTable = new LocalDataSource();
        this.ngDestroy$ = new Subject();
        this._loadDataSmartTable();
    }
    get hasSelectedCategories() {
        return this.categoriesTable.hasSelectedCategories;
    }
    openWizardNewCategory() {
        this._modalService.open(CategoryCreateComponent, {
            size: 'lg',
            container: 'nb-layout',
            backdrop: 'static',
        });
    }
    deleteSelectedRows() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = this.categoriesTable.selectedCategories;
            const idsArray = [];
            for (const val of categories) {
                idsArray.push(val.id);
            }
            try {
                this.loading = true;
                yield this._productsCategoryService
                    .removeByIds(idsArray)
                    .pipe()
                    .toPromise();
                this.loading = false;
                const message = `Selected are removed!`;
                this._notifyService.success(message);
            }
            catch (error) {
                this.loading = false;
                const message = `Something went wrong!`;
                this._notifyService.error(message);
            }
        });
    }
    _loadDataSmartTable() {
        return __awaiter(this, void 0, void 0, function* () {
            let categories = [];
            this._productsCategoryService
                .getCategories()
                .pipe(takeUntil(this.ngDestroy$))
                .subscribe((c) => {
                categories = c;
                this.categoriesTable.loadDataSmartTable(categories);
            });
        });
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
};
__decorate([
    ViewChild('categoriesTable', { static: true }),
    __metadata("design:type", CategoriesTableComponent)
], CategoriesComponent.prototype, "categoriesTable", void 0);
CategoriesComponent = __decorate([
    Component({
        selector: 'ea-categories',
        templateUrl: './categories.component.html',
        styleUrls: ['/categories.component.scss'],
    }),
    __metadata("design:paramtypes", [ProductsCategoryService,
        NgbModal,
        NotifyService])
], CategoriesComponent);
export { CategoriesComponent };
//# sourceMappingURL=categories.component.js.map