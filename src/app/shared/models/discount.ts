export interface CreateDiscount { ActionId: number; RuleId: number; }
export class Discount { constructor(public id?: number, public discountAction?: DiscountAction, public discountRule?: DiscountRule) { } }
export class DiscountAction {constructor(public id: number, public name: string) {}}
export class DiscountRule { constructor(public id: number, public name: string) {} }