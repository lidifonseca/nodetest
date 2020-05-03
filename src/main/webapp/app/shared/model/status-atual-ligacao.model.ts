import { Moment } from 'moment';

export interface IStatusAtualLigacao {
  id?: string;
  statusAtualLigacao?: string;
  styleLabel?: string;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IStatusAtualLigacao> = {};
