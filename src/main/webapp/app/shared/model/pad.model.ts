import { Moment } from 'moment';
import { IPadCid } from 'app/shared/model/pad-cid.model';
import { IPadItem } from 'app/shared/model/pad-item.model';
import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { IOperadora } from 'app/shared/model/operadora.model';
import { IFranquia } from 'app/shared/model/franquia.model';
import { IPaciente } from 'app/shared/model/paciente.model';

export interface IPad {
  id?: string;
  nroPad?: string;
  dataInicio?: Moment;
  dataFim?: Moment;
  dataConferido?: Moment;
  ativo?: boolean;
  statusPad?: number;
  padCids?: IPadCid[];
  padItems?: IPadItem[];
  unidadeRazaoSocial?: string;
  unidade?: string | any;
  operadoraNomeFantasia?: string;
  operadora?: string | any;
  franquiaNomeFantasia?: string;
  franquia?: string | any;
  pacienteNome?: string;
  paciente?: string | any;
}

export const defaultValue: Readonly<IPad> = {
  ativo: false
};
