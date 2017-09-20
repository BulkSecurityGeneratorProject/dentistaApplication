import { BaseEntity } from './../../shared';

export class PaymentMethodMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
