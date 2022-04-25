import { Boom, } from '@hapi/boom';
export function error(code: number, msg: string, data: object): Boom {
    return new Boom(msg, {
        data: {
            code,
            data,
            api: true,
        },
        statusCode: Math.floor(code / 1000),
    });
}
