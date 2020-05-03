import { Moment } from 'moment';

export interface IBanco {
  id?: string;
  codBanco?: string;
  banco?: string;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IBanco> = {};
