/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DentistApplicationTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PersonAddressMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/person-address/person-address-my-suffix-detail.component';
import { PersonAddressMySuffixService } from '../../../../../../main/webapp/app/entities/person-address/person-address-my-suffix.service';
import { PersonAddressMySuffix } from '../../../../../../main/webapp/app/entities/person-address/person-address-my-suffix.model';

describe('Component Tests', () => {

    describe('PersonAddressMySuffix Management Detail Component', () => {
        let comp: PersonAddressMySuffixDetailComponent;
        let fixture: ComponentFixture<PersonAddressMySuffixDetailComponent>;
        let service: PersonAddressMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DentistApplicationTestModule],
                declarations: [PersonAddressMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PersonAddressMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(PersonAddressMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonAddressMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonAddressMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PersonAddressMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.personAddress).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
