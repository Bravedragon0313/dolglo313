import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, share } from 'rxjs/operators';
let CurrenciesService = class CurrenciesService {
    constructor(apollo) {
        this.apollo = apollo;
        this.currencies$ = this.apollo
            .watchQuery({
            query: gql `
				query allCurrencies {
					currencies {
						currencyCode
					}
				}
			`,
            pollInterval: 2000,
        })
            .valueChanges.pipe(map((result) => result.data.currencies), share());
    }
    getCurrencies() {
        return this.currencies$;
    }
    create(createInput) {
        return this.apollo
            .mutate({
            mutation: gql `
					mutation CreateCurrency(
						$createInput: CurrencyCreateInput!
					) {
						createCurrency(createInput: $createInput) {
							success
							message
							data {
								currencyCode
							}
						}
					}
				`,
            variables: {
                createInput,
            },
        })
            .pipe(map((result) => result.data.createCurrency), share());
    }
};
CurrenciesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Apollo])
], CurrenciesService);
export { CurrenciesService };
//# sourceMappingURL=currencies.service.js.map