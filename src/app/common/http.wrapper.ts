import {Http, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import {AuthGetter} from "./auth/auth-token.storage";
import {OpaqueToken, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthToken} from "./model/auth-token.model";

@Injectable()
export class HttpWrapper {
    constructor(private http: Http,
                private authGetter: AuthGetter,
                private withAuth: boolean) {
        this.headers = new Headers({'Accept': 'application/json'});
        this.requestOptions = new RequestOptions({headers: this.headers});
        if (withAuth) {
            authGetter.getAuthToken().subscribe(
                authToken => {
                    this.headers.delete('Authorization');
                    if (authToken != null) {
                        this.headers.append('Authorization', `AsaToken ${authToken.authenticationValue}`);
                        this.requestOptions.headers = this.headers;
                    }
                }
            );
        }
    }

    headers: Headers;
    requestOptions: RequestOptions;

    public get(url: string);
    public get(url: string, params?: Map<string, string[]>): Observable<AuthToken> {
        this.requestOptions.search = new URLSearchParams();
        if (params != null)
            this.requestOptions.search.paramsMap = params;
        return this.http.get(url, this.requestOptions).map(HttpWrapper.extractJson);
    }


    public post(url: string);
    public post(url: string, params: Map<string, string[]>);
    public post(url: string, params?: Map<string, string[]>): Observable<AuthToken> {
        this.requestOptions.search = new URLSearchParams();
        if (params != null)
            this.requestOptions.search.paramsMap = params;
        return this.http.post(url, null, this.requestOptions).map(HttpWrapper.extractJson);
    }

    private static extractJson(response) {
        return response.json();
    }
}


export let WITH_AUTH = new OpaqueToken('http.with_auth');
export let NO_AUTH = new OpaqueToken('http.no_auth');