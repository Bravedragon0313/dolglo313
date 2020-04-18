import { __decorate } from "tslib";
import { Component } from '@angular/core';
let TreeComponent = class TreeComponent {
    constructor() {
        this.nodes = [
            {
                name: 'Programming languages by programming paradigm',
                children: [
                    {
                        name: 'Object-oriented programming',
                        children: [
                            {
                                name: 'Java',
                            },
                            {
                                name: 'C++',
                            },
                            {
                                name: 'C#',
                            },
                        ],
                    },
                    {
                        name: 'Prototype-based programming',
                        children: [
                            {
                                name: 'JavaScript',
                            },
                            {
                                name: 'CoffeeScript',
                            },
                            {
                                name: 'Lua',
                            },
                        ],
                    },
                ],
            },
        ];
    }
};
TreeComponent = __decorate([
    Component({
        selector: 'ngx-tree',
        templateUrl: './tree.component.html',
        styleUrls: ['./tree.component.scss'],
    })
], TreeComponent);
export { TreeComponent };
//# sourceMappingURL=tree.component.js.map