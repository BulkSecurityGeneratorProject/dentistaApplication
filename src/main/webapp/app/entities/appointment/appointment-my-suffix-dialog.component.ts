import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AppointmentMySuffix } from './appointment-my-suffix.model';
import { AppointmentMySuffixPopupService } from './appointment-my-suffix-popup.service';
import { AppointmentMySuffixService } from './appointment-my-suffix.service';
import { PaymentMethodMySuffix, PaymentMethodMySuffixService } from '../payment-method';
import { PersonMySuffix, PersonMySuffixService } from '../person';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-appointment-my-suffix-dialog',
    templateUrl: './appointment-my-suffix-dialog.component.html'
})
export class AppointmentMySuffixDialogComponent implements OnInit {

    appointment: AppointmentMySuffix;
    isSaving: boolean;

    paymentmethods: PaymentMethodMySuffix[];

    people: PersonMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private appointmentService: AppointmentMySuffixService,
        private paymentMethodService: PaymentMethodMySuffixService,
        private personService: PersonMySuffixService,
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
                        .subscribe((subRes: PaymentMethodMySuffix) => {
                            this.paymentmethods = [subRes].concat(res.json);
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

    private subscribeToSaveResponse(result: Observable<AppointmentMySuffix>) {
        result.subscribe((res: AppointmentMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AppointmentMySuffix) {
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

    trackPaymentMethodById(index: number, item: PaymentMethodMySuffix) {
        return item.id;
    }

    trackPersonById(index: number, item: PersonMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-appointment-my-suffix-popup',
    template: ''
})
export class AppointmentMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private appointmentPopupService: AppointmentMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.appointmentPopupService
                    .open(AppointmentMySuffixDialogComponent as Component, params['id']);
            } else {
                this.appointmentPopupService
                    .open(AppointmentMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
