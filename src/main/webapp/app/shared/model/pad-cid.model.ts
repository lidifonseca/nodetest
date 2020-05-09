import { IPad } from 'app/shared/model/pad.model';
import { ICid } from 'app/shared/model/cid.model';

export interface IPadCid {
  id?: string;
  observacao?: string;
  ativo?: boolean;
  pad?: string | any;
  cid?: string | any;
}

export const defaultValue: Readonly<IPadCid> = {
  ativo: false
};
