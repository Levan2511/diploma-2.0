import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEpComponent } from './search-ep.component';

describe('SearchEpComponent', () => {
  let component: SearchEpComponent;
  let fixture: ComponentFixture<SearchEpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchEpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchEpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
