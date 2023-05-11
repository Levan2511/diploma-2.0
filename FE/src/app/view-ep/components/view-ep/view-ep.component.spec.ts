import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEpComponent } from './view-ep.component';

describe('ViewEpComponent', () => {
  let component: ViewEpComponent;
  let fixture: ComponentFixture<ViewEpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
