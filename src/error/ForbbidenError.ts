import {UserError} from "./Error";

export class ForbbidenError extends UserError {
    constructor(message) {
        super(message);
    }
    get error() {
        return { message: this.message, statusCode: 403, name: 'Forbbiden'}
    }
}