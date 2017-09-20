import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FinancialMoveMySuffix } from './financial-move-my-suffix.model';
import { FinancialMoveMySuffixPopupService } from './financial-move-my-suffix-popup.service';
import { FinancialMoveMySuffixService } from './financial-move-my-suffix.service';

@Component({
    selector: 'jhi-financial-move-my-suffix-delete-dialog',
    templateUrl: './financial-move-my-suffix-delete-dialog.component.html'
})
export class FinancialMoveMySuffixDeleteDialogComponent {

    financialMove: FinancialMoveMySuffix;

    constructor(
        private financialMoveService: FinancialMoveMySuffixService,
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
    selector: 'jhi-financial-move-my-suffix-delete-popup',
    template: ''
})
export class FinancialMoveMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private financialMovePopupService: FinancialMoveMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.financialMovePopupService
                .open(FinancialMoveMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
