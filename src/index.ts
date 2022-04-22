import * as Hapi from '@hapi/hapi';
import { Server, } from '@hapi/hapi';
import {Request} from 'hapi'
import {NotFoundError} from "./error";
import { base64, basicValidate, generateSecretKey } from './utils/auth';
import { users } from './utils/user';

export const server = new Hapi.Server({port: 3000,});

export const init = async (isTest = false): Promise<Server> => {
    await server.register(require('@hapi/basic'));
    server.auth.strategy('simple', 'basic', { validate: basicValidate('simple') });
    server.route([{
        method: 'GET', path: '/auth', handler: (r: Request) => {
            try {
                users.john.secret = generateSecretKey()
                console.log(base64(users.john.username,users.john.password))

                return users.john.secret
            }
            catch (e) {
                return e
            }
            }
        },{
            method: 'GET',
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
    }
    catch (err) {
        server.log('[ERROR]', JSON.stringify(err));
    }

    return server;
};

init().then().catch((err) => {
    console.log('[ERROR]', err);
});