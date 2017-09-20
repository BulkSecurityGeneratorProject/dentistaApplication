import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AnamnesisMySuffix } from './anamnesis-my-suffix.model';
import { AnamnesisMySuffixPopupService } from './anamnesis-my-suffix-popup.service';
import { AnamnesisMySuffixService } from './anamnesis-my-suffix.service';

@Component({
    selector: 'jhi-anamnesis-my-suffix-dialog',
    templateUrl: './anamnesis-my-suffix-dialog.component.html'
})
export class AnamnesisMySuffixDialogComponent implements OnInit {

    anamnesis: AnamnesisMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private anamnesisService: AnamnesisMySuffixService,
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
