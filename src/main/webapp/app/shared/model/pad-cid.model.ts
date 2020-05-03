import { Moment } from 'moment';
import { IPad } from 'app/shared/model/pad.model';
import { ICid } from 'app/shared/model/cid.model';

export interface IPadCid {
  id?: string;
  observacao?: string;
  ativo?: number;
  dataPost?: Moment;
  idPad?: string | any;
  idCid?: string | any;
}

export const defaultValue: Readonly<IPadCid> = {};
