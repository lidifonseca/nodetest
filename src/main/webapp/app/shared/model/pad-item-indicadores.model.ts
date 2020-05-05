import { ICidXPtaNovoPadItemIndi } from 'app/shared/model/cid-x-pta-novo-pad-item-indi.model';

export interface IPadItemIndicadores {
  id?: string;
  idUnidadeMedida?: number;
  titulo?: string;
  descricao?: string;
  meta?: number;
  maximoSt?: number;
  minimoSt?: number;
  cidXPtaNovoPadItemIndis?: ICidXPtaNovoPadItemIndi[];
}

export const defaultValue: Readonly<IPadItemIndicadores> = {};
