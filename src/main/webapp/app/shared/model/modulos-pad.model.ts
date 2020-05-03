import { Moment } from 'moment';

export interface IModulosPad {
  id?: string;
  nomeModulo?: string;
  ativo?: string;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IModulosPad> = {};
