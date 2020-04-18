import { __decorate, __metadata } from "tslib";
import { Component, ElementRef, EventEmitter, Output, } from '@angular/core';
let TinyMCEComponent = class TinyMCEComponent {
    constructor(host) {
        this.host = host;
        this.editorKeyup = new EventEmitter();
    }
    ngAfterViewInit() {
        tinymce.init({
            target: this.host.nativeElement,
            plugins: ['link', 'paste', 'table'],
            skin_url: 'assets/skins/lightgray',
            setup: (editor) => {
                this.editor = editor;
                editor.on('keyup', () => {
                    this.editorKeyup.emit(editor.getContent());
                });
            },
            height: '320',
        });
    }
    ngOnDestroy() {
        tinymce.remove(this.editor);
    }
};
__decorate([
    Output(),
    __metadata("design:type", Object)
], TinyMCEComponent.prototype, "editorKeyup", void 0);
TinyMCEComponent = __decorate([
    Component({
        selector: 'ngx-tiny-mce',
        template: '',
    }),
    __metadata("design:paramtypes", [ElementRef])
], TinyMCEComponent);
export { TinyMCEComponent };
//# sourceMappingURL=tiny-mce.component.js.map