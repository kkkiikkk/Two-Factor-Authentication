export class ApplicationError extends Error {
    get name() {
        return this.constructor.name;
    }
}

export class DatabaseError extends ApplicationError { }

export class UserError extends ApplicationError { }
