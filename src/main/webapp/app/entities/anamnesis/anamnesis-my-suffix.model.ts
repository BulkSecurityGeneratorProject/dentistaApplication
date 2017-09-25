import { BaseEntity } from './../../shared';

export class AnamnesisMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public patientId?: number,
    ) {
    }
}
