import * as speakeasy from 'speakeasy'
import {GenerateSecretOptions, TotpOptions} from "speakeasy";
import {NotFoundError} from "../error";
import {ForbbidenError} from "../error";
import * as Bcrypt from 'bcrypt';
import { users } from './user';
import {Request} from "@hapi/hapi";

export const generateSecretKey = (options?: GenerateSecretOptions) => {
    return speakeasy.generateSecret(options).base32
}

export const verifyToken = (token: string, secret: string, encoding: 'base32') => {
    console.log(secret)
    console.log(token)

    const tokenVerified = speakeasy.totp.verify({ secret, token, encoding })

    return { isValid: tokenVerified }
}

export const generateToken = (options: TotpOptions) => {
    return speakeasy.totp(options)
}

export const checkExist = (entity: any) => (message: string) => {
    if (!entity) {
        return new NotFoundError(message).error
    }
}

export const checkAlreadyExist = (entity: any) => (message: string) => {
    if (entity) {
        return new NotFoundError(message).error
    }
}

export const invalidPayload = (entity: any) => (message: string) => {
    if (entity) {
        return new ForbbidenError(message).error
    }
}

export function base64(username, password) {
    return 'Basic ' + (Buffer.from(username + ':' + password, 'utf8')).toString('base64');
};

export function basicValidate(token = 'simple') {
    return async (req: Request, secret, password) => {
        const admin = users[secret];
        checkExist(admin)('User not found')

        invalidPayload(!await Bcrypt.compare(password, admin.password))('Invalid password')

        const isValid = verifyToken(req.params.token, admin.secret, 'base32')

        const credentials = { admin, };

        console.log(isValid)

        return { ...isValid, credentials, };
    };
}
