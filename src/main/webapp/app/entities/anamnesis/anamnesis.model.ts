import { BaseEntity } from './../../shared';

export class Anamnesis implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public patientId?: number,
    ) {
    }
}
