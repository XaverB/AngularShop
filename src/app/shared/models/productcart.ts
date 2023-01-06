import { Product } from "./product";

export interface ProductCart { price: number; amount: number; product: Product | null; }