import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let Store = class Store {
    get token() {
        return localStorage.getItem('token') || null;
    }
    set token(token) {
        if (token == null) {
            localStorage.removeItem('token');
        }
        else {
            localStorage.setItem('token', token);
        }
    }
    get adminId() {
        return localStorage.getItem('_adminId') || null;
    }
    set adminId(id) {
        if (id == null) {
            localStorage.removeItem('_adminId');
        }
        else {
            localStorage.setItem('_adminId', id);
        }
    }
    get userId() {
        return localStorage.getItem('_userId') || null;
    }
    set userId(id) {
        if (id == null) {
            localStorage.removeItem('_userId');
        }
        else {
            localStorage.setItem('_userId', id);
        }
    }
    get maintenanceMode() {
        return localStorage.getItem('maintenanceMode') || null;
    }
    get serverConnection() {
        return localStorage.getItem('serverConnection');
    }
    set serverConnection(val) {
        localStorage.setItem('serverConnection', val);
    }
    clearMaintenanceMode() {
        localStorage.removeItem('maintenanceMode');
    }
    clear() {
        localStorage.clear();
    }
};
Store = __decorate([
    Injectable()
], Store);
export { Store };
//# sourceMappingURL=store.service.js.map