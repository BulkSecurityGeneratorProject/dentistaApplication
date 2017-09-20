import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { FinancialMoveMySuffix } from './financial-move-my-suffix.model';
import { FinancialMoveMySuffixService } from './financial-move-my-suffix.service';

@Injectable()
export class FinancialMoveMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private financialMoveService: FinancialMoveMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.financialMoveService.find(id).subscribe((financialMove) => {
                    financialMove.moveDate = this.datePipe
                        .transform(financialMove.moveDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.financialMoveModalRef(component, financialMove);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.financialMoveModalRef(component, new FinancialMoveMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    financialMoveModalRef(component: Component, financialMove: FinancialMoveMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.financialMove = financialMove;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
