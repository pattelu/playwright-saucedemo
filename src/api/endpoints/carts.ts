import { Cart } from "../../types/cart";
import { ApiClient } from "../client";

export class CartsApi {
    private cartsUrl: string;

    constructor(private client: ApiClient) {
        this.cartsUrl = "/carts";
    }

    async getAllCarts(): Promise<Cart[]> {
        const response = await this.client.get(this.cartsUrl);

        if (response.status() !== 200) {
            throw new Error(`Unexpected status ${response.status()}`);
        }

        return response.json();
    }

    async getCartById(id: number): Promise<Cart> {
        const response = await this.client.get(`${this.cartsUrl}/${id}`);

        if (response.status() !== 200) {
            throw new Error(`Unexpected status ${response.status()}`);
        }

        return response.json();
    }

    async createCart(cartData: any) {
        const response = await this.client.post(this.cartsUrl, cartData);

        if (response.status() !== 201) {
            throw new Error(`Unexpected status ${response.status()}`);
        }

        return response.json();
    }   

    async updateCart(id: number, cartData: Partial<Cart>): Promise<Cart> {
        const response = await this.client.put(`${this.cartsUrl}/${id}`, cartData);

        if (response.status() !== 200) {
            throw new Error(`Unexpected status ${response.status()}`);
        }

        return response.json();
    }

    async deleteCart(id: number) {
        const response = await this.client.delete(`${this.cartsUrl}/${id}`);

        if (response.status() !== 200) {
            throw new Error(`Unexpected status ${response.status()}`);
        }
    }
}