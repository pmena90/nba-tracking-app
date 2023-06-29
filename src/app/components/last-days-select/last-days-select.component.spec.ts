import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { LastDaysSelectComponent } from './last-days-select.component';

describe('LastDaysSelectComponent', () => {
  let component: LastDaysSelectComponent;
  let fixture: ComponentFixture<LastDaysSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LastDaysSelectComponent],
      imports: [ReactiveFormsModule]
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
