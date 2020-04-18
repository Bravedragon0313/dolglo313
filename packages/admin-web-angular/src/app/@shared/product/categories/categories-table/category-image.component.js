import { __decorate, __metadata } from "tslib";
import { Component, ViewChild, ElementRef } from '@angular/core';
let CategoryImageComponent = class CategoryImageComponent {
    ngOnInit() {
        this.image.nativeElement.src = this.value;
    }
};
__decorate([
    ViewChild('image', { static: true }),
    __metadata("design:type", ElementRef)
], CategoryImageComponent.prototype, "image", void 0);
CategoryImageComponent = __decorate([
    Component({
        selector: 'category-image',
        styleUrls: ['./category-image.component.scss'],
        template: `
		<div id="category-image"><img #image width="80px" height="80px" /></div>
	`,
    })
], CategoryImageComponent);
export { CategoryImageComponent };
//# sourceMappingURL=category-image.component.js.map