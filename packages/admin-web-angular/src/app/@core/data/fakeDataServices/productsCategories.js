var FakeDataProductsCategories_1;
import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { images } from '@modules/server.common/data/image-urls';
let FakeDataProductsCategories = FakeDataProductsCategories_1 = class FakeDataProductsCategories {
    getDifferentKindsOfCategories() {
        return {
            salads: {
                name: [
                    {
                        locale: FakeDataProductsCategories_1.locales.en,
                        value: 'Salads',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.bg,
                        value: 'Салати',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.he,
                        value: 'סלטים',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.ru,
                        value: 'Салаты',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.it,
                        value: 'italian',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.fr,
                        value: 'french',
                    },
                ],
                image: images.productCategories.salads,
            },
            dessert: {
                name: [
                    {
                        locale: FakeDataProductsCategories_1.locales.en,
                        value: 'Desserts',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.bg,
                        value: 'Десерти',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.he,
                        value: 'קינוחים',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.ru,
                        value: 'Десерты',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.it,
                        value: 'italian',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.fr,
                        value: 'french',
                    },
                ],
                image: images.productCategories.dessert,
            },
            drinks: {
                name: [
                    {
                        locale: FakeDataProductsCategories_1.locales.en,
                        value: 'Drinks',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.bg,
                        value: 'Напитки',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.he,
                        value: 'מַשׁקָאוֹת',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.ru,
                        value: 'Напитки',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.it,
                        value: 'italian',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.fr,
                        value: 'french',
                    },
                ],
                image: images.productCategories.drinks,
            },
            meatDishes: {
                name: [
                    {
                        locale: FakeDataProductsCategories_1.locales.en,
                        value: 'Meat Dishes',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.bg,
                        value: 'Месни Ястия',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.he,
                        value: 'כלי אוכל',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.ru,
                        value: 'Мясные Блюда',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.it,
                        value: 'italian',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.fr,
                        value: 'french',
                    },
                ],
                image: images.productCategories.meat,
            },
            soups: {
                name: [
                    {
                        locale: FakeDataProductsCategories_1.locales.en,
                        value: 'Soups',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.bg,
                        value: 'Супи',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.he,
                        value: 'מרקים',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.ru,
                        value: 'Супы',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.it,
                        value: 'italian',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.fr,
                        value: 'french',
                    },
                ],
                image: images.productCategories.soups,
            },
            alcohol: {
                name: [
                    {
                        locale: FakeDataProductsCategories_1.locales.en,
                        value: 'Alcohol',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.bg,
                        value: 'Алкохол',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.he,
                        value: 'כּוֹהֶל',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.ru,
                        value: 'Алкоголь',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.it,
                        value: 'italian',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.fr,
                        value: 'french',
                    },
                ],
                image: images.productCategories.alcohol,
            },
            pizza: {
                name: [
                    {
                        locale: FakeDataProductsCategories_1.locales.en,
                        value: 'Pizza',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.bg,
                        value: 'Пица',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.he,
                        value: 'פיצה',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.ru,
                        value: 'Пицца',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.it,
                        value: 'italian',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.fr,
                        value: 'french',
                    },
                ],
                image: images.productCategories.pizza,
            },
            fastFood: {
                name: [
                    {
                        locale: FakeDataProductsCategories_1.locales.en,
                        value: 'Fast Food',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.bg,
                        value: 'Бърза Храна',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.he,
                        value: 'אוכל מהיר',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.ru,
                        value: 'Быстрое Питание',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.it,
                        value: 'italian',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.fr,
                        value: 'french',
                    },
                ],
                image: images.productCategories.fastFood,
            },
            burger: {
                name: [
                    {
                        locale: FakeDataProductsCategories_1.locales.en,
                        value: 'Burger',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.bg,
                        value: 'Бургер',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.he,
                        value: 'בורגר',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.ru,
                        value: 'Бутерброд',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.it,
                        value: 'italian',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.fr,
                        value: 'french',
                    },
                ],
                image: images.productCategories.burger,
            },
            sushi: {
                name: [
                    {
                        locale: FakeDataProductsCategories_1.locales.en,
                        value: 'Sushi',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.bg,
                        value: 'Суши',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.he,
                        value: 'סושי',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.ru,
                        value: 'Суши',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.it,
                        value: 'italian',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.fr,
                        value: 'french',
                    },
                ],
                image: images.productCategories.sushi,
            },
            pasta: {
                name: [
                    {
                        locale: FakeDataProductsCategories_1.locales.en,
                        value: 'Pasta',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.bg,
                        value: 'Тестени Изделия',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.he,
                        value: 'פיצה קטגוריות',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.ru,
                        value: 'Макаронные Изделия',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.it,
                        value: 'italian',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.fr,
                        value: 'french',
                    },
                ],
                image: images.productCategories.pasta,
            },
            vegetarian: {
                name: [
                    {
                        locale: FakeDataProductsCategories_1.locales.en,
                        value: 'Vegetarian',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.bg,
                        value: 'Вегетариански',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.he,
                        value: 'צמחוני',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.ru,
                        value: 'Вегетарианец',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.it,
                        value: 'italian',
                    },
                    {
                        locale: FakeDataProductsCategories_1.locales.fr,
                        value: 'french',
                    },
                ],
                image: images.productCategories.vegetarian,
            },
        };
    }
};
FakeDataProductsCategories.locales = {
    en: 'en-US',
    bg: 'bg-BG',
    he: 'he-IL',
    ru: 'ru-RU',
    it: 'it-IT',
    fr: 'fr-FR',
};
FakeDataProductsCategories = FakeDataProductsCategories_1 = __decorate([
    Injectable()
], FakeDataProductsCategories);
export default FakeDataProductsCategories;
//# sourceMappingURL=productsCategories.js.map