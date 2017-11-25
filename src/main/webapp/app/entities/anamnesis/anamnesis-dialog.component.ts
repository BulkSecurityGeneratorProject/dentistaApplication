import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Anamnesis } from './anamnesis.model';
import { AnamnesisPopupService } from './anamnesis-popup.service';
import { AnamnesisService } from './anamnesis.service';
import { Person, PersonService } from '../person';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-anamnesis-dialog',
    templateUrl: './anamnesis-dialog.component.html'
})
export class AnamnesisDialogComponent implements OnInit {

    anamnesis: Anamnesis;
    isSaving: boolean;

    people: Person[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private anamnesisService: AnamnesisService,
        private personService: PersonService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personService.query()
            .subscribe((res: ResponseWrapper) => { this.people = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.anamnesis.id !== undefined) {
            this.subscribeToSaveResponse(
                this.anamnesisService.update(this.anamnesis));
        } else {
            this.subscribeToSaveResponse(
                this.anamnesisService.create(this.anamnesis));
        }
    }

    private subscribeToSaveResponse(result: Observable<Anamnesis>) {
        result.subscribe((res: Anamnesis) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Anamnesis) {
        this.eventManager.broadcast({ name: 'anamnesisListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackPersonById(index: number, item: Person) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-anamnesis-popup',
    template: ''
})
export class AnamnesisPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private anamnesisPopupService: AnamnesisPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.anamnesisPopupService
                    .open(AnamnesisDialogComponent as Component, params['id']);
            } else {
                this.anamnesisPopupService
                    .open(AnamnesisDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
