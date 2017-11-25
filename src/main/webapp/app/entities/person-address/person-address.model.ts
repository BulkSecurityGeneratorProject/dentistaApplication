import { BaseEntity } from './../../shared';

export const enum BrazilianStates {
    'AC',
    'AL',
    'AM',
    'AP',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MG',
    'MS',
    'MT',
    'PA',
    'PB',
    'PE',
    'PI',
    'PR',
    'RJ',
    'RN',
    'RO',
    'RR',
    'RS',
    'SC',
    'SE',
    'SP',
    'TO'
}

export const enum LogradouroType {
    'COMMERCIAL',
    'PERSONAL'
}

export class PersonAddress implements BaseEntity {
    constructor(
        public id?: number,
        public logradouro?: string,
        public address?: string,
        public number?: string,
        public state?: BrazilianStates,
        public city?: string,
        public neighborhood?: string,
        public complement?: string,
        public type?: LogradouroType,
        public personId?: number,
    ) {
    }
}
