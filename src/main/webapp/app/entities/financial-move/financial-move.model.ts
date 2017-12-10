import { BaseEntity } from './../../shared';

export class FinancialMove implements BaseEntity {
    constructor(
        public id?: number,
        public previouBalance?: number,
        public currentBalance?: number,
        public observation?: string,
        public moveDate?: any,
        public appointmentId?: number,
    ) {
    }
}
