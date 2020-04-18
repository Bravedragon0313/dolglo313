import { __awaiter, __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Store } from '@app/@core/data/store.service';
import { environment } from 'environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ServerConnectionService } from '@modules/client.common.angular2/services/server-connection.service';
let ServerDownPage = class ServerDownPage {
    constructor(store, http, location, translate, serverConnectionService) {
        this.store = store;
        this.http = http;
        this.location = location;
        this.translate = translate;
        this.serverConnectionService = serverConnectionService;
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|bg|he|ru/) ? browserLang : 'en-US');
        this.noInternetLogo = environment['NO_INTERNET_LOGO'];
        this.testConnection();
    }
    testConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            this.interval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                yield this.serverConnectionService.checkServerConnection(environment.SERVICES_ENDPOINT, this.store);
                if (Number(this.store.serverConnection) !== 0) {
                    clearInterval(this.interval);
                    this.location.back();
                }
            }), 5000);
        });
    }
    ngOnDestroy() {
        clearInterval(this.interval);
    }
};
ServerDownPage = __decorate([
    Component({
        styleUrls: ['./server-down.page.scss'],
        templateUrl: 'server-down.page.html',
    }),
    __metadata("design:paramtypes", [Store,
        HttpClient,
        Location,
        TranslateService,
        ServerConnectionService])
], ServerDownPage);
export { ServerDownPage };
//# sourceMappingURL=server-down.page.js.map