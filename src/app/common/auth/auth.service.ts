import {Inject, Injectable} from "@angular/core";
import {NO_AUTH, HttpWrapper} from "../http.wrapper";
import {AuthTokenStorage, AUTH_SETTER, AuthSetter} from "./auth-token.storage";
import {AuthToken} from "../model/auth-token.model";

@Injectable()
export class AuthService {
    constructor(@Inject(NO_AUTH) private http: HttpWrapper,
                @Inject(AUTH_SETTER) private authStorage: AuthSetter) {
    }

    public authenticate(login: string, password: string) {
        let map = new Map<string, string[]>();
        map.set('login', [login]);
        map.set('password', [password]);

        return this.http.post("https://auth.soft.aero/Auth.svc/authenticate/clear", map).map(
            (response: AuthToken) => {
                this.authStorage.setAuthToken(response);
                return response;
            }
        );
    }
}