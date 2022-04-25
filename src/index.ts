import * as Hapi from '@hapi/hapi';
import { Server, } from '@hapi/hapi';
import {Request} from 'hapi'
import {base64, basicValidate, generateSecretKey, generateToken} from './utils/auth';
import { getUser, delay } from './utils/test';
import * as Cors from 'hapi-cors';
import config from './config/config'
import { users } from './utils/user';


export const server = new Hapi.Server({port: 4000,});

export const init = async (isTest = false): Promise<Server> => {
    await server.register([require('@hapi/basic'),{
        plugin: Cors,
        options: config.cors
    }],
);
    server.auth.strategy('simple', 'basic', { validate: basicValidate });
    server.route([{
        method: 'GET', path: '/auth', handler: (r: Request) => {
            try {
                return { token: generateToken(users.john.secret, 'base32'),  base64: base64(users.john.username,users.john.passwordString)}
            }
            catch (e) {
                return e
            }
            }
        },{
            method: 'POST',
            path: '/hello',
            options: {
                auth: 'simple'
            },
            handler: function (request, h) {
                return 'welcome';
            }
        }])
    try {
        await server.start();
        server.log('[INFO]', `Server running at: ${server.info.uri}`);
        console.log('[INFO]', `Server running at: ${server.info.uri}`);
        await delay(2000)
        await getUser()
    }
    catch (err) {
        server.log('[ERROR]', JSON.stringify(err));
    }

    return server;
};

init().then().catch((err) => {
    console.log('[ERROR]', err);
});
