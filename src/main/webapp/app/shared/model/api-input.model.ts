import { Moment } from 'moment';

export interface IApiInput {
  id?: string;
  idApiName?: number;
  apiInput?: string;
  apiType?: string;
  obs?: string;
  ativo?: number;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IApiInput> = {};
