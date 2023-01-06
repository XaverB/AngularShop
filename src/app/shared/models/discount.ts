export interface CreateDiscount {ActionId: number; RuleId: number;}
export interface Discount {Id: number;discountAction: DiscountAction;  DiscountRule: DiscountRule;}
export interface DiscountAction {Id: number; Name: string;}
export interface DiscountRule {Id: number; Name: string;}