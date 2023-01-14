import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teamName'
})
export class TeamNamePipe implements PipeTransform {

  transform(teamFullName: string, teamAbbreviation: string): string {
    return `${teamFullName} [${teamAbbreviation}]`;
  }

}
