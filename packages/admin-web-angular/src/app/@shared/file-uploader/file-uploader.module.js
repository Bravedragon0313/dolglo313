import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploadModule } from 'ng2-file-upload';
import { FileUploaderComponent } from './file-uploader.component';
import { FormsModule } from '@angular/forms';
import { NbButtonModule } from '@nebular/theme';
let FileUploaderModule = class FileUploaderModule {
};
FileUploaderModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            TranslateModule.forChild(),
            FileUploadModule,
            NbButtonModule,
        ],
        exports: [FileUploaderComponent],
        declarations: [FileUploaderComponent],
    })
], FileUploaderModule);
export { FileUploaderModule };
//# sourceMappingURL=file-uploader.module.js.map