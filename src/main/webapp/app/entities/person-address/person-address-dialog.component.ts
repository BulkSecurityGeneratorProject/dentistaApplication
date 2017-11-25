import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PersonAddress } from './person-address.model';
import { PersonAddressPopupService } from './person-address-popup.service';
import { PersonAddressService } from './person-address.service';
import { Person, PersonService } from '../person';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-person-address-dialog',
    templateUrl: './person-address-dialog.component.html'
})
export class PersonAddressDialogComponent implements OnInit {

    personAddress: PersonAddress;
    isSaving: boolean;

    people: Person[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private personAddressService: PersonAddressService,
        private personService: PersonService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personService.query()
            .subscribe((res: ResponseWrapper) => { this.people = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.personAddress.id !== undefined) {
            this.subscribeToSaveResponse(
                this.personAddressService.update(this.personAddress));
        } else {
            this.subscribeToSaveResponse(
                this.personAddressService.create(this.personAddress));
        }
    }

    private subscribeToSaveResponse(result: Observable<PersonAddress>) {
        result.subscribe((res: PersonAddress) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PersonAddress) {
        this.eventManager.broadcast({ name: 'personAddressListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackPersonById(index: number, item: Person) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-person-address-popup',
    template: ''
})
export class PersonAddressPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personAddressPopupService: PersonAddressPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.personAddressPopupService
                    .open(PersonAddressDialogComponent as Component, params['id']);
            } else {
                this.personAddressPopupService
                    .open(PersonAddressDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
