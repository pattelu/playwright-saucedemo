import { test, expect } from "playwright/test";
import { ApiClient } from "../../src/api/client";
import { ProductsApi } from "../../src/api/endpoints/products";
import { newProductData, updateProductData } from "../../src/fixtures/products";
import { validateProduct } from "../../src/utils/schemeValidators";

test.describe('products api', () => {
    let productsApi: ProductsApi;

    test.beforeAll(async () => {
        const client = new ApiClient();
        await client.init();

        productsApi = new ProductsApi(client);
    });

    test('GET products list', async () => {
        const products = await productsApi.getAllProducts();
        expect(products.length).toBeGreaterThan(0);
    });

    test('GET product by ID', async () =>{
        const product = await productsApi.getProductById(1);
        expect(product.id).toBe(1);
    });

    test('POST create new product', async () => {
        const createdNewProduct = await productsApi.createProduct(newProductData);
        validateProduct(createdNewProduct);

        expect(createdNewProduct.title).toBe(newProductData.title);
        expect(createdNewProduct.price).toBe(newProductData.price);
    });

    test('PUT update a prodcut', async () => {
        const createdNewProduct = await productsApi.createProduct(newProductData);
        validateProduct(createdNewProduct);
        const updateExistingProduct = await productsApi.updateProduct(createdNewProduct.id, updateProductData);
        const updatedProduct = {...createdNewProduct, ...updateExistingProduct};
        validateProduct(updatedProduct);

        expect(updatedProduct.description).toBe(updateProductData.description)
        expect(updatedProduct.price).toBe(updateProductData.price);
        expect(updatedProduct.title).toBe(newProductData.title);
        expect(updatedProduct.category).toBe(newProductData.category);
    });

    test('DELETE product', async () => {
        const createdNewProduct = await productsApi.createProduct(newProductData);
        validateProduct(createdNewProduct);
        await productsApi.deleteProduct(createdNewProduct.id);
    });
});