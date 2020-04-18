import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CKEditorModule } from 'ng2-ckeditor';
import { ThemeModule } from '../../@theme/theme.module';
import { EditorsRoutingModule, routedComponents, } from './editors-routing.module';
let EditorsModule = class EditorsModule {
};
EditorsModule = __decorate([
    NgModule({
        imports: [ThemeModule, EditorsRoutingModule, CKEditorModule],
        declarations: [...routedComponents],
    })
], EditorsModule);
export { EditorsModule };
//# sourceMappingURL=editors.module.js.map