import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalTermTableComponent } from './total-term-table.component';

describe('TotalTermTableComponent', () => {
  let component: TotalTermTableComponent;
  let fixture: ComponentFixture<TotalTermTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalTermTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalTermTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
