import {UserError} from "./Error";

export class NotFoundError extends UserError {
    constructor(message) {
        super(message);
    }
    get error() {
        return { message: this.message, statusCode: 404, name: 'Not Found'}
    }
}
