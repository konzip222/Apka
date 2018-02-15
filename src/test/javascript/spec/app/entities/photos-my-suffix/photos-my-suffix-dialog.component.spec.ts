/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterTestModule } from '../../../test.module';
import { PhotosMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/photos-my-suffix/photos-my-suffix-dialog.component';
import { PhotosMySuffixService } from '../../../../../../main/webapp/app/entities/photos-my-suffix/photos-my-suffix.service';
import { PhotosMySuffix } from '../../../../../../main/webapp/app/entities/photos-my-suffix/photos-my-suffix.model';
import { RoomMySuffixService } from '../../../../../../main/webapp/app/entities/room-my-suffix';

describe('Component Tests', () => {

    describe('PhotosMySuffix Management Dialog Component', () => {
        let comp: PhotosMySuffixDialogComponent;
        let fixture: ComponentFixture<PhotosMySuffixDialogComponent>;
        let service: PhotosMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [PhotosMySuffixDialogComponent],
                providers: [
                    RoomMySuffixService,
                    PhotosMySuffixService
                ]
            })
            .overrideTemplate(PhotosMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PhotosMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhotosMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PhotosMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.photos = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'photosListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PhotosMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.photos = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'photosListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
