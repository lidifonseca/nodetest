import { Moment } from 'moment';

export interface ICidPta {
  id?: string;
  idDescPta?: number;
  idCid?: number;
  idAtividade?: number;
  ativo?: number;
  dataPost?: Moment;
}

export const defaultValue: Readonly<ICidPta> = {};
