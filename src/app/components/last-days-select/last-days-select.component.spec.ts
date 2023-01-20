import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastDaysSelectComponent } from './last-days-select.component';

describe('LastDaysSelectComponent', () => {
  let component: LastDaysSelectComponent;
  let fixture: ComponentFixture<LastDaysSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastDaysSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastDaysSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
