import { Moment } from 'moment';

export interface IApiReturn {
  id?: string;
  idApiName?: number;
  apiReturn?: string;
  apiType?: string;
  obs?: string;
  ativo?: number;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IApiReturn> = {};
