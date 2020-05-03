import { Moment } from 'moment';

export interface IGrauParentesco {
  id?: string;
  grauParentesco?: string;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IGrauParentesco> = {};
