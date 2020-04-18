import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { StateService } from '../../../@core/data/state.service';
import { TranslateService } from '@ngx-translate/core';
import { NbThemeService } from '@nebular/theme';
import { environment } from 'environments/environment';
let ThemeSettingsComponent = class ThemeSettingsComponent {
    constructor(stateService, translate, themeService) {
        this.stateService = stateService;
        this.translate = translate;
        this.themeService = themeService;
        this.layouts = [];
        this.sidebars = [];
        this.languages = [
            {
                value: 'en-US',
                name: 'English',
            },
            {
                value: 'bg-BG',
                name: 'Bulgarian',
            },
            {
                value: 'he-IL',
                name: 'Hebrew',
            },
            {
                value: 'ru-RU',
                name: 'Russian',
            },
            {
                value: 'es-ES',
                name: 'Spanish',
            },
            {
                value: 'it-IT',
                name: 'Italian',
            },
            {
                value: 'fr-FR',
                name: 'French',
            },
        ];
        this.themes = [
            {
                value: 'everlight',
                name: 'Ever Light',
            },
            {
                value: 'everdark',
                name: 'Ever Dark',
            },
            {
                value: 'default',
                name: 'White',
            },
            {
                value: 'cosmic',
                name: 'Cosmic',
            },
            {
                value: 'corporate',
                name: 'Corporate',
            },
            {
                value: 'dark',
                name: 'Dark',
            },
        ];
        this.currentTheme = 'everlight';
        this.defaultLanguage = '';
        this.defaultLanguage = environment['DEFAULT_LANGUAGE'];
        translate.addLangs([
            'en-US',
            'bg-BG',
            'he-IL',
            'ru-RU',
            'es-ES',
            'it-IT',
            'fr-FR',
        ]);
        translate.setDefaultLang('en-US');
        const browserLang = translate.getBrowserLang();
        '';
        if (this.defaultLanguage) {
            translate.use(this.defaultLanguage);
        }
        else {
            translate.use(browserLang.match(/en-US|bg-BG|he-IL|ru-RU|es-ES|it-IT|fr-FR/)
                ? browserLang
                : 'en-US');
            '';
        }
        this.stateService
            .getLayoutStates()
            .subscribe((layouts) => (this.layouts = layouts));
        this.stateService
            .getSidebarStates()
            .subscribe((sidebars) => (this.sidebars = sidebars));
    }
    toggleTheme() {
        this.themeService.changeTheme(this.currentTheme);
    }
    switchLanguage(language) {
        if (this.defaultLanguage === 'he-IL') {
            this.stateService.setSidebarState(this.sidebars[1]);
        }
        else {
            this.stateService.setSidebarState(this.sidebars[0]);
        }
        this.translate.use(this.defaultLanguage);
    }
    layoutSelect(layout) {
        this.layouts = this.layouts.map((l) => {
            l.selected = false;
            return l;
        });
        layout.selected = true;
        this.stateService.setLayoutState(layout);
        return false;
    }
    sidebarSelect(sidebars) {
        this.sidebars = this.sidebars.map((s) => {
            s.selected = false;
            return s;
        });
        sidebars.selected = true;
        this.stateService.setSidebarState(sidebars);
        return false;
    }
};
ThemeSettingsComponent = __decorate([
    Component({
        selector: 'ngx-theme-settings',
        styleUrls: ['./theme-settings.component.scss'],
        templateUrl: './theme-settings.component.html',
    }),
    __metadata("design:paramtypes", [StateService,
        TranslateService,
        NbThemeService])
], ThemeSettingsComponent);
export { ThemeSettingsComponent };
//# sourceMappingURL=theme-settings.component.js.map