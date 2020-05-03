import { ICidXPtaNovo } from 'app/shared/model/cid-x-pta-novo.model';
import { ICidXPtaNovoPadItemIndi } from 'app/shared/model/cid-x-pta-novo-pad-item-indi.model';
import { ICid } from 'app/shared/model/cid.model';

export interface ICidXPtaNovo {
  id?: string;
  complexidade?: string;
  versao?: number;
  score?: number;
  titulo?: string;
  cidXPtaNovos?: ICidXPtaNovo[];
  cidXPtaNovoPadItemIndis?: ICidXPtaNovoPadItemIndi[];
  cidId?: string | any;
  cidXPtaNovoId?: string | any;
}

export const defaultValue: Readonly<ICidXPtaNovo> = {};
