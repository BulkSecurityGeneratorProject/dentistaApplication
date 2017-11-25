import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FinancialMove } from './financial-move.model';
import { FinancialMovePopupService } from './financial-move-popup.service';
import { FinancialMoveService } from './financial-move.service';

@Component({
    selector: 'jhi-financial-move-delete-dialog',
    templateUrl: './financial-move-delete-dialog.component.html'
})
export class FinancialMoveDeleteDialogComponent {

    financialMove: FinancialMove;

    constructor(
        private financialMoveService: FinancialMoveService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.financialMoveService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'financialMoveListModification',
                content: 'Deleted an financialMove'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-financial-move-delete-popup',
    template: ''
})
export class FinancialMoveDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private financialMovePopupService: FinancialMovePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.financialMovePopupService
                .open(FinancialMoveDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
