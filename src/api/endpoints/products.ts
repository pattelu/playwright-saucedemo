import { ApiClient } from "../client";
import { Product } from "../../types/product";

export class ProductsApi {
    constructor(private client: ApiClient) {}

    async getAllProducts(): Promise<Product[]> {
        const response = await this.client.get("/products");

        if (response.status() !== 200) {
            throw new Error(`Unexpected status ${response.status()}`);
        }

        return response.json();
    }

    async getProductById(id: number): Promise<Product> {
        const response = await this.client.get(`/products/${id}`);

        if (response.status() !== 200) {
            throw new Error(`Unexpected status ${response.status()}`);
        }

        return response.json();
    }
}