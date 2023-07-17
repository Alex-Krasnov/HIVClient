import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAclComponent } from './search-acl.component';

describe('SearchAclComponent', () => {
  let component: SearchAclComponent;
  let fixture: ComponentFixture<SearchAclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchAclComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
