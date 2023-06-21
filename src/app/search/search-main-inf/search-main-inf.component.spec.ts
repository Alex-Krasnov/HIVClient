import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMainInfComponent } from './search-main-inf.component';

describe('SearchMainInfComponent', () => {
  let component: SearchMainInfComponent;
  let fixture: ComponentFixture<SearchMainInfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMainInfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMainInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
