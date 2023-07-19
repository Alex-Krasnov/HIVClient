import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEpidComponent } from './search-epid.component';

describe('SearchEpidComponent', () => {
  let component: SearchEpidComponent;
  let fixture: ComponentFixture<SearchEpidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchEpidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchEpidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
