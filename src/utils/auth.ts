import * as speakeasy from 'speakeasy'
import {GenerateSecretOptions, TotpOptions} from "speakeasy";
import {NotFoundError} from "../error";

const generateSecretKey = (options?: GenerateSecretOptions) => {
    return speakeasy.generateSecret(options).base32
}

export const generateToken = (options: TotpOptions) => {
    return speakeasy.totp(options)
}

export const verifyToken = (token: string, secret: string, encoding: 'base32') => {
    return speakeasy.totp.verify({ secret, token, encoding })
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

checkAlreadyExist('1')('Created')

checkExist(null)('User not found')
