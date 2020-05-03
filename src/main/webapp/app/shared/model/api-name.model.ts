import { Moment } from 'moment';

export interface IApiName {
  id?: string;
  apiName?: string;
  apiReceiver?: string;
  apiObs?: string;
  ativo?: number;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IApiName> = {};
