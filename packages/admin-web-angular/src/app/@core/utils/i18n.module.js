import { __decorate, __metadata } from "tslib";
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService, } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http) {
    return new TranslateHttpLoader(http);
}
let I18nModule = class I18nModule {
    constructor(translate) {
        translate.setDefaultLang('en-US');
        translate.use('en-US');
    }
};
I18nModule = __decorate([
    NgModule({
        declarations: [],
        imports: [
            HttpClientModule,
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient],
                },
            }),
        ],
        exports: [TranslateModule],
    }),
    __metadata("design:paramtypes", [TranslateService])
], I18nModule);
export { I18nModule };
//# sourceMappingURL=i18n.module.js.map