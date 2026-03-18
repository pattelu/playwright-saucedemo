import { User } from "../../types/usersTypes";
import { ApiClient } from "../client";

export class UsersApi {
    private usersUrl: string;

    constructor(private client: ApiClient) {
        this.usersUrl = "/users";
    }

    async getAllUsers(): Promise<User[]> {
        const response = await this.client.get(this.usersUrl);

        if (response.status() !== 200) {
            throw new Error(`Unexpected status ${response.status()}`);
        }

        return response.json();
    }

    async getUserById(id: number): Promise<User> {
        const response = await this.client.get(`${this.usersUrl}/${id}`);

        if (response.status() !== 200) {
            throw new Error(`Unexpected status ${response.status()}`);
        }

        return response.json();
    }

    async createUser(userData: any) {
        const response = await this.client.post(this.usersUrl, userData);

        if (response.status() !== 201) {
            throw new Error(`Unexpected status ${response.status()}`);
        }

        return response.json();
    }   

    async updateUser(id: number, userData: Partial<User>): Promise<User> {
        const response = await this.client.put(`${this.usersUrl}/${id}`, userData);

        if (response.status() !== 200) {
            throw new Error(`Unexpected status ${response.status()}`);
        }

        return response.json();
    }

    async deleteUser(id: number) {
        const response = await this.client.delete(`${this.usersUrl}/${id}`);

        if (response.status() !== 200) {
            throw new Error(`Unexpected status ${response.status()}`);
        }
    }
}