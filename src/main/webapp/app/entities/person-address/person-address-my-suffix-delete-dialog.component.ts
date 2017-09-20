import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PersonAddressMySuffix } from './person-address-my-suffix.model';
import { PersonAddressMySuffixPopupService } from './person-address-my-suffix-popup.service';
import { PersonAddressMySuffixService } from './person-address-my-suffix.service';

@Component({
    selector: 'jhi-person-address-my-suffix-delete-dialog',
    templateUrl: './person-address-my-suffix-delete-dialog.component.html'
})
export class PersonAddressMySuffixDeleteDialogComponent {

    personAddress: PersonAddressMySuffix;

    constructor(
        private personAddressService: PersonAddressMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.personAddressService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'personAddressListModification',
                content: 'Deleted an personAddress'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-person-address-my-suffix-delete-popup',
    template: ''
})
export class PersonAddressMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personAddressPopupService: PersonAddressMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.personAddressPopupService
                .open(PersonAddressMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
