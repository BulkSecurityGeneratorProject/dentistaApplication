import { BaseEntity } from './../../shared';

export class PaymentMethod implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
