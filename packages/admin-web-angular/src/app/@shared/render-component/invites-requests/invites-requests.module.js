import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme';
import { StatusComponent } from './status/status.component';
import { InvitedDateComponent } from './invited-date.component';
const COMPONENTS = [StatusComponent, InvitedDateComponent];
let InvitesRequestsTableModule = class InvitesRequestsTableModule {
};
InvitesRequestsTableModule = __decorate([
    NgModule({
        imports: [CommonModule, ThemeModule],
        declarations: COMPONENTS,
        entryComponents: COMPONENTS,
        exports: COMPONENTS,
    })
], InvitesRequestsTableModule);
export { InvitesRequestsTableModule };
//# sourceMappingURL=invites-requests.module.js.map