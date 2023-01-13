import { Pipe, PipeTransform } from '@angular/core';
import { Team } from '../entities/team';

@Pipe({
  name: 'teamName'
})
export class TeamNamePipe implements PipeTransform {

  transform(teamFullName: string, teamAbbreviation: string): string {
    return `${teamFullName} [${teamAbbreviation}]`;
  }

}
