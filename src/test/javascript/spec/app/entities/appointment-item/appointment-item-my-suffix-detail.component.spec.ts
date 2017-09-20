/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DentistApplicationTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AppointmentItemMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/appointment-item/appointment-item-my-suffix-detail.component';
import { AppointmentItemMySuffixService } from '../../../../../../main/webapp/app/entities/appointment-item/appointment-item-my-suffix.service';
import { AppointmentItemMySuffix } from '../../../../../../main/webapp/app/entities/appointment-item/appointment-item-my-suffix.model';

describe('Component Tests', () => {

    describe('AppointmentItemMySuffix Management Detail Component', () => {
        let comp: AppointmentItemMySuffixDetailComponent;
        let fixture: ComponentFixture<AppointmentItemMySuffixDetailComponent>;
        let service: AppointmentItemMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DentistApplicationTestModule],
                declarations: [AppointmentItemMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AppointmentItemMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(AppointmentItemMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AppointmentItemMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AppointmentItemMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new AppointmentItemMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.appointmentItem).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
