import { BaseEntity } from './../../shared';

export class AppointmentItemMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public item?: string,
    ) {
    }
}
