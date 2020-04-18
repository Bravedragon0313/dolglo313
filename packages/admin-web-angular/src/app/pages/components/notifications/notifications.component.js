import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { BodyOutputType, ToasterConfig, ToasterService, } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
let NotificationsComponent = class NotificationsComponent {
    constructor(toasterService) {
        this.toasterService = toasterService;
        this.position = 'toast-top-right';
        this.animationType = 'fade';
        this.title = 'HI there!';
        this.content = `I'm cool toaster!`;
        this.timeout = 5000;
        this.toastsLimit = 5;
        this.type = 'default';
        this.isNewestOnTop = true;
        this.isHideOnClick = true;
        this.isDuplicatesPrevented = false;
        this.isCloseButton = true;
        this.types = ['default', 'info', 'success', 'warning', 'error'];
        this.animations = [
            'fade',
            'flyLeft',
            'flyRight',
            'slideDown',
            'slideUp',
        ];
        this.positions = [
            'toast-top-full-width',
            'toast-bottom-full-width',
            'toast-top-left',
            'toast-top-center',
            'toast-top-right',
            'toast-bottom-right',
            'toast-bottom-center',
            'toast-bottom-left',
            'toast-center',
        ];
        this.quotes = [
            { title: null, body: 'We rock at <i>Angular</i>' },
            { title: null, body: 'Titles are not always needed' },
            { title: null, body: 'Toastr rock!' },
            {
                title: 'What about nice html?',
                body: '<b>Sure you <em>can!</em></b>',
            },
        ];
    }
    makeToast() {
        this.showToast(this.type, this.title, this.content);
    }
    openRandomToast() {
        const typeIndex = Math.floor(Math.random() * this.types.length);
        const quoteIndex = Math.floor(Math.random() * this.quotes.length);
        const type = this.types[typeIndex];
        const quote = this.quotes[quoteIndex];
        this.showToast(type, quote.title, quote.body);
    }
    clearToasts() {
        this.toasterService.clear();
    }
    showToast(type, title, body) {
        this.config = new ToasterConfig({
            positionClass: this.position,
            timeout: this.timeout,
            newestOnTop: this.isNewestOnTop,
            tapToDismiss: this.isHideOnClick,
            preventDuplicates: this.isDuplicatesPrevented,
            animation: this.animationType,
            limit: this.toastsLimit,
        });
        const toast = {
            type,
            title,
            body,
            timeout: this.timeout,
            showCloseButton: this.isCloseButton,
            bodyOutputType: BodyOutputType.TrustedHtml,
        };
        this.toasterService.popAsync(toast);
    }
};
NotificationsComponent = __decorate([
    Component({
        selector: 'ngx-notifications',
        styleUrls: ['./notifications.component.scss'],
        templateUrl: './notifications.component.html',
    }),
    __metadata("design:paramtypes", [ToasterService])
], NotificationsComponent);
export { NotificationsComponent };
//# sourceMappingURL=notifications.component.js.map