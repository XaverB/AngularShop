export class Product {
    constructor(
        public id?: number,
        public shopId?: number,
        public description?: string,
        public imageUrl?: string,
        public label?: string,
        public price?: number
    ) {}
}