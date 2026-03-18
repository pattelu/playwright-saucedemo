import { test, expect } from "playwright/test";
import { ApiClient } from "../../src/api/client";
import { loginData } from "../../src/fixtures/users";
import { LoginApi } from "../../src/api/endpoints/login";

test.describe('users api', () => {
    let loginApi: LoginApi;

    test.beforeAll(async () => {
        const client = new ApiClient();
        await client.init();

        loginApi = new LoginApi(client);
    });

    test('POST login user', async () => {
        const loginUser = await loginApi.loginUser(loginData);
        expect(loginUser).toEqual(expect.objectContaining({
            token: expect.any(String),
        }));
    });
});