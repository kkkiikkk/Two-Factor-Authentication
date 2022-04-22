import * as dotenv from 'dotenv';
import {Encoding} from "speakeasy";

dotenv.config()

export default {
    auth: {
        twoFactorOptions: {
            length: process.env.LENGTH_TOKEN,
            window: Number(process.env.WINDOW),
            time: Number(process.env.TIME),
            encoding: 'base32'
        }
    }
}
