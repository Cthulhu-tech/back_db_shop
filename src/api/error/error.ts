export class ErrorData {

    tokenRequired: string
    serverError: string
    notFoundMessage: string
    constructor() {

        this.tokenRequired = "Token is required"
        this.serverError = "Error, the server does not understand"
        this.notFoundMessage = "Please enter a valid email or password"
    }
}