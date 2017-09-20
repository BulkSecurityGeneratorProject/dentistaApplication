import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProcedureMySuffix } from './procedure-my-suffix.model';
import { ProcedureMySuffixPopupService } from './procedure-my-suffix-popup.service';
import { ProcedureMySuffixService } from './procedure-my-suffix.service';

@Component({
    selector: 'jhi-procedure-my-suffix-delete-dialog',
    templateUrl: './procedure-my-suffix-delete-dialog.component.html'
})
export class ProcedureMySuffixDeleteDialogComponent {

    procedure: ProcedureMySuffix;

    constructor(
        private procedureService: ProcedureMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.procedureService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'procedureListModification',
                content: 'Deleted an procedure'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-procedure-my-suffix-delete-popup',
    template: ''
})
export class ProcedureMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private procedurePopupService: ProcedureMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.procedurePopupService
                .open(ProcedureMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
