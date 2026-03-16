import { expect } from "playwright/test";

export function validateProduct(product: any) {
    expect(product).toEqual(
        expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            price: expect.any(Number),
            description: expect.any(String),
            category: expect.any(String),
            image: expect.any(String),
            rating: expect.objectContaining({
                rate: expect.any(Number),
                count: expect.any(Number),
            }),
        })
    )
}