export class AuthToken {
    constructor(public issuer: string,
                public issued: string,
                public expires: Date,
                public token: string,
                public thumbprint: string,
                public authenticationValue: string) {
    }
}