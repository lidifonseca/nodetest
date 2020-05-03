import { Moment } from 'moment';

export interface IServico {
  id?: string;
  servico?: string;
  styleLabel?: string;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IServico> = {};
