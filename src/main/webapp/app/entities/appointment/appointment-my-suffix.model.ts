import { BaseEntity } from './../../shared';

export class AppointmentMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public appointmentDate?: any,
        public paymentMethodId?: number,
        public dentistId?: number,
        public patientId?: number,
        public employeeId?: number,
    ) {
    }
}
