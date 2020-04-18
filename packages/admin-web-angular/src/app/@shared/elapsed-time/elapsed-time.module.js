import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ElapsedTimeComponent } from './elapsed-time.component';
let ElapsedTimeModule = class ElapsedTimeModule {
};
ElapsedTimeModule = __decorate([
    NgModule({
        imports: [CommonModule, FormsModule, TranslateModule.forChild()],
        declarations: [ElapsedTimeComponent],
        entryComponents: [ElapsedTimeComponent],
        exports: [ElapsedTimeComponent],
    })
], ElapsedTimeModule);
export { ElapsedTimeModule };
//# sourceMappingURL=elapsed-time.module.js.map