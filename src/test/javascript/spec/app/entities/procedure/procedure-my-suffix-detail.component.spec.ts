/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DentistApplicationTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ProcedureMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/procedure/procedure-my-suffix-detail.component';
import { ProcedureMySuffixService } from '../../../../../../main/webapp/app/entities/procedure/procedure-my-suffix.service';
import { ProcedureMySuffix } from '../../../../../../main/webapp/app/entities/procedure/procedure-my-suffix.model';

describe('Component Tests', () => {

    describe('ProcedureMySuffix Management Detail Component', () => {
        let comp: ProcedureMySuffixDetailComponent;
        let fixture: ComponentFixture<ProcedureMySuffixDetailComponent>;
        let service: ProcedureMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DentistApplicationTestModule],
                declarations: [ProcedureMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ProcedureMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(ProcedureMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProcedureMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProcedureMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ProcedureMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.procedure).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
