import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AppointmentItem } from './appointment-item.model';
import { AppointmentItemPopupService } from './appointment-item-popup.service';
import { AppointmentItemService } from './appointment-item.service';
import { Appointment, AppointmentService } from '../appointment';
import { Procedure, ProcedureService } from '../procedure';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-appointment-item-dialog',
    templateUrl: './appointment-item-dialog.component.html'
})
export class AppointmentItemDialogComponent implements OnInit {

    appointmentItem: AppointmentItem;
    isSaving: boolean;

    appointments: Appointment[];

    procedures: Procedure[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private appointmentItemService: AppointmentItemService,
        private appointmentService: AppointmentService,
        private procedureService: ProcedureService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.appointmentService.query()
            .subscribe((res: ResponseWrapper) => { this.appointments = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.procedureService.query()
            .subscribe((res: ResponseWrapper) => { this.procedures = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.appointmentItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.appointmentItemService.update(this.appointmentItem));
        } else {
            this.subscribeToSaveResponse(
                this.appointmentItemService.create(this.appointmentItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<AppointmentItem>) {
        result.subscribe((res: AppointmentItem) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AppointmentItem) {
        this.eventManager.broadcast({ name: 'appointmentItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackAppointmentById(index: number, item: Appointment) {
        return item.id;
    }

    trackProcedureById(index: number, item: Procedure) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-appointment-item-popup',
    template: ''
})
export class AppointmentItemPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private appointmentItemPopupService: AppointmentItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.appointmentItemPopupService
                    .open(AppointmentItemDialogComponent as Component, params['id']);
            } else {
                this.appointmentItemPopupService
                    .open(AppointmentItemDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
