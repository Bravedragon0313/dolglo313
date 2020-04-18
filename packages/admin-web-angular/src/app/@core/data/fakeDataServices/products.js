import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import faker from 'faker';
import _ from 'lodash';
import { images } from '@modules/server.common/data/image-urls';
import { productNames } from '@modules/server.common/data/food-product-names';
import { TranslateService } from '@ngx-translate/core';
let FakeDataProducts = class FakeDataProducts {
    constructor(translateService) {
        this.translateService = translateService;
        this.locales = [];
        this.locales = this.translateService.getLangs();
    }
    getRandomProduct(inputCategories = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const images = yield this._getRandomImages();
            return {
                title: [
                    {
                        locale: 'en-US',
                        value: this._getRandomProductName(),
                    },
                    {
                        locale: 'he-LI',
                        value: 'רק איזה סוג של מוצר',
                    },
                ],
                description: [
                    {
                        locale: 'en-US',
                        value: faker.lorem.sentence(24),
                    },
                ],
                details: [
                    {
                        locale: 'en-US',
                        value: faker.lorem.sentence(),
                    },
                ],
                images,
                categories: inputCategories,
            };
        });
    }
    getPeperoniAndMushroomPizzaCreateObject(inputCategories) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageElementUS = yield this._getImageMeta('https://res.cloudinary.com/evereq/image/upload/v1538675155/everbie-products-images/pizza_1_jwsppj.jpg');
            const imageUS = {
                url: imageElementUS.src,
                orientation: this._getImageOrientation(imageElementUS),
                width: imageElementUS.width,
                height: imageElementUS.height,
            };
            const randomImages = yield this._getRandomImages(['en-US']);
            const images = randomImages.concat([
                Object.assign({ locale: 'en-US' }, imageUS),
            ]);
            return {
                title: [
                    {
                        locale: 'en-US',
                        value: 'Pepperoni and mushrooms',
                    },
                    {
                        locale: 'he-IL',
                        value: 'פפרוני ופטריות',
                    },
                ],
                description: [
                    {
                        locale: 'en-US',
                        value: 'Peperoni & Mushroom',
                    },
                ],
                details: [
                    {
                        locale: 'en-US',
                        value: '100% tasty peperoni pizza',
                    },
                ],
                images,
                categories: inputCategories,
            };
        });
    }
    getSushiAndCaviarMixCreateObject(inputCategories) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageElementUS = yield this._getImageMeta('https://res.cloudinary.com/evereq/image/upload/v1538675517/sushi_3_1000x1600_yfdxvp_f25npp.jpg');
            const imageUS = {
                url: imageElementUS.src,
                orientation: this._getImageOrientation(imageElementUS),
                width: imageElementUS.width,
                height: imageElementUS.height,
            };
            const randomImages = yield this._getRandomImages(['en-US']);
            const images = randomImages.concat([
                Object.assign({ locale: 'en-US' }, imageUS),
            ]);
            return {
                title: [
                    {
                        locale: 'en-US',
                        value: 'Sushi and caviar mix',
                    },
                    {
                        locale: 'he-IL',
                        value: 'מיקס סושי וקוויאר',
                    },
                ],
                description: [
                    {
                        locale: 'en-US',
                        value: 'Sushi & Caviar mix',
                    },
                ],
                details: [
                    {
                        locale: 'en-US',
                        value: 'Mix Caviar and sushi',
                    },
                ],
                images,
                categories: inputCategories,
            };
        });
    }
    getSushiMixCreateObject(inputCategories) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageElementUS = yield this._getImageMeta('https://res.cloudinary.com/evereq/image/upload/v1538675517/sushi_o8gcsm_fxgdij.jpg');
            const imageUS = {
                url: imageElementUS.src,
                orientation: this._getImageOrientation(imageElementUS),
                width: imageElementUS.width,
                height: imageElementUS.height,
            };
            const randomImages = yield this._getRandomImages(['en-US']);
            const images = randomImages.concat([
                Object.assign({ locale: 'en-US' }, imageUS),
            ]);
            return {
                title: [
                    {
                        locale: 'en-US',
                        value: 'Mix of 23 sushi',
                    },
                    {
                        locale: 'he-IL',
                        value: 'מיקס של 23 סושי',
                    },
                ],
                description: [
                    {
                        locale: 'en-US',
                        value: '23 Sushi Mix',
                    },
                ],
                details: [
                    {
                        locale: 'en-US',
                        value: '23 tasty mix from sushi',
                    },
                ],
                images,
                categories: inputCategories,
            };
        });
    }
    getPastaCreateObject(inputCategories) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageElementUS = yield this._getImageMeta('https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
            const imageElementIL = yield this._getImageMeta('https://images.pexels.com/photos/1373915/pexels-photo-1373915.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
            const imageElementBG = yield this._getImageMeta('https://images.pexels.com/photos/983587/pexels-photo-983587.jpeg?auto=compress&cs=tinysrgb&h=350');
            const imageElementRU = yield this._getImageMeta('https://images.pexels.com/photos/769969/pexels-photo-769969.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
            const imageUS = {
                url: imageElementUS.src,
                orientation: this._getImageOrientation(imageElementUS),
                width: imageElementUS.width,
                height: imageElementUS.height,
            };
            const imageIL = {
                url: imageElementIL.src,
                orientation: this._getImageOrientation(imageElementIL),
                width: imageElementIL.width,
                height: imageElementIL.height,
            };
            const imageBG = {
                url: imageElementBG.src,
                orientation: this._getImageOrientation(imageElementBG),
                width: imageElementBG.width,
                height: imageElementBG.height,
            };
            const imageRU = {
                url: imageElementRU.src,
                orientation: this._getImageOrientation(imageElementRU),
                width: imageElementRU.width,
                height: imageElementRU.height,
            };
            const randomImages = yield this._getRandomImages([
                'en-US',
                'he-IL',
                'ru-RU',
                'bg-BG',
                'fr-FR',
                'it-IT',
            ]);
            const images = randomImages.concat([
                Object.assign({ locale: 'en-US' }, imageUS),
                Object.assign({ locale: 'he-IL' }, imageIL),
                Object.assign({ locale: 'ru-RU' }, imageRU),
                Object.assign({ locale: 'bg-BG' }, imageBG),
                Object.assign({ locale: 'fr-FR' }, imageRU),
                Object.assign({ locale: 'it-IT' }, imageBG),
            ]);
            return {
                title: [
                    {
                        locale: 'en-US',
                        value: 'Spiced pasta',
                    },
                    {
                        locale: 'he-IL',
                        value: 'פסטה מתובלת',
                    },
                ],
                description: [
                    {
                        locale: 'en-US',
                        value: 'Seasoned Pasta',
                    },
                ],
                details: [
                    {
                        locale: 'en-US',
                        value: 'Great seasoned pasta',
                    },
                ],
                images,
                categories: inputCategories,
            };
        });
    }
    getSushiBoxCreateObject(inputCategories) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageElementUS = yield this._getImageMeta('https://res.cloudinary.com/evereq/image/upload/v1538675411/everbie-products-images/sushi_1_vdbljq.jpg');
            const imageUS = {
                url: imageElementUS.src,
                orientation: this._getImageOrientation(imageElementUS),
                width: imageElementUS.width,
                height: imageElementUS.height,
            };
            const randomImages = yield this._getRandomImages(['en-US']);
            const images = randomImages.concat([
                Object.assign({ locale: 'en-US' }, imageUS),
            ]);
            return {
                title: [
                    {
                        locale: 'en-US',
                        value: 'Sushi box',
                    },
                    {
                        locale: 'he-IL',
                        value: 'קופסת סושי',
                    },
                ],
                description: [
                    {
                        locale: 'en-US',
                        value: 'Sushi box',
                    },
                ],
                details: [
                    {
                        locale: 'en-US',
                        value: 'Sushi box',
                    },
                ],
                images,
                categories: inputCategories,
            };
        });
    }
    getPeperoniAndTomatoPizzaCreateObject(inputCategories) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageElementUS = yield this._getImageMeta('https://res.cloudinary.com/evereq/image/upload/v1538675342/pizza_2_duoq0f_zahy7o.jpg');
            const imageUS = {
                url: imageElementUS.src,
                orientation: this._getImageOrientation(imageElementUS),
                width: imageElementUS.width,
                height: imageElementUS.height,
            };
            const randomImages = yield this._getRandomImages(['en-US']);
            const images = randomImages.concat([
                Object.assign({ locale: 'en-US' }, imageUS),
            ]);
            return {
                title: [
                    {
                        locale: 'en-US',
                        value: 'Pepperoni and tomatoes',
                    },
                    {
                        locale: 'he-IL',
                        value: 'פפרוני ועגבניות',
                    },
                ],
                description: [
                    {
                        locale: 'en-US',
                        value: 'Peperoni & Tomato',
                    },
                ],
                details: [
                    {
                        locale: 'en-US',
                        value: '100% muzzarella with tomato and pepperoni served with tomato souce by side.',
                    },
                ],
                images,
                categories: inputCategories,
            };
        });
    }
    _getRandomImages(skipLocales = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield this._getImage();
            return this.locales
                .filter((locale) => !skipLocales.includes(locale))
                .map((locale) => {
                return Object.assign({ locale }, image);
            });
        });
    }
    _getImage() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = images.food[_.random(0, images.food.length - 1)];
            const img = yield this._getImageMeta(url);
            const imgOrientation = this._getImageOrientation(img);
            return {
                url: img.src,
                orientation: imgOrientation,
                width: img.width,
                height: img.height,
            };
        });
    }
    _getImageOrientation(image) {
        return image.width === image.height
            ? 0
            : image.width < image.height
                ? 1
                : 2;
    }
    _getImageMeta(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    }
    _getRandomProductName() {
        return productNames[_.random(0, productNames.length - 1)];
    }
};
FakeDataProducts = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [TranslateService])
], FakeDataProducts);
export default FakeDataProducts;
//# sourceMappingURL=products.js.map