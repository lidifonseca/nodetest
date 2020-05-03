import { Moment } from 'moment';

export interface IAtendimentoStatusFinanceiro {
  id?: string;
  idAtendimento?: number;
  idStatusFinanceiro?: number;
  idUsuario?: number;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IAtendimentoStatusFinanceiro> = {};
