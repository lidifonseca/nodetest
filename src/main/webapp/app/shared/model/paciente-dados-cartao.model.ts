import { Moment } from 'moment';

export interface IPacienteDadosCartao {
  id?: string;
  bandeira?: string;
  numeroCartao?: string;
  validade?: Moment;
  codAtivacao?: number;
  ativo?: number;
}

export const defaultValue: Readonly<IPacienteDadosCartao> = {};
