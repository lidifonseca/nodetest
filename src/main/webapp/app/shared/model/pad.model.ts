import { Moment } from 'moment';
import { IPadCid } from 'app/shared/model/pad-cid.model';
import { IPadItem } from 'app/shared/model/pad-item.model';
import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { IPaciente } from 'app/shared/model/paciente.model';

export interface IPad {
  id?: string;
  idOperadora?: number;
  idFranquia?: string;
  nroPad?: string;
  dataInicio?: Moment;
  dataFim?: Moment;
  dataConferido?: Moment;
  ativo?: number;
  idUsuario?: number;
  statusPad?: number;
  novoModelo?: boolean;
  imagePath?: string;
  score?: number;
  padCids?: IPadCid[];
  padItems?: IPadItem[];
  unidadeRazaoSocial?: string;
  unidade?: string | any;
  idPaciente?: string | any;
}

export const defaultValue: Readonly<IPad> = {
  novoModelo: false
};