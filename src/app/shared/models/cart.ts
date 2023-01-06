import { Discount } from "./discount";
import { Product } from "./product";
import { ProductCart } from "./productcart";

export class Cart {
    constructor(
        public id?: number,
        public customerId?: number | null,
        public sessionId?: string,
        public price?: number,
        public productCarts?: ProductCart[],
        public discounts?: Discount[] | null) { };

    public getProductCount(): number {
        return this.productCarts
            ?.map(pc => pc.amount)
            .reduce((prev, curr) => prev + curr, 0) ?? 0;
    }

    public persist() {
        localStorage.setItem('cart', JSON.stringify(this));
    }

    public static createFromLocalStorage(): Cart {
        const cartJson = localStorage.getItem('cart');
        if (!cartJson) return new Cart();

        return Object.assign(new Cart(), JSON.parse(cartJson));
    }

    public addProduct(product: Product) {
        if (!this.productCarts) this.productCarts = [];

        const productCart = this.productCarts.find(p => p.product?.id == product?.id);
        if (productCart) {
            console.debug(`addProductToCart: productCart for product (${product.id}) available => increasing amount by one.`);
            productCart.amount++;
        } else {
            this.addNewProductCart(product);
        }
    }

    private addNewProductCart(product: Product) {
        console.debug(`addProductToCart: productCart for product (${product.id}) not available => creating new productCart.`);
        const newProductCart = {} as ProductCart;
        newProductCart.amount = 1;
        newProductCart.price = product.price!!;
        newProductCart.product = { ...product }
        this.productCarts?.push(newProductCart);
    }
}