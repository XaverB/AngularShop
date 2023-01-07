import { Product } from "./product";

export class ProductCart {
    constructor(
        public price: number = 0,
        public amount: number = 0,
        public product?: Product
    ) { }
}