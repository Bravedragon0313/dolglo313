import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterModule } from 'angular2-toaster';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeModule } from '@app/@theme';
import { SidebarInfoBoxComponent } from './sidebar-info-box.component';
let SidebarInfoBoxModule = class SidebarInfoBoxModule {
};
SidebarInfoBoxModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ThemeModule,
            ToasterModule.forRoot(),
            TranslateModule.forChild(),
        ],
        declarations: [SidebarInfoBoxComponent],
        exports: [SidebarInfoBoxComponent],
    })
], SidebarInfoBoxModule);
export { SidebarInfoBoxModule };
//# sourceMappingURL=sidebar-info-box.module.js.map