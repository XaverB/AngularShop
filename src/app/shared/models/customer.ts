export class Customer {
    constructor(
        public id?: Number,
        public name?: String,
        public email?: String,
        public cartId?: Number,
        public creditCardNumber?: String,
        public creditCardExpiration?: String
    ) { };
}