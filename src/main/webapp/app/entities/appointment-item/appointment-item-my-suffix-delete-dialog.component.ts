import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AppointmentItemMySuffix } from './appointment-item-my-suffix.model';
import { AppointmentItemMySuffixPopupService } from './appointment-item-my-suffix-popup.service';
import { AppointmentItemMySuffixService } from './appointment-item-my-suffix.service';

@Component({
    selector: 'jhi-appointment-item-my-suffix-delete-dialog',
    templateUrl: './appointment-item-my-suffix-delete-dialog.component.html'
})
export class AppointmentItemMySuffixDeleteDialogComponent {

    appointmentItem: AppointmentItemMySuffix;

    constructor(
        private appointmentItemService: AppointmentItemMySuffixService,
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
    selector: 'jhi-appointment-item-my-suffix-delete-popup',
    template: ''
})
export class AppointmentItemMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private appointmentItemPopupService: AppointmentItemMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.appointmentItemPopupService
                .open(AppointmentItemMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
