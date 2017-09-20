import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FinancialMoveMySuffix } from './financial-move-my-suffix.model';
import { FinancialMoveMySuffixPopupService } from './financial-move-my-suffix-popup.service';
import { FinancialMoveMySuffixService } from './financial-move-my-suffix.service';

@Component({
    selector: 'jhi-financial-move-my-suffix-dialog',
    templateUrl: './financial-move-my-suffix-dialog.component.html'
})
export class FinancialMoveMySuffixDialogComponent implements OnInit {

    financialMove: FinancialMoveMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private financialMoveService: FinancialMoveMySuffixService,
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
        if (this.financialMove.id !== undefined) {
            this.subscribeToSaveResponse(
                this.financialMoveService.update(this.financialMove));
        } else {
            this.subscribeToSaveResponse(
                this.financialMoveService.create(this.financialMove));
        }
    }

    private subscribeToSaveResponse(result: Observable<FinancialMoveMySuffix>) {
        result.subscribe((res: FinancialMoveMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FinancialMoveMySuffix) {
        this.eventManager.broadcast({ name: 'financialMoveListModification', content: 'OK'});
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
    selector: 'jhi-financial-move-my-suffix-popup',
    template: ''
})
export class FinancialMoveMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private financialMovePopupService: FinancialMoveMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.financialMovePopupService
                    .open(FinancialMoveMySuffixDialogComponent as Component, params['id']);
            } else {
                this.financialMovePopupService
                    .open(FinancialMoveMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
