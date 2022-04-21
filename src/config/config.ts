import * as dotenv from 'dotenv';

dotenv.config()

export default {
    auth: {
        twoFactorOptions: {
            length: process.env.LENGTH_TOKEN,
        }
    }
}
