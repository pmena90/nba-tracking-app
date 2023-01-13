import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamGamesResultComponent } from './team-games-result.component';

describe('TeamGamesResultComponent', () => {
  let component: TeamGamesResultComponent;
  let fixture: ComponentFixture<TeamGamesResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamGamesResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamGamesResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
