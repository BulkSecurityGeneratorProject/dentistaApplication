import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Person } from './person.model';
import { PersonPopupService } from './person-popup.service';
import { PersonService } from './person.service';

@Component({
    selector: 'jhi-person-dialog',
    templateUrl: './person-dialog.component.html'
})
export class PersonDialogComponent implements OnInit {

    person: Person;
    isSaving: boolean;
    hasError: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private personService: PersonService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.hasError = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;

        if (this.person.id !== undefined) {
            this.subscribeToSaveResponse(
                this.personService.update(this.person));
        } else {
            this.subscribeToSaveResponse(
                this.personService.create(this.person));
        }
    }

    private subscribeToSaveResponse(result: Observable<Person>) {
        result.subscribe((res: Person) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Person) {
        this.eventManager.broadcast({ name: 'personListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    public validateCPF(): boolean {

        if (this.person.cpf == null) {
            this.hasError = true;
            console.log('nulo');
            return false;
        }

        const cleanCPF = this.person.cpf.replace('.', '').replace('-', '');

        if (cleanCPF.length !== 11) {
            this.hasError = true;
            console.log('tama');
            return false;
        }
        if ((cleanCPF === '00000000000') ||
            (cleanCPF === '11111111111') ||
            (cleanCPF === '22222222222') ||
            (cleanCPF === '33333333333') ||
            (cleanCPF === '44444444444') ||
            (cleanCPF === '55555555555') ||
            (cleanCPF === '66666666666') ||
            (cleanCPF === '77777777777') ||
            (cleanCPF === '88888888888') ||
            (cleanCPF === '99999999999')) {
            this.hasError = true;
            console.log('fake');
            return false;
        }
        let numero = 0;
        let caracter = '';
        const numeros = '0123456789';
        let j = 10;
        let somatorio = 0;
        let resto = 0;
        let digito1 = 0;
        let digito2 = 0;
        let cpfAux = '';
        cpfAux = cleanCPF.substring(0, 9);
        for (let i = 0; i < 9; i++) {
            caracter = cpfAux.charAt(i);
            if (numeros.search(caracter) === -1) {
                this.hasError = true;
                console.log('-1');
                return false;
            }
            numero = Number(caracter);
            somatorio = somatorio + (numero * j);
            j--;
        }
        resto = somatorio % 11;
        digito1 = 11 - resto;
        if (digito1 > 9) {
            digito1 = 0;
        }
        j = 11;
        somatorio = 0;
        cpfAux = cpfAux + digito1;
        for (let h = 0; h < 10; h++) {
            caracter = cpfAux.charAt(h);
            numero = Number(caracter);
            somatorio = somatorio + (numero * j);
            j--;
        }
        resto = somatorio % 11;
        digito2 = 11 - resto;
        if (digito2 > 9) {
            digito2 = 0;
        }
        cpfAux = cpfAux + digito2;
        if (cleanCPF !== cpfAux) {
            this.hasError = true;
            console.log('diff');
            return false;
        }

        this.hasError = false;
        console.log('igu');
        return true;
    }
}

@Component({
    selector: 'jhi-person-popup',
    template: ''
})
export class PersonPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personPopupService: PersonPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.personPopupService
                    .open(PersonDialogComponent as Component, params['id']);
            } else {
                this.personPopupService
                    .open(PersonDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
