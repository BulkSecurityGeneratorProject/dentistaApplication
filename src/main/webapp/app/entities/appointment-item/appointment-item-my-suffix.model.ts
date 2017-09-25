import { BaseEntity } from './../../shared';

export class AppointmentItemMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public item?: string,
        public appointmentId?: number,
        public procedureId?: number,
    ) {
    }
}
