import { IPadItem } from 'app/shared/model/pad-item.model';

export interface IAtendimentoSorteioFeito {
  id?: string;
  sorteioFeito?: number;
  idPadItem?: string | any;
}

export const defaultValue: Readonly<IAtendimentoSorteioFeito> = {};
