import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AppointmentItemMySuffix } from './appointment-item-my-suffix.model';
import { AppointmentItemMySuffixPopupService } from './appointment-item-my-suffix-popup.service';
import { AppointmentItemMySuffixService } from './appointment-item-my-suffix.service';

@Component({
    selector: 'jhi-appointment-item-my-suffix-dialog',
    templateUrl: './appointment-item-my-suffix-dialog.component.html'
})
export class AppointmentItemMySuffixDialogComponent implements OnInit {

    appointmentItem: AppointmentItemMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private appointmentItemService: AppointmentItemMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
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
