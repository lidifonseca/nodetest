import { Moment } from 'moment';

export interface IPhinxlog {
  id?: string;
  version?: string;
  migrationName?: string;
  startTime?: Moment;
  endTime?: Moment;
  breakpoint?: boolean;
}

export const defaultValue: Readonly<IPhinxlog> = {
  breakpoint: false
};
