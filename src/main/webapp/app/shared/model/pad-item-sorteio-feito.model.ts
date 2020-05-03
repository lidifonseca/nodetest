import { Moment } from 'moment';
import { IPadItem } from 'app/shared/model/pad-item.model';

export interface IPadItemSorteioFeito {
  id?: string;
  sorteioFeito?: number;
  dataPost?: Moment;
  idPadItem?: string | any;
}

export const defaultValue: Readonly<IPadItemSorteioFeito> = {};
