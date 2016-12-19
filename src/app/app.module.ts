import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';

import {AppComponent} from './app.component';
import {AuthTokenStorage, AUTH_GETTER, AUTH_SETTER} from "./common/auth/auth-token.storage";
import {WITH_AUTH, HttpWrapper, NO_AUTH} from "./common/http.wrapper";
import {AuthService} from "./common/auth/auth.service";
import {TrackingService} from "./tracking/tracking.service";
import {TrackingComponent} from "./tracking/tracking.component";
import {NavigationComponent} from "./common/navigation/navigation.component";
import {SimpleNotificationsModule} from "angular2-notifications/src/simple-notifications.module";
import {RouterModule} from "@angular/router";
import {SignInComponent} from "./signin/signin.component";
import {ShipmentsComponent} from "./shipments/shipments.component";
import {CoolStorageModule} from "angular2-cool-storage";
import {ShipmentsService} from "./shipments/shipments.service";

@NgModule({
    declarations: [
        AppComponent,
        TrackingComponent,
        NavigationComponent,
        SignInComponent,
        ShipmentsComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            { path: '', component: TrackingComponent },
            { path: 'track/:prefix/:number', component: TrackingComponent },
            { path: 'signin', component: SignInComponent },
            { path: 'shipments', component: ShipmentsComponent },
        ]),
        SimpleNotificationsModule,
        CoolStorageModule,
    ],
    providers: [
        AuthTokenStorage,
        {provide: AUTH_GETTER, useExisting: AuthTokenStorage},
        {provide: AUTH_SETTER, useExisting: AuthTokenStorage},
        {
            provide: WITH_AUTH,
            useFactory: (http, authGetter) => new HttpWrapper(http, authGetter, true),
            deps: [Http, AUTH_GETTER]
        },
        {
            provide: NO_AUTH,
            useFactory: (http, authGetter) => new HttpWrapper(http, authGetter, false),
            deps: [Http, AUTH_GETTER]
        },
        AuthService,
        TrackingService,
        ShipmentsService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
