import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AppointmentItem } from './appointment-item.model';
import { AppointmentItemPopupService } from './appointment-item-popup.service';
import { AppointmentItemService } from './appointment-item.service';

@Component({
    selector: 'jhi-appointment-item-delete-dialog',
    templateUrl: './appointment-item-delete-dialog.component.html'
})
export class AppointmentItemDeleteDialogComponent {

    appointmentItem: AppointmentItem;

    constructor(
        private appointmentItemService: AppointmentItemService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.appointmentItemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'appointmentItemListModification',
                content: 'Deleted an appointmentItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-appointment-item-delete-popup',
    template: ''
})
export class AppointmentItemDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private appointmentItemPopupService: AppointmentItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.appointmentItemPopupService
                .open(AppointmentItemDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
