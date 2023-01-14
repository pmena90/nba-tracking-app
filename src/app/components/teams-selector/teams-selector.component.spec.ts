import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamsService } from 'src/app/services';

import { TeamsSelectorComponent } from './teams-selector.component';

describe('TeamsSelectorComponent', () => {
  let component: TeamsSelectorComponent;
  let fixture: ComponentFixture<TeamsSelectorComponent>;
  let teamService: TeamsService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamsSelectorComponent],
      imports: [
        HttpClientTestingModule,
      ]
    })
      .compileComponents();


    teamService = TestBed.inject(TeamsService);
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
