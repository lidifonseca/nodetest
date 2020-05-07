import { Moment } from 'moment';
import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';

export interface IPad {
  id?: string;
  idOperadora?: number;
  idFranquia?: string;
  nroPad?: string;
  dataInicio?: Moment;
  dataFim?: Moment;
  dataConferido?: Moment;
  ativo?: number;
  statusPad?: number;
  novoModelo?: boolean;
  imagePath?: string;
  score?: number;
  unidadeRazaoSocial?: string;
  unidade?: string | any;
}

export const defaultValue: Readonly<IPad> = {
  novoModelo: false
};
