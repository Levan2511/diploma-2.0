import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelRemovalBarComponent } from './cancel-removal-bar.component';

describe('CancelRemovalBarComponent', () => {
  let component: CancelRemovalBarComponent;
  let fixture: ComponentFixture<CancelRemovalBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelRemovalBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelRemovalBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
