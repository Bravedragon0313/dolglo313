import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import faker from 'faker';
import _ from 'lodash';
var IsDeliveryTakeawayStatus;
(function (IsDeliveryTakeawayStatus) {
    IsDeliveryTakeawayStatus[IsDeliveryTakeawayStatus["Takeaway"] = 0] = "Takeaway";
    IsDeliveryTakeawayStatus[IsDeliveryTakeawayStatus["IsDeliveryRequired"] = 1] = "IsDeliveryRequired";
    IsDeliveryTakeawayStatus[IsDeliveryTakeawayStatus["Both"] = 2] = "Both";
})(IsDeliveryTakeawayStatus || (IsDeliveryTakeawayStatus = {}));
let FakeDataWarehousesProducts = class FakeDataWarehousesProducts {
    constructor() {
        this._currentTakeawayDeliveryStatus = IsDeliveryTakeawayStatus.Takeaway;
        this._takeawayDeliveryOrBoth = {
            0: { isDeliveryRequired: false, isTakeAway: true },
            1: { isDeliveryRequired: true, isTakeAway: false },
            2: { isDeliveryRequired: true, isTakeAway: true },
        };
    }
    getCreateObject(productId) {
        const currentTakeawayDeliveryState = this._getCurrentWarehouseProductIsDeliveryTakeawayState();
        const price = this.getRandomPrice;
        return {
            product: productId,
            initialPrice: price,
            price,
            isCarrierRequired: true,
            isManufacturing: true,
            count: faker.random.number({ min: 1, max: 10 }),
            isDeliveryRequired: currentTakeawayDeliveryState.isDeliveryRequired,
            isTakeaway: currentTakeawayDeliveryState.isTakeAway,
        };
    }
    getHardcodedCreateObject(productIds) {
        const productCreateObjects = productIds.map((id) => {
            const currentTakeawayDeliveryState = this._getCurrentWarehouseProductIsDeliveryTakeawayState();
            const price = this.getRandomPrice;
            return {
                product: id,
                initialPrice: price + _.random(20),
                price,
                isCarrierRequired: true,
                isManufacturing: true,
                count: 5,
                isDeliveryRequired: currentTakeawayDeliveryState.isDeliveryRequired,
                isTakeaway: currentTakeawayDeliveryState.isTakeAway,
            };
        });
        return productCreateObjects;
    }
    get getRandomPrice() {
        return 5 + faker.random.number(150);
    }
    _setNextWarehouseProductIsDeliveryTakeawayStatus() {
        let result;
        switch (this._currentTakeawayDeliveryStatus) {
            case IsDeliveryTakeawayStatus.Takeaway:
                result = IsDeliveryTakeawayStatus.IsDeliveryRequired;
                break;
            case IsDeliveryTakeawayStatus.IsDeliveryRequired:
                result = IsDeliveryTakeawayStatus.Both;
                break;
            case IsDeliveryTakeawayStatus.Both:
                result = IsDeliveryTakeawayStatus.Takeaway;
                break;
        }
        this._currentTakeawayDeliveryStatus = result;
    }
    _getCurrentWarehouseProductIsDeliveryTakeawayState() {
        const currentTakeawayDeliveryState = this._takeawayDeliveryOrBoth[this._currentTakeawayDeliveryStatus];
        this._setNextWarehouseProductIsDeliveryTakeawayStatus();
        return currentTakeawayDeliveryState;
    }
};
FakeDataWarehousesProducts = __decorate([
    Injectable()
], FakeDataWarehousesProducts);
export default FakeDataWarehousesProducts;
//# sourceMappingURL=warehousesProducts.js.map