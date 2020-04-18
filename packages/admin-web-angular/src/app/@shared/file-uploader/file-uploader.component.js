import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild, } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'environments/environment';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
import { NgModel } from '@angular/forms';
let FileUploaderComponent = class FileUploaderComponent {
    constructor(localeTranslateService) {
        this.localeTranslateService = localeTranslateService;
        this.uploadedImgUrl = new EventEmitter();
        this.uploadedImgObj = new EventEmitter();
    }
    ngOnInit() {
        this._uploaderConfig();
    }
    imageUrlChanged() {
        return __awaiter(this, void 0, void 0, function* () {
            const newValue = this.fileUrl &&
                this.fileUrl.replace(this.oldValue || '', '').trim();
            if (this.uploader.queue.length > 0) {
                this.uploader.queue[this.uploader.queue.length - 1].upload();
            }
            else {
                const image = yield this._setupImage(newValue);
                this.uploadedImgUrl.emit(this.fileUrl);
                this.uploadedImgObj.emit(image);
                this.oldValue = this.fileUrl;
            }
            this.uploader.onSuccessItem = (item, response, status) => {
                const data = JSON.parse(response);
                this.fileUrl = data.url;
                const locale = this.locale;
                const width = data.width;
                const height = data.height;
                const orientation = width !== height ? (width > height ? 2 : 1) : 0;
                const url = data.url;
                const newImage = {
                    locale,
                    url,
                    width,
                    height,
                    orientation,
                };
                this.uploadedImgUrl.emit(data.url);
                this.uploadedImgObj.emit(newImage);
                this.oldValue = this.fileUrl;
            };
        });
    }
    _uploaderConfig() {
        const uploaderOptions = {
            url: environment.API_FILE_UPLOAD_URL,
            isHTML5: true,
            removeAfterUpload: true,
            headers: [
                {
                    name: 'X-Requested-With',
                    value: 'XMLHttpRequest',
                },
            ],
        };
        this.uploader = new FileUploader(uploaderOptions);
        this.uploader.onBuildItemForm = (fileItem, form) => {
            form.append('upload_preset', 'everbie-products-images');
            let tags = 'myphotoalbum';
            if (this.name) {
                form.append('context', `photo=${this.name}`);
                tags = `myphotoalbum,${this.name}`;
            }
            form.append('folder', 'angular_sample');
            form.append('tags', tags);
            form.append('file', fileItem);
            fileItem.withCredentials = false;
            return { fileItem, form };
        };
    }
    _setupImage(imgUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const img = yield this._getImageMeta(imgUrl);
                const width = img['width'];
                const height = img['height'];
                const orientation = width !== height ? (width > height ? 2 : 1) : 0;
                const locale = this.locale;
                const url = imgUrl;
                return {
                    locale,
                    url,
                    width,
                    height,
                    orientation,
                };
            }
            catch (error) {
                return error;
            }
        });
    }
    _getImageMeta(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = (err) => reject(false);
                img.src = url;
            });
        });
    }
};
__decorate([
    ViewChild('shownInput', { static: true }),
    __metadata("design:type", NgModel)
], FileUploaderComponent.prototype, "shownInput", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], FileUploaderComponent.prototype, "placeholder", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], FileUploaderComponent.prototype, "name", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], FileUploaderComponent.prototype, "fileUrl", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], FileUploaderComponent.prototype, "customClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], FileUploaderComponent.prototype, "locale", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], FileUploaderComponent.prototype, "uploadedImgUrl", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], FileUploaderComponent.prototype, "uploadedImgObj", void 0);
FileUploaderComponent = __decorate([
    Component({
        selector: 'e-cu-file-uploader',
        templateUrl: './file-uploader.component.html',
        styleUrls: ['./file-uploader.component.scss'],
    }),
    __metadata("design:paramtypes", [ProductLocalesService])
], FileUploaderComponent);
export { FileUploaderComponent };
//# sourceMappingURL=file-uploader.component.js.map