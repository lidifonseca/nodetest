import { ICidXPtaNovoPadItemIndi } from 'app/shared/model/cid-x-pta-novo-pad-item-indi.model';

export interface IAlertasIndicadores {
  id?: string;
  pontuacao?: number;
  alteracaoEsperada?: boolean;
  observacoes?: string;
  usuarioId?: number;
  padItemIndicadoresId?: string | any;
}

export const defaultValue: Readonly<IAlertasIndicadores> = {
  alteracaoEsperada: false
};
