import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, share } from 'rxjs/operators';
import gql from 'graphql-tag';
import { getDummyImage } from '@modules/server.common/utils';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
let ProductsCategoryService = class ProductsCategoryService {
    constructor(apollo, productLocalesService) {
        this.apollo = apollo;
        this.productLocalesService = productLocalesService;
    }
    getCategories() {
        return this.apollo
            .watchQuery({
            query: gql `
					query allCategories {
						productsCategories {
							id
							image
							name {
								locale
								value
							}
						}
					}
				`,
            pollInterval: 1000,
        })
            .valueChanges.pipe(map((res) => res.data.productsCategories), share());
    }
    create(productsCategory) {
        this.getDefaultImage(productsCategory);
        return this.apollo
            .mutate({
            mutation: gql `
					mutation SaveProductsCategory(
						$productsCategory: ProductsCategoriesCreateInput!
					) {
						createProductsCategory(createInput: $productsCategory) {
							id
							image
							name {
								locale
								value
							}
						}
					}
				`,
            variables: {
                productsCategory,
            },
        })
            .pipe(map((result) => result.data.createProductsCategory), share());
    }
    update(id, productsCategory) {
        this.getDefaultImage(productsCategory);
        return this.apollo
            .mutate({
            mutation: gql `
					mutation UpdateProductsCategory(
						$id: String!
						$productsCategory: ProductsCategoriesCreateInput!
					) {
						updateProductsCategory(
							id: $id
							updateInput: $productsCategory
						) {
							id
							image
							name {
								locale
								value
							}
						}
					}
				`,
            variables: {
                id,
                productsCategory,
            },
        })
            .pipe(map((result) => result.data.updateProductsCategory), share());
    }
    removeByIds(ids) {
        return this.apollo.mutate({
            mutation: gql `
				mutation removeProductsCategoriesByIds($ids: [String!]!) {
					removeProductsCategoriesByIds(ids: $ids) {
						ok
						n
					}
				}
			`,
            variables: { ids },
        });
    }
    getDefaultImage(data) {
        if (!data.image) {
            data.image = getDummyImage(300, 300, this.productLocalesService
                .getTranslate(data.name)
                .charAt(0)
                .toUpperCase());
        }
    }
};
ProductsCategoryService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Apollo,
        ProductLocalesService])
], ProductsCategoryService);
export { ProductsCategoryService };
//# sourceMappingURL=productsCategory.service.js.map