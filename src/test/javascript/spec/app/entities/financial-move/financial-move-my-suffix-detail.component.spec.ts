/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DentistApplicationTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FinancialMoveMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/financial-move/financial-move-my-suffix-detail.component';
import { FinancialMoveMySuffixService } from '../../../../../../main/webapp/app/entities/financial-move/financial-move-my-suffix.service';
import { FinancialMoveMySuffix } from '../../../../../../main/webapp/app/entities/financial-move/financial-move-my-suffix.model';

describe('Component Tests', () => {

    describe('FinancialMoveMySuffix Management Detail Component', () => {
        let comp: FinancialMoveMySuffixDetailComponent;
        let fixture: ComponentFixture<FinancialMoveMySuffixDetailComponent>;
        let service: FinancialMoveMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DentistApplicationTestModule],
                declarations: [FinancialMoveMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FinancialMoveMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(FinancialMoveMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FinancialMoveMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FinancialMoveMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new FinancialMoveMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.financialMove).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
