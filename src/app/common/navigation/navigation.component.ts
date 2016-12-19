import {Component} from "@angular/core";
import {AuthTokenStorage} from "../auth/auth-token.storage";
@Component({
    selector: 'navigation',
    templateUrl: 'navigation.component.html'
})
export class NavigationComponent {
    constructor(private authStorage: AuthTokenStorage) {
        authStorage.getAuthToken().subscribe(
            authToken => this.authToken = authToken
        )
    }

    authToken = null;

    signOut() {
        this.authStorage.removeAuthToken();
    }
}