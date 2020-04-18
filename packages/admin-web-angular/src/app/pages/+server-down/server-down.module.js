import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ServerDownPage } from './server-down.page';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ThemeModule } from '@app/@theme';
export function HttpLoaderFactory(http) {
    return new TranslateHttpLoader(http, '../../../assets/i18n/', '.json');
}
const routes = [
    {
        path: '',
        component: ServerDownPage,
    },
];
let ServerDownModule = class ServerDownModule {
};
ServerDownModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            ThemeModule,
            RouterModule.forChild(routes),
            TranslateModule.forChild({
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient],
                },
            }),
        ],
        declarations: [ServerDownPage],
    })
], ServerDownModule);
export { ServerDownModule };
//# sourceMappingURL=server-down.module.js.map