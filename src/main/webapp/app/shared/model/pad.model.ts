import { Moment } from 'moment';
import { IPadCid } from 'app/shared/model/pad-cid.model';
import { IPadItem } from 'app/shared/model/pad-item.model';
import { IPaciente } from 'app/shared/model/paciente.model';

export interface IPad {
  id?: string;
  idUnidade?: string;
  idOperadora?: number;
  idFranquia?: string;
  nroPad?: string;
  dataInicio?: Moment;
  dataFim?: Moment;
  dataConferido?: Moment;
  ativo?: number;
  dataPost?: Moment;
  idUsuario?: number;
  statusPad?: number;
  novoModelo?: boolean;
  imagePath?: string;
  score?: number;
  padCids?: IPadCid[];
  padItems?: IPadItem[];
  idPaciente?: string | any;
}

export const defaultValue: Readonly<IPad> = {
  novoModelo: false
};
