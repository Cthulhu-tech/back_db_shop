export class ErrorData {

    tokenRequired: string
    serverError: string
    notFoundMessage: string
    NotFound
    constructor() {

        this.NotFound = "Not found"
        this.tokenRequired = "Token is required"
        this.serverError = "Error, the server does not understand"
        this.notFoundMessage = "Please enter a valid email or password"
    }
}