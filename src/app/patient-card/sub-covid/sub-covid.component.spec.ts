import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCovidComponent } from './sub-covid.component';

describe('SubCovidComponent', () => {
  let component: SubCovidComponent;
  let fixture: ComponentFixture<SubCovidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCovidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
