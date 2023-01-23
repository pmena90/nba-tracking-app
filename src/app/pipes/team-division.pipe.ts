import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teamDivision'
})
export class TeamDivisionPipe implements PipeTransform {

  transform(value: string): string {
    return `${value} Division`;
  }

}
