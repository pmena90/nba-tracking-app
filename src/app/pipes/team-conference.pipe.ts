import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teamConference'
})
export class TeamConferencePipe implements PipeTransform {

  transform(conference: string): string {
    if (conference === 'west')
      return 'Western conference';
    else
      return 'Eastern conference'
  }

}
