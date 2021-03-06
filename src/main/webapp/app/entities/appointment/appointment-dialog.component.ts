import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Appointment } from './appointment.model';
import { AppointmentPopupService } from './appointment-popup.service';
import { AppointmentService } from './appointment.service';
import { Person, PersonService } from '../person';
import { PaymentMethod, PaymentMethodService } from '../payment-method';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-appointment-dialog',
    templateUrl: './appointment-dialog.component.html'
})
export class AppointmentDialogComponent implements OnInit {

    appointment: Appointment;
    isSaving: boolean;

    people: Person[];
    dentist: Person[];
    patient: Person[];
    employee: Person[];

    paymentmethods: PaymentMethod[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private appointmentService: AppointmentService,
        private personService: PersonService,
        private paymentMethodService: PaymentMethodService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;

        this.personService.query()
            .subscribe((res: ResponseWrapper) => { this.people = res.json; }, (res: ResponseWrapper) => this.onError(res.json));

        this.personService.queryByDentist()
            .subscribe((res: ResponseWrapper) => { this.dentist = res.json; }, (res: ResponseWrapper) => this.onError(res.json));

        this.personService.queryByPatient()
            .subscribe((res: ResponseWrapper) => { this.patient = res.json; }, (res: ResponseWrapper) => this.onError(res.json));

        this.personService.queryByEmployee()
            .subscribe((res: ResponseWrapper) => { this.employee = res.json; }, (res: ResponseWrapper) => this.onError(res.json));

        this.paymentMethodService.query()
            .subscribe((res: ResponseWrapper) => { this.paymentmethods = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.appointment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.appointmentService.update(this.appointment));
        } else {
            this.subscribeToSaveResponse(
                this.appointmentService.create(this.appointment));
        }
    }

    private subscribeToSaveResponse(result: Observable<Appointment>) {
        result.subscribe((res: Appointment) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Appointment) {
        this.eventManager.broadcast({ name: 'appointmentListModification', content: 'OK'});
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

    trackPaymentMethodById(index: number, item: PaymentMethod) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-appointment-popup',
    template: ''
})
export class AppointmentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private appointmentPopupService: AppointmentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.appointmentPopupService
                    .open(AppointmentDialogComponent as Component, params['id']);
            } else {
                this.appointmentPopupService
                    .open(AppointmentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
