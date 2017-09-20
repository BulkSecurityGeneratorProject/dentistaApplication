import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AnamnesisMySuffix } from './anamnesis-my-suffix.model';
import { AnamnesisMySuffixPopupService } from './anamnesis-my-suffix-popup.service';
import { AnamnesisMySuffixService } from './anamnesis-my-suffix.service';

@Component({
    selector: 'jhi-anamnesis-my-suffix-delete-dialog',
    templateUrl: './anamnesis-my-suffix-delete-dialog.component.html'
})
export class AnamnesisMySuffixDeleteDialogComponent {

    anamnesis: AnamnesisMySuffix;

    constructor(
        private anamnesisService: AnamnesisMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.anamnesisService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'anamnesisListModification',
                content: 'Deleted an anamnesis'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-anamnesis-my-suffix-delete-popup',
    template: ''
})
export class AnamnesisMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private anamnesisPopupService: AnamnesisMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.anamnesisPopupService
                .open(AnamnesisMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
