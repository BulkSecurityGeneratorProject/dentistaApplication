import { BaseEntity } from './../../shared';

export class Procedure implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public value?: number,
    ) {
    }
}
