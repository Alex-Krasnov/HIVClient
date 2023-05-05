import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCardRecipeComponent } from './patient-card-recipe.component';

describe('PatientCardRecipeComponent', () => {
  let component: PatientCardRecipeComponent;
  let fixture: ComponentFixture<PatientCardRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCardRecipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCardRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
