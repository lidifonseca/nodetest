import { IAtendimento } from 'app/shared/model/atendimento.model';
import { IPadItem } from 'app/shared/model/pad-item.model';

export interface IPeriodo {
  id?: string;
  periodo?: string;
  ativo?: boolean;
  atendimentos?: IAtendimento[];
  padItems?: IPadItem[];
}

export const defaultValue: Readonly<IPeriodo> = {
  ativo: false
};
