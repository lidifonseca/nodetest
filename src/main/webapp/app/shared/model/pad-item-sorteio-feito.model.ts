import { IPadItem } from 'app/shared/model/pad-item.model';

export interface IPadItemSorteioFeito {
  id?: string;
  sorteioFeito?: number;
  idPadItem?: string | any;
}

export const defaultValue: Readonly<IPadItemSorteioFeito> = {};
