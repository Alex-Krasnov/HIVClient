import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResistenceComponent } from './resistence.component';

describe('ResistenceComponent', () => {
  let component: ResistenceComponent;
  let fixture: ComponentFixture<ResistenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResistenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResistenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
