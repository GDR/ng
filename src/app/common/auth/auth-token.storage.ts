import {BehaviorSubject, Observable} from "rxjs";
import {Injectable, OpaqueToken} from "@angular/core";
import {AuthToken} from "../model/auth-token.model";
import {CoolLocalStorage} from "angular2-cool-storage";

@Injectable()
export class AuthTokenStorage implements AuthSetter, AuthGetter {

    private authSubj: BehaviorSubject<AuthToken>;
    private AUTH_TOKEN: string = "AUTH_TOKEN";

    constructor(private storage: CoolLocalStorage) {
        this.authSubj = new BehaviorSubject(storage.getObject(this.AUTH_TOKEN));
    }

    setAuthToken(authToken: AuthToken) {
        this.authSubj.next(authToken);
        this.storage.setObject(this.AUTH_TOKEN, authToken);
    }

    getAuthToken(): Observable<AuthToken> {
        return this.authSubj.asObservable();
    }

    removeAuthToken(): void {
        this.storage.setObject(this.AUTH_TOKEN, null);
        this.authSubj.next(null);
    }
}

export interface AuthGetter {
    getAuthToken(): Observable<AuthToken>;
}

export let AUTH_GETTER = new OpaqueToken('auth.getter');

export interface AuthSetter {
    setAuthToken(authToken: AuthToken);
}

export let AUTH_SETTER = new OpaqueToken('auth.setter');