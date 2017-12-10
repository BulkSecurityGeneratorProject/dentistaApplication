import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FinancialMove } from './financial-move.model';
import { FinancialMovePopupService } from './financial-move-popup.service';
import { FinancialMoveService } from './financial-move.service';
import { Appointment, AppointmentService } from '../appointment';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-financial-move-dialog',
    templateUrl: './financial-move-dialog.component.html'
})
export class FinancialMoveDialogComponent implements OnInit {

    financialMove: FinancialMove;
    isSaving: boolean;

    appointments: Appointment[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private financialMoveService: FinancialMoveService,
        private appointmentService: AppointmentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.appointmentService.query()
            .subscribe((res: ResponseWrapper) => { this.appointments = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.financialMove.id !== undefined) {
            this.subscribeToSaveResponse(
                this.financialMoveService.update(this.financialMove));
        } else {
            this.subscribeToSaveResponse(
                this.financialMoveService.create(this.financialMove));
        }
    }

    private subscribeToSaveResponse(result: Observable<FinancialMove>) {
        result.subscribe((res: FinancialMove) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FinancialMove) {
        this.eventManager.broadcast({ name: 'financialMoveListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-financial-move-popup',
    template: ''
})
export class FinancialMovePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private financialMovePopupService: FinancialMovePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.financialMovePopupService
                    .open(FinancialMoveDialogComponent as Component, params['id']);
            } else {
                this.financialMovePopupService
                    .open(FinancialMoveDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
