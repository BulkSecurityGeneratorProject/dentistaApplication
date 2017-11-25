import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Appointment } from './appointment.model';
import { AppointmentPopupService } from './appointment-popup.service';
import { AppointmentService } from './appointment.service';
import { PaymentMethod, PaymentMethodService } from '../payment-method';
import { FinancialMove, FinancialMoveService } from '../financial-move';
import { Person, PersonService } from '../person';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-appointment-dialog',
    templateUrl: './appointment-dialog.component.html'
})
export class AppointmentDialogComponent implements OnInit {

    appointment: Appointment;
    isSaving: boolean;

    paymentmethods: PaymentMethod[];

    financialmoves: FinancialMove[];

    people: Person[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private appointmentService: AppointmentService,
        private paymentMethodService: PaymentMethodService,
        private financialMoveService: FinancialMoveService,
        private personService: PersonService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.paymentMethodService
            .query({filter: 'appointment-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.appointment.paymentMethodId) {
                    this.paymentmethods = res.json;
                } else {
                    this.paymentMethodService
                        .find(this.appointment.paymentMethodId)
                        .subscribe((subRes: PaymentMethod) => {
                            this.paymentmethods = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.financialMoveService
            .query({filter: 'appointment-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.appointment.financialMoveId) {
                    this.financialmoves = res.json;
                } else {
                    this.financialMoveService
                        .find(this.appointment.financialMoveId)
                        .subscribe((subRes: FinancialMove) => {
                            this.financialmoves = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.personService.query()
            .subscribe((res: ResponseWrapper) => { this.people = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
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

    trackPaymentMethodById(index: number, item: PaymentMethod) {
        return item.id;
    }

    trackFinancialMoveById(index: number, item: FinancialMove) {
        return item.id;
    }

    trackPersonById(index: number, item: Person) {
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
