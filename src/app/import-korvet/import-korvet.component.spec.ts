import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportKorvetComponent } from './import-korvet.component';

describe('ImportKorvetComponent', () => {
  let component: ImportKorvetComponent;
  let fixture: ComponentFixture<ImportKorvetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportKorvetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportKorvetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
