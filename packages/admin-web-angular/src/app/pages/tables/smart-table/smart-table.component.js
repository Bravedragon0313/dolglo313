import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
let SmartTableComponent = class SmartTableComponent {
    constructor(service) {
        this.service = service;
        this.settings = {
            add: {
                addButtonContent: '<i class="ion-md-add"></i>',
                createButtonContent: '<i class="ion-md-checkmark"></i>',
                cancelButtonContent: '<i class="ion-md-close"></i>',
            },
            edit: {
                editButtonContent: '<i class="ion-md-create"></i>',
                saveButtonContent: '<i class="ion-md-checkmark"></i>',
                cancelButtonContent: '<i class="ion-md-close"></i>',
            },
            delete: {
                deleteButtonContent: '<i class="ion-md-trash"></i>',
                confirmDelete: true,
            },
            columns: {
                id: {
                    title: 'ID',
                    type: 'number',
                },
                firstName: {
                    title: 'First Name',
                    type: 'string',
                },
                lastName: {
                    title: 'Last Name',
                    type: 'string',
                },
                username: {
                    title: 'Username',
                    type: 'string',
                },
                email: {
                    title: 'E-mail',
                    type: 'string',
                },
                age: {
                    title: 'Age',
                    type: 'number',
                },
            },
        };
        this.source = new LocalDataSource();
        const data = this.service.getData();
        this.source.load(data);
    }
    onDeleteConfirm(event) {
        if (window.confirm('Are you sure you want to delete?')) {
            event.confirm.resolve();
        }
        else {
            event.confirm.reject();
        }
    }
};
SmartTableComponent = __decorate([
    Component({
        selector: 'ngx-smart-table',
        templateUrl: './smart-table.component.html',
        styles: [
            `
			nb-card {
				transform: translate3d(0, 0, 0);
			}
		`,
        ],
    }),
    __metadata("design:paramtypes", [SmartTableService])
], SmartTableComponent);
export { SmartTableComponent };
//# sourceMappingURL=smart-table.component.js.map