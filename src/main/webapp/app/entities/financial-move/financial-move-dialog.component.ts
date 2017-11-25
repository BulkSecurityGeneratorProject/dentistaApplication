import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FinancialMove } from './financial-move.model';
import { FinancialMovePopupService } from './financial-move-popup.service';
import { FinancialMoveService } from './financial-move.service';

@Component({
    selector: 'jhi-financial-move-dialog',
    templateUrl: './financial-move-dialog.component.html'
})
export class FinancialMoveDialogComponent implements OnInit {

    financialMove: FinancialMove;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private financialMoveService: FinancialMoveService,
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

    private subscribeToSaveResponse(result: Observable<FinancialMove>) {
        result.subscribe((res: FinancialMove) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FinancialMove) {
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
    selector: 'jhi-financial-move-popup',
    template: ''
})
export class FinancialMovePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private financialMovePopupService: FinancialMovePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.financialMovePopupService
                    .open(FinancialMoveDialogComponent as Component, params['id']);
            } else {
                this.financialMovePopupService
                    .open(FinancialMoveDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
