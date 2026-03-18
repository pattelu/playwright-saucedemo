import { ApiClient } from "../client";

export class LoginApi {
    private loginUrl: string;

    constructor(private client: ApiClient) {
        this.loginUrl = "/auth/login";
    }
    async loginUser(loginData: any) {
        const response = await this.client.post(this.loginUrl, loginData);

        if (response.status() !== 201) {
            throw new Error(`Unexpected status ${response.status()}`);
        }

        return response.json();
    }   
}