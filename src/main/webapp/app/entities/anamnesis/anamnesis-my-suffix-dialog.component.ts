import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AnamnesisMySuffix } from './anamnesis-my-suffix.model';
import { AnamnesisMySuffixPopupService } from './anamnesis-my-suffix-popup.service';
import { AnamnesisMySuffixService } from './anamnesis-my-suffix.service';
import { PersonMySuffix, PersonMySuffixService } from '../person';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-anamnesis-my-suffix-dialog',
    templateUrl: './anamnesis-my-suffix-dialog.component.html'
})
export class AnamnesisMySuffixDialogComponent implements OnInit {

    anamnesis: AnamnesisMySuffix;
    isSaving: boolean;

    patients: PersonMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private anamnesisService: AnamnesisMySuffixService,
        private personService: PersonMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personService
            .query({filter: 'anamnesis-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.anamnesis.patientId) {
                    this.patients = res.json;
                } else {
                    this.personService
                        .find(this.anamnesis.patientId)
                        .subscribe((subRes: PersonMySuffix) => {
                            this.patients = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
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

    private subscribeToSaveResponse(result: Observable<AnamnesisMySuffix>) {
        result.subscribe((res: AnamnesisMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AnamnesisMySuffix) {
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

    trackPersonById(index: number, item: PersonMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-anamnesis-my-suffix-popup',
    template: ''
})
export class AnamnesisMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private anamnesisPopupService: AnamnesisMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.anamnesisPopupService
                    .open(AnamnesisMySuffixDialogComponent as Component, params['id']);
            } else {
                this.anamnesisPopupService
                    .open(AnamnesisMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
