import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PersonAddressMySuffix } from './person-address-my-suffix.model';
import { PersonAddressMySuffixPopupService } from './person-address-my-suffix-popup.service';
import { PersonAddressMySuffixService } from './person-address-my-suffix.service';

@Component({
    selector: 'jhi-person-address-my-suffix-dialog',
    templateUrl: './person-address-my-suffix-dialog.component.html'
})
export class PersonAddressMySuffixDialogComponent implements OnInit {

    personAddress: PersonAddressMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private personAddressService: PersonAddressMySuffixService,
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
        if (this.personAddress.id !== undefined) {
            this.subscribeToSaveResponse(
                this.personAddressService.update(this.personAddress));
        } else {
            this.subscribeToSaveResponse(
                this.personAddressService.create(this.personAddress));
        }
    }

    private subscribeToSaveResponse(result: Observable<PersonAddressMySuffix>) {
        result.subscribe((res: PersonAddressMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PersonAddressMySuffix) {
        this.eventManager.broadcast({ name: 'personAddressListModification', content: 'OK'});
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
    selector: 'jhi-person-address-my-suffix-popup',
    template: ''
})
export class PersonAddressMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personAddressPopupService: PersonAddressMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.personAddressPopupService
                    .open(PersonAddressMySuffixDialogComponent as Component, params['id']);
            } else {
                this.personAddressPopupService
                    .open(PersonAddressMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
