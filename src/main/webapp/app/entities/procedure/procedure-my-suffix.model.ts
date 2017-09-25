import { BaseEntity } from './../../shared';

export class ProcedureMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public value?: number,
    ) {
    }
}
