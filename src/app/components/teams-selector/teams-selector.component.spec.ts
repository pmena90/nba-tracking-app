import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsSelectorComponent } from './teams-selector.component';

describe('TeamsSelectorComponent', () => {
  let component: TeamsSelectorComponent;
  let fixture: ComponentFixture<TeamsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamsSelectorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
