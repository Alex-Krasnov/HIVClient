import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaSelectComponent } from './schema-select.component';

describe('SchemaSelectComponent', () => {
  let component: SchemaSelectComponent;
  let fixture: ComponentFixture<SchemaSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemaSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchemaSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
