import { Moment } from 'moment';

export interface IMovimentacao {
  id?: number;
  data?: Moment;
  movimento?: any;
  processoId?: number;
}

export const defaultValue: Readonly<IMovimentacao> = {};
