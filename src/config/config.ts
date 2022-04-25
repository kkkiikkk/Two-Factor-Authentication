import {config} from 'dotenv';
import {Encoding} from "speakeasy";
config()



export default {
    cors: {
        origins: JSON.parse(String(process.env.CORS_ORIGINS)),
        methods: JSON.parse(String(process.env.CORS_METHODS)),
        headers: JSON.parse(String(process.env.CORS_HEADERS)),
        maxAge: Number(process.env.CORS_MAX_AGE),
        allowCredentials: String(process.env.CORS_ALLOW_CREDENTIALS),
        exposeHeaders: JSON.parse(String(process.env.CORS_EXPOSE_HEADERS)),
    },
    auth: {
        twoFactorOptions: {
            window: Number(process.env.WINDOW),
            time: Number(process.env.TIME),
            encoding: String(process.env.ENCODING) as Encoding
        }
    }
}
