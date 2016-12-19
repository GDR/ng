import {Component} from "@angular/core";
import {NotificationsService} from "angular2-notifications/src/notifications.service";
import {AuthService} from "../common/auth/auth.service";

@Component({
    selector: 'signin-component',
    templateUrl: './signin.component.html',
    styleUrls: ['signin.component.scss'],
})
export class SignInComponent {

    constructor(private notify: NotificationsService,
                private authService: AuthService) {
    }

    login = '';
    password = '';

    signIn(): void {
        this.authService.authenticate(this.login, this.password)
            .subscribe(
                authToken => {
                    this.notify.success('Auth succeeded', 'Welcome!');
                },
                error => {
                    this.notify.error('Auth failed!', 'Wrong login or password');
                }
            )
    }
}