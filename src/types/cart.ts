import { Product } from "./product"

export interface Cart {
    id: number
    userId: number
    products?: Product[]
}