import { Pipe, PipeTransform } from '@angular/core';

/**
 * ConferenceMap is an enum that maps conference strings to their descriptive counterparts.
 */
enum ConferenceMap {
  'West' = 'Western conference',
  'East' = 'Eastern conference'
}

/**
 * TeamConferencePipe is a pipe that takes a conference string and returns 
 * a more descriptive string representation of the conference.
 * 
 * @example
 * <p>{{ 'West' | teamConference }}</p>
 * <!-- Output: Western conference -->
 */
@Pipe({
  name: 'teamConference'
})
export class TeamConferencePipe implements PipeTransform {

  /**
   * Transforms a conference string into a more descriptive string representation.
   * @param conference - The conference string to be transformed.
   * @returns The descriptive string representation of the conference.
   */
  transform(conference: keyof typeof ConferenceMap): string {
    return ConferenceMap[conference] || '';
  }
}