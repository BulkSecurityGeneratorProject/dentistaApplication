import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AppointmentMySuffix } from './appointment-my-suffix.model';
import { AppointmentMySuffixPopupService } from './appointment-my-suffix-popup.service';
import { AppointmentMySuffixService } from './appointment-my-suffix.service';

@Component({
    selector: 'jhi-appointment-my-suffix-delete-dialog',
    templateUrl: './appointment-my-suffix-delete-dialog.component.html'
})
export class AppointmentMySuffixDeleteDialogComponent {

    appointment: AppointmentMySuffix;

    constructor(
        private appointmentService: AppointmentMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.appointmentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'appointmentListModification',
                content: 'Deleted an appointment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-appointment-my-suffix-delete-popup',
    template: ''
})
export class AppointmentMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private appointmentPopupService: AppointmentMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.appointmentPopupService
                .open(AppointmentMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
