/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DentistApplicationTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PersonAddressDetailComponent } from '../../../../../../main/webapp/app/entities/person-address/person-address-detail.component';
import { PersonAddressService } from '../../../../../../main/webapp/app/entities/person-address/person-address.service';
import { PersonAddress } from '../../../../../../main/webapp/app/entities/person-address/person-address.model';

describe('Component Tests', () => {

    describe('PersonAddress Management Detail Component', () => {
        let comp: PersonAddressDetailComponent;
        let fixture: ComponentFixture<PersonAddressDetailComponent>;
        let service: PersonAddressService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DentistApplicationTestModule],
                declarations: [PersonAddressDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PersonAddressService,
                    JhiEventManager
                ]
            }).overrideTemplate(PersonAddressDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonAddressDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonAddressService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PersonAddress(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.personAddress).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
