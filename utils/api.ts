import { ClientRequest } from 'http';
import http from 'http';

export default class Api {
    private static apiRegisterData = JSON.stringify(
        { user: { email: 'default@mail.com', password: 'password', username: 'defaultuser' } },
    );

    private static options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/users',
        method: 'POST',
        headers: {
            'Content-Type': 'application-json',
            'Content-Length': Api.apiRegisterData.length,
        },
    };

    private static auth = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/users',
        method: 'OPTIONS',
        headers: {
            Accept: '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Access-Control-Request-Headers': 'authorization,content-type',
            'Access-Control-Request-Method': 'POST',
            Host: 'localhost:3000',
            Origin: 'http://localhost:8080',
            Referer: 'http://localhost:8080',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
        },
    };

    public static createDefaultUser() {
        const request: ClientRequest = http.request(Api.auth, (response) => {
            if (response.statusCode !== 204) console.error(`Status code is: ${response.statusCode}!`);

            response.on('data', (data) => {
                const parsedData = JSON.parse(data);
                console.error(parsedData);
                if (!parsedData.user?.token) console.error('Error: no token is provided!');
            });
        });
        request.on('error', (error) => {
            throw new Error(`\nERROR:\n${error.message}\n${error.stack}\n`);
        });
        request.write(Api.apiRegisterData);
        request.end();
    }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZjBkYWQ3NjdmZGNjMTQwMDhlN2U2MCIsInVzZXJuYW1lIjoiZmdoZmdoIiwiZXhwIjoxNjE0ODA0MTgzLCJpYXQiOjE2MDk2MjAxODN9.qOYMlh4NCG3P2wAEEbqFKMk7MtuXQhXiYdJ5YX2bLV8
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZjBjMTg5MzdiYTkwMTMwMDRiZDNkMyIsInVzZXJuYW1lIjoibWFyZGVzIiwiZXhwIjoxNjE0ODAxNTI1LCJpYXQiOjE2MDk2MTc1MjV9.S_RVeAJFPycs - G7WdCnRhLVNkecgkj3 - o6hxc74j - aY

// { alg: 'HS256', typ: 'JWT' }
// {
//   id: '5ff0dad767fdcc14008e7e60',
//   username: 'fghfgh',
//   exp: 1614804183,
//   iat: 1609620183
// }
