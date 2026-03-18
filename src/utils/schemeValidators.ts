import { expect } from "playwright/test";

export function validateProduct(product: any) {
    const baseValidation = {
        id: expect.any(Number),
        title: expect.any(String),
        price: expect.any(Number),
        description: expect.any(String),
        category: expect.any(String),
        image: expect.any(String),
    };

    if (product.rating) {
        (baseValidation as any)['rating'] = expect.objectContaining({
            rate: expect.any(Number),
            count: expect.any(Number),
        });
    };
    expect(product).toEqual(expect.objectContaining(baseValidation));
}

export function validateCart(cart: any){
    expect(cart).toEqual(expect.objectContaining({
        id: expect.any(Number),
        userId: expect.any(Number),
        products: expect.any(Object),
    }));
}

export function validateUser(user: any) {
    expect(user).toEqual(expect.objectContaining({
        id: expect.any(Number),
        username: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
    }));
}