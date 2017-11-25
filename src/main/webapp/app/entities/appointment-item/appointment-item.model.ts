import { BaseEntity } from './../../shared';

export class AppointmentItem implements BaseEntity {
    constructor(
        public id?: number,
        public item?: string,
        public appointmentId?: number,
        public procedureId?: number,
    ) {
    }
}
