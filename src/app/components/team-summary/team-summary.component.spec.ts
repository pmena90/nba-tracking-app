import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Team } from 'src/app/entities';
import { TeamConferencePipe } from 'src/app/pipes/team-conference.pipe';
import { TeamNamePipe } from 'src/app/pipes/team-name.pipe';
import { TeamSummaryComponent } from './team-summary.component';

describe('TeamSummaryComponent', () => {
  let component: TeamSummaryComponent;
  let fixture: ComponentFixture<TeamSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TeamSummaryComponent,
        TeamNamePipe,
        TeamConferencePipe
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSummaryComponent);
    component = fixture.componentInstance;
    const team: Team = {
      id: 1,
      abbreviation: '',
      city: '',
      conference: '',
      division: '',
      full_name: '',
      name: '',
      games: []
    }
    component.team = team;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
