import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AppointmentItemMySuffix } from './appointment-item-my-suffix.model';
import { AppointmentItemMySuffixPopupService } from './appointment-item-my-suffix-popup.service';
import { AppointmentItemMySuffixService } from './appointment-item-my-suffix.service';
import { AppointmentMySuffix, AppointmentMySuffixService } from '../appointment';
import { ProcedureMySuffix, ProcedureMySuffixService } from '../procedure';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-appointment-item-my-suffix-dialog',
    templateUrl: './appointment-item-my-suffix-dialog.component.html'
})
export class AppointmentItemMySuffixDialogComponent implements OnInit {

    appointmentItem: AppointmentItemMySuffix;
    isSaving: boolean;

    appointments: AppointmentMySuffix[];

    procedures: ProcedureMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private appointmentItemService: AppointmentItemMySuffixService,
        private appointmentService: AppointmentMySuffixService,
        private procedureService: ProcedureMySuffixService,
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

    private subscribeToSaveResponse(result: Observable<AppointmentItemMySuffix>) {
        result.subscribe((res: AppointmentItemMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AppointmentItemMySuffix) {
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

    trackAppointmentById(index: number, item: AppointmentMySuffix) {
        return item.id;
    }

    trackProcedureById(index: number, item: ProcedureMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-appointment-item-my-suffix-popup',
    template: ''
})
export class AppointmentItemMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private appointmentItemPopupService: AppointmentItemMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.appointmentItemPopupService
                    .open(AppointmentItemMySuffixDialogComponent as Component, params['id']);
            } else {
                this.appointmentItemPopupService
                    .open(AppointmentItemMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
