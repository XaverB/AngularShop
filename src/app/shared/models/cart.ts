import { Coupon } from "./coupon";
import { Discount } from "./discount";
import { Product } from "./product";
import { ProductCart } from "./productcart";

export class Cart {
    constructor(
        public id?: number,
        public customerId?: number | null,
        public sessionId?: string,
        public price: number = 0,
        public discountedPrice: number = 0,
        public productCarts: ProductCart[] = [],
        public discounts: Discount[] = [],
        public coupon?: Coupon) { };

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
            this.price += productCart.price;
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
        this.price += newProductCart.price;
        this.productCarts?.push(newProductCart);
    }

    /** Removes a product. Reduces the count by 1 if there are more than one of this product in this cart */
    public removeProduct(product: Product) {
        if (!this.productCarts) return;

        const productCart = this.productCarts.find(p => p.product?.id == product?.id);
        if (productCart && productCart.amount > 1) {
            console.debug(`removeProduct: productCart for product (${product.id}) available => decreasing amount by one.`);
            productCart.amount--;
            this.price -= productCart.price;
        } else {
            this.price -= productCart?.price ?? 0;
            const newProductCart = this.productCarts.filter(p => p.product?.id != product.id);
            this.productCarts = newProductCart;
        }
    }
}