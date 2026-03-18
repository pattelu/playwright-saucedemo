import { ApiClient } from "../client";
import { Product } from "../../types/productTypes";

export class ProductsApi {
    private productsUrl: string;

    constructor(private client: ApiClient) {
        this.productsUrl = "/products";
    }

    async getAllProducts(): Promise<Product[]> {
        const response = await this.client.get(this.productsUrl);

        if (response.status() !== 200) {
            throw new Error(`Unexpected status ${response.status()}`);
        }

        return response.json();
    }

    async getProductById(id: number): Promise<Product> {
        const response = await this.client.get(`${this.productsUrl}/${id}`);

        if (response.status() !== 200) {
            throw new Error(`Unexpected status ${response.status()}`);
        }

        return response.json();
    }

    async createProduct(productData: any) {
        const response = await this.client.post(this.productsUrl, productData);

        if (response.status() !== 201) {
            throw new Error(`Unexpected status ${response.status()}`);
        }

        return response.json();
    }   

    async updateProduct(id: number, productData: Partial<Product>): Promise<Product> {
        const response = await this.client.put(`${this.productsUrl}/${id}`, productData);

        if (response.status() !== 200) {
            throw new Error(`Unexpected status ${response.status()}`);
        }

        return response.json();
    }

    async deleteProduct(id: number) {
        const response = await this.client.delete(`${this.productsUrl}/${id}`);

        if (response.status() !== 200) {
            throw new Error(`Unexpected status ${response.status()}`);
        }
    }
}