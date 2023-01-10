import { Cart } from "./cart";
import { Discount } from "./discount";

export class Order {
    constructor(
        public id?: Number,
        public cartId?: Number,
        public discount?: Number,
        public orderDate?: Date,
        public cart?: Cart,
        public discounts?: Discount[]
    ) {}
}