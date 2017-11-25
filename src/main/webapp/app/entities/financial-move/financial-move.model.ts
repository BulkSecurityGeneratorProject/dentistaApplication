import { BaseEntity } from './../../shared';

export class FinancialMove implements BaseEntity {
    constructor(
        public id?: number,
        public previouBalance?: number,
        public currentBalance?: number,
        public moveDate?: any,
        public observation?: string,
    ) {
    }
}
