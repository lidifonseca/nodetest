import { IPadItem } from 'app/shared/model/pad-item.model';

export interface IPadItemSorteioFeito {
  id?: string;
  sorteioFeito?: number;
  padItem?: string | any;
}

export const defaultValue: Readonly<IPadItemSorteioFeito> = {};
