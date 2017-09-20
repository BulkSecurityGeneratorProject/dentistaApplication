/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DentistApplicationTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AppointmentMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/appointment/appointment-my-suffix-detail.component';
import { AppointmentMySuffixService } from '../../../../../../main/webapp/app/entities/appointment/appointment-my-suffix.service';
import { AppointmentMySuffix } from '../../../../../../main/webapp/app/entities/appointment/appointment-my-suffix.model';

describe('Component Tests', () => {

    describe('AppointmentMySuffix Management Detail Component', () => {
        let comp: AppointmentMySuffixDetailComponent;
        let fixture: ComponentFixture<AppointmentMySuffixDetailComponent>;
        let service: AppointmentMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DentistApplicationTestModule],
                declarations: [AppointmentMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AppointmentMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(AppointmentMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AppointmentMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AppointmentMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new AppointmentMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.appointment).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
