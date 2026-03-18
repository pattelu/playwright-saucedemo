import { test, expect } from "playwright/test";
import { ApiClient } from "../../src/api/client";
import { UsersApi } from "../../src/api/endpoints/users";
import { newUserData, updateUserData } from "../../src/fixtures/users";

test.describe('users api', () => {
    let usersApi: UsersApi;

    test.beforeAll(async () => {
        const client = new ApiClient();
        await client.init();

        usersApi = new UsersApi(client);
    });

    test('GET users list', async () => {
        const users = await usersApi.getAllUsers();
        expect(users.length).toBeGreaterThan(0);
    });

    test('GET user by ID', async () =>{
        const user = await usersApi.getUserById(1);
        expect(user.id).toBe(1);
    });

    test('POST add new user', async () => {
        const addNewUser = await usersApi.createUser(newUserData);
        expect(addNewUser).toEqual(expect.objectContaining({
            id: expect.any(Number),
        }));
    });

    test('PUT update an existing user', async () => {
        const addNewUser = await usersApi.createUser(newUserData);
        expect(addNewUser).toEqual(expect.objectContaining({
            id: expect.any(Number),
        }));
        const updateExistingUser = await usersApi.updateUser(addNewUser.id, updateUserData);
        const updatedUser = {...addNewUser, ...updateExistingUser};
        expect(updatedUser).toEqual(expect.objectContaining({
            id: expect.any(Number),
        }));
        expect(updatedUser.password).toBe(updateUserData.password);
    });

    test('DELETE user', async () => {
        const user = await usersApi.createUser(newUserData);
        expect(user).toEqual(expect.objectContaining({
            id: expect.any(Number),
        }));
        await usersApi.deleteUser(user.id);
    });
});