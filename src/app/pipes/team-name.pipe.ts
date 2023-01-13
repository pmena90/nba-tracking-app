import { Pipe, PipeTransform } from '@angular/core';
import { Team } from '../entities/team';

@Pipe({
  name: 'teamName'
})
export class TeamNamePipe implements PipeTransform {

  transform(team: Team): string {
    return `${team.full_name} [${team.abbreviation}]`;
  }

}
