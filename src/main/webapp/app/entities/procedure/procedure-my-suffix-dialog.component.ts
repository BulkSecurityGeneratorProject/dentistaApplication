import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProcedureMySuffix } from './procedure-my-suffix.model';
import { ProcedureMySuffixPopupService } from './procedure-my-suffix-popup.service';
import { ProcedureMySuffixService } from './procedure-my-suffix.service';
import { AppointmentItemMySuffix, AppointmentItemMySuffixService } from '../appointment-item';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-procedure-my-suffix-dialog',
    templateUrl: './procedure-my-suffix-dialog.component.html'
})
export class ProcedureMySuffixDialogComponent implements OnInit {

    procedure: ProcedureMySuffix;
    isSaving: boolean;

    appointmentitems: AppointmentItemMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private procedureService: ProcedureMySuffixService,
        private appointmentItemService: AppointmentItemMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.appointmentItemService.query()
            .subscribe((res: ResponseWrapper) => { this.appointmentitems = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.procedure.id !== undefined) {
            this.subscribeToSaveResponse(
                this.procedureService.update(this.procedure));
        } else {
            this.subscribeToSaveResponse(
                this.procedureService.create(this.procedure));
        }
    }

    private subscribeToSaveResponse(result: Observable<ProcedureMySuffix>) {
        result.subscribe((res: ProcedureMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ProcedureMySuffix) {
        this.eventManager.broadcast({ name: 'procedureListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackAppointmentItemById(index: number, item: AppointmentItemMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-procedure-my-suffix-popup',
    template: ''
})
export class ProcedureMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private procedurePopupService: ProcedureMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.procedurePopupService
                    .open(ProcedureMySuffixDialogComponent as Component, params['id']);
            } else {
                this.procedurePopupService
                    .open(ProcedureMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
