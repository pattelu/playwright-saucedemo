import { Product } from "./productTypes"

export interface Cart {
    id: number
    userId: number
    products?: Product[]
}