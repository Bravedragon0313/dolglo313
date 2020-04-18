import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
let DataService = class DataService {
    constructor(_apollo) {
        this._apollo = _apollo;
    }
    clearAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._apollo
                .query({
                query: gql `
					query ClearAll {
						clearAll
					}
				`,
            })
                .pipe(map((res) => res.data['clearAll']))
                .toPromise();
        });
    }
};
DataService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Apollo])
], DataService);
export { DataService };
//# sourceMappingURL=data.service.js.map