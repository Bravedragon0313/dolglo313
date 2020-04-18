import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'environments/environment';

@Component({
	selector: 'settings',
	styleUrls: ['./settings.component.scss'],
	templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit, OnDestroy {
	public selectedLang: string;
	public defaultLanguage = '';

	constructor(private translateService: TranslateService) {
		this.defaultLanguage = environment['DEFAULT_LANGUAGE'];

		if (translateService.currentLang) {
			const current = translateService.currentLang;
			this.selectedLang = current;
			translateService.setDefaultLang(current);
		} else {
			// TODO: load list of supported languages from config service
			translateService.addLangs([
				'en-US',
				'es-ES',
				'bg-BG',
				'he-IL',
				'ru-RU',
				'fr-FR',
				'it-IT',
			]);

			translateService.setDefaultLang('en-US');

			const browserLang = translateService.getBrowserLang();
			// TODO: load list of supported languages from config service

			if (this.defaultLanguage) {
				translateService.use(this.defaultLanguage);
			} else {
				browserLang.match(/en-US|es-ES|bg-BG|he-IL|ru-RU|fr-FR|it-IT/)
					? browserLang
					: 'en-US';
			}

			this.selectedLang = this.translateService.currentLang;
		}
	}

	ngOnInit() {}

	switchLanguage(language: string) {
		this.translateService.use(language);
	}

	ngOnDestroy() {}
}