import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEpWrapperComponent } from './add-ep-wrapper.component';

describe('AddEpWrapperComponent', () => {
  let component: AddEpWrapperComponent;
  let fixture: ComponentFixture<AddEpWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEpWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEpWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
