import { Moment } from 'moment';
import { IAtendimento } from 'app/shared/model/atendimento.model';
import { IPadItem } from 'app/shared/model/pad-item.model';

export interface IPeriodo {
  id?: string;
  periodo?: string;
  ativo?: number;
  dataPost?: Moment;
  atendimentos?: IAtendimento[];
  padItems?: IPadItem[];
}

export const defaultValue: Readonly<IPeriodo> = {};
