import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "./common/auth/auth.service";
import {AUTH_GETTER, AuthGetter} from "./common/auth/auth-token.storage";
import {TrackingService} from "./tracking/tracking.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    ngOnInit(): void {
    }

    constructor(private trackingService: TrackingService) {
    }

    options= {
        timeOut: 3000,
        showProgressBar: false
    }
}
