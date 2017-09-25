import { BaseEntity } from './../../shared';

export class PersonMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public fullName?: string,
        public phone1?: string,
        public phone2?: string,
        public email?: string,
        public cpf?: string,
        public hireDate?: any,
        public isEmployee?: boolean,
        public isDentist?: boolean,
        public isPatient?: boolean,
    ) {
        this.isEmployee = false;
        this.isDentist = false;
        this.isPatient = false;
    }
}
