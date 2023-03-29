import { Pipe, PipeTransform } from '@angular/core';

/**
 * TeamDivisionPipe is a pipe that takes a string and returns a string representation of a division, by appending " Division" to the end of the input string.
 * 
 * @example
 * <p>{{ 'Atlantic' | teamDivision }}</p>
 * <!-- Output: Atlantic Division -->
 */
@Pipe({
  name: 'teamDivision'
})
export class TeamDivisionPipe implements PipeTransform {
  /**
   * Transforms a string into a string representation of a division.
   * @param value - The input string to be transformed.
   * @returns The string representation of the division.
   */
  transform(value: string): string {
    return `${value} Division`;
  }
}
