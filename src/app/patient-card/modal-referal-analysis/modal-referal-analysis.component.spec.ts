import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReferalAnalysisComponent } from './modal-referal-analysis.component';

describe('ModalReferalAnalysisComponent', () => {
  let component: ModalReferalAnalysisComponent;
  let fixture: ComponentFixture<ModalReferalAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalReferalAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalReferalAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
