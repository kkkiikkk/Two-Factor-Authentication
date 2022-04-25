import * as speakeasy from 'speakeasy'
import {GenerateSecretOptions,} from "speakeasy";
import {Error, Message} from "../error";
import * as Bcrypt from 'bcrypt';
import { users } from './user';
import {Request} from "@hapi/hapi";
import config from "../config/config";
import {error} from "../error/tools";

export const generateSecretKey = (options?: GenerateSecretOptions) => {
    return speakeasy.generateSecret(options).base32
}

export const verifyToken = (token: string, secret: string) => {
    const tokenVerified = speakeasy.totp.verify({ secret, token, ...config.auth.twoFactorOptions})
    return { isValid: tokenVerified }
}

export const generateToken = (secret: string,) => {
    return speakeasy.totp({secret, ...config.auth.twoFactorOptions})
}


export function base64(username, password) {
    return 'Basic ' + (Buffer.from(username + ':' + password, 'utf8')).toString('base64');
};

export async function basicValidate(req: Request, secret, password) {
        try{
            const admin = users[secret];
            if (!admin) {
                throw error(Error.USER_NOT_FOUND, Message[Error.USER_NOT_FOUND], {})
            }
            if (!await Bcrypt.compare(password, admin.password)) {
                throw error(Error.INVALID_PASSWORD, Message[Error.INVALID_PASSWORD], {})
            }
            const isValid = verifyToken(req.headers.outp, admin.secret)

            return { isValid, isValid ? { admin, } : {}, };
        } catch(e) {
            console.log(e)
            return e
        }
}
