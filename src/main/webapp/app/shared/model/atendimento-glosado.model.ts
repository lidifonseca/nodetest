import { Moment } from 'moment';

export interface IAtendimentoGlosado {
  id?: string;
  idAtendimento?: number;
  glosado?: string;
  idUsuario?: number;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IAtendimentoGlosado> = {};
