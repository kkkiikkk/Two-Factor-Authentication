import * as Hapi from '@hapi/hapi';
import { Server, } from '@hapi/hapi';
import {Request} from 'hapi'
import {NotFoundError} from "./error";

export const server = new Hapi.Server({port: 3000,});

export const init = async (isTest = false): Promise<Server> => {
    server.route({
    method: 'GET', path: '/status/{id}', handler: (r: Request) => {
        try {
            return new NotFoundError('Not found id').error
        }
        catch (e) {
            return e
        }
        }})
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
