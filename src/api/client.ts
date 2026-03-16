import { request, APIRequestContext } from "playwright-core";

export class ApiClient {
    private context!: APIRequestContext;

    async init() {
        this.context = await request.newContext({
            baseURL: process.env.API_URL,
            extraHTTPHeaders: {
                'Content-Type': 'application/json'
            }
        });
    }

    async get(url: string) {
        return await this.context.get(url);
    }

    async post(url: string, body: any) {
        return await this.context.post(url, { data: body});
    }

    async put(url: string, body: any) {
        return await this.context.put(url, {data: body});
    }

    async delete(url: string) {
        return await this.context.delete(url);
    }
}