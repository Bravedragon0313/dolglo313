import { __decorate, __metadata } from "tslib";
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormWizardModule } from 'angular2-wizard';
import { SimpleTimer } from 'ng2-simple-timer';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToasterModule } from 'angular2-toaster';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { setContext } from 'apollo-link-context';
import { getOperationAST } from 'graphql/utilities/getOperationAST';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { CommonModule } from '@modules/client.common.angular2/common.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'environments/environment';
import { Store } from './@core/data/store.service';
import { GoogleMapsLoader } from '@modules/client.common.angular2/services/googleMapsLoader';
import { MaintenanceService } from '@modules/client.common.angular2/services/maintenance.service';
import { AppModuleGuard } from './app.module.guard';
import { MaintenanceModuleGuard } from './pages/+maintenance-info/maintenance-info.module.guard';
import { ServerConnectionService } from '@modules/client.common.angular2/services/server-connection.service';
let AppModule = class AppModule {
    constructor(apollo, httpLink, store) {
        this.store = store;
        const http = httpLink.create({
            uri: environment.GQL_ENDPOINT,
        });
        const ws = new WebSocketLink({
            uri: environment.GQL_SUBSCRIPTIONS_ENDPOINT,
            options: {
                reconnect: true,
                lazy: true,
            },
        });
        const authLink = setContext((_, { headers }) => {
            const token = store.token;
            return {
                headers: Object.assign(Object.assign({}, headers), { authorization: token ? `Bearer ${token}` : '' }),
            };
        });
        apollo.create({
            link: authLink.concat(ApolloLink.split((operation) => {
                const operationAST = getOperationAST(operation.query, operation.operationName);
                return (!!operationAST &&
                    operationAST.operation === 'subscription');
            }, ws, http)),
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'network-only',
                    errorPolicy: 'ignore',
                },
                query: {
                    fetchPolicy: 'network-only',
                    errorPolicy: 'all',
                },
                mutate: {
                    errorPolicy: 'all',
                },
            },
            cache: new InMemoryCache(),
        });
    }
};
AppModule = __decorate([
    NgModule({
        imports: [
            BrowserModule,
            FormWizardModule,
            ToasterModule.forRoot(),
            BrowserAnimationsModule,
            HttpClientModule,
            AppRoutingModule,
            ApolloModule,
            HttpLinkModule,
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient],
                },
            }),
            CommonModule.forRoot({ apiUrl: environment.SERVICES_ENDPOINT }),
            NgbModule,
            ThemeModule.forRoot(),
            CoreModule.forRoot(),
        ],
        declarations: [AppComponent],
        bootstrap: [AppComponent],
        providers: [
            ServerConnectionService,
            {
                provide: APP_INITIALIZER,
                useFactory: serverConnectionFactory,
                deps: [ServerConnectionService, Store],
                multi: true,
            },
            GoogleMapsLoader,
            {
                provide: APP_INITIALIZER,
                useFactory: googleMapsLoaderFactory,
                deps: [GoogleMapsLoader],
                multi: true,
            },
            MaintenanceService,
            {
                provide: APP_INITIALIZER,
                useFactory: maintenanceFactory,
                deps: [MaintenanceService],
                multi: true,
            },
            { provide: APP_BASE_HREF, useValue: '/' },
            SimpleTimer,
            AppModuleGuard,
            MaintenanceModuleGuard,
        ],
    }),
    __metadata("design:paramtypes", [Apollo, HttpLink, Store])
], AppModule);
export { AppModule };
export function HttpLoaderFactory(http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export function googleMapsLoaderFactory(provider) {
    return () => provider.load(environment.GOOGLE_MAPS_API_KEY);
}
export function serverConnectionFactory(provider, store) {
    return () => provider.load(environment.SERVICES_ENDPOINT, store);
}
export function maintenanceFactory(provider) {
    return () => provider.load(environment['SETTINGS_APP_TYPE'], environment['SETTINGS_MAINTENANCE_API_URL']);
}
//# sourceMappingURL=app.module.js.map