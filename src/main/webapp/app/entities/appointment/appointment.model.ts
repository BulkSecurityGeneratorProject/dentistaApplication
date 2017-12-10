import { BaseEntity } from './../../shared';

export class Appointment implements BaseEntity {
    constructor(
        public id?: number,
        public appointmentDate?: any,
        public dentistId?: number,
        public patientId?: number,
        public employeeId?: number,
        public paymentMethodId?: number,
    ) {
    }
}
