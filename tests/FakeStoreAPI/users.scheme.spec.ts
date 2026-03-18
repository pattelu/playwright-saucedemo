import { test } from "playwright/test";
import { ApiClient } from "../../src/api/client";
import { UsersApi } from "../../src/api/endpoints/users";
import { validateUser } from "../../src/utils/schemeValidators";

test.describe('users api scheme', () => {
    let usersApi: UsersApi;

    test.beforeAll(async () => {
        const client = new ApiClient();
        await client.init();

        usersApi = new UsersApi(client);
    });

    test('verify user scheme for all users', async () => {
        const users = await usersApi.getAllUsers();
        users.forEach((user) => {
            validateUser(user);
        })
    });

    test('verify user scheme for single user', async () =>{
        const user = await usersApi.getUserById(1);
        validateUser(user);
    });
});