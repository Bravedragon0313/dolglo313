import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, share } from 'rxjs/operators';
import gql from 'graphql-tag';
let ProductsService = class ProductsService {
    constructor(apollo) {
        this.apollo = apollo;
    }
    getProducts(pagingOptions, existedProductsIds = []) {
        return this.apollo
            .watchQuery({
            query: gql `
					query AllProducts(
						$pagingOptions: PagingOptionsInput
						$existedProductsIds: [String]
					) {
						products(
							pagingOptions: $pagingOptions
							existedProductsIds: $existedProductsIds
						) {
							id
							title {
								locale
								value
							}
							description {
								locale
								value
							}
							details {
								locale
								value
							}
							images {
								locale
								url
								width
								height
								orientation
							}
							categories
						}
					}
				`,
            variables: { pagingOptions, existedProductsIds },
            pollInterval: 2000,
        })
            .valueChanges.pipe(map((res) => res.data.products), share());
    }
    create(product) {
        return this.apollo
            .mutate({
            mutation: gql `
					mutation SaveProduct($product: ProductCreateInput!) {
						createProduct(product: $product) {
							id
							title {
								locale
								value
							}
							description {
								locale
								value
							}
							details {
								locale
								value
							}
							images {
								locale
								url
								width
								height
								orientation
							}
						}
					}
				`,
            variables: {
                product,
            },
        })
            .pipe(map((result) => result.data.createProduct), share());
    }
    save(product) {
        return this.apollo
            .mutate({
            mutation: gql `
					mutation SaveProduct($product: ProductSaveInput!) {
						saveProduct(product: $product) {
							id
						}
					}
				`,
            variables: {
                product,
            },
        })
            .pipe(map((result) => result.data.saveProduct), share());
    }
    removeByIds(ids) {
        return this.apollo
            .mutate({
            mutation: gql `
					mutation RemoveProductsByIds($ids: [String!]!) {
						removeProductsByIds(ids: $ids) {
							n
						}
					}
				`,
            variables: { ids },
        })
            .pipe(map((result) => result.data.removeProductsByIds), share());
    }
    getProductById(id) {
        return this.apollo
            .query({
            query: gql `
					query GetProductById($id: String!) {
						product(id: $id) {
							id
							title {
								locale
								value
							}
							description {
								locale
								value
							}
							details {
								locale
								value
							}
							images {
								locale
								url
								width
								height
								orientation
							}
							categories
						}
					}
				`,
            variables: { id },
        })
            .pipe(map((res) => res.data['product']), share());
    }
    getCountOfProducts(existedProductsIds = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.apollo
                .query({
                query: gql `
					query GetCountOfProducts($existedProductsIds: [String]) {
						getCountOfProducts(
							existedProductsIds: $existedProductsIds
						)
					}
				`,
                variables: { existedProductsIds },
            })
                .toPromise();
            return res.data['getCountOfProducts'];
        });
    }
};
ProductsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Apollo])
], ProductsService);
export { ProductsService };
//# sourceMappingURL=products.service.js.map