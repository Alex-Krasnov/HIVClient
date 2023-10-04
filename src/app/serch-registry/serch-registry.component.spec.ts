import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerchRegistryComponent } from './serch-registry.component';

describe('SerchRegistryComponent', () => {
  let component: SerchRegistryComponent;
  let fixture: ComponentFixture<SerchRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerchRegistryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SerchRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
