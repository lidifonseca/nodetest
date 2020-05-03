import { Moment } from 'moment';
import { IAtendimento } from 'app/shared/model/atendimento.model';

export interface IStatusAtendimento {
  id?: string;
  statusAtendimento?: string;
  styleLabel?: string;
  ordenacao?: number;
  ativo?: number;
  dataPost?: Moment;
  atendimentos?: IAtendimento[];
}

export const defaultValue: Readonly<IStatusAtendimento> = {};
