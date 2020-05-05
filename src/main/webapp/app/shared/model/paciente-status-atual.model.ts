import { Moment } from 'moment';
import { IPaciente } from 'app/shared/model/paciente.model';
import { IStatusAtual } from 'app/shared/model/status-atual.model';

export interface IPacienteStatusAtual {
  id?: string;
  dataStatus?: Moment;
  observacao?: any;
  ativo?: number;
  idUsuario?: string;
  pacienteNome?: string;
  paciente?: string | any;
  statusStatusAtual?: string;
  status?: string | any;
}

export const defaultValue: Readonly<IPacienteStatusAtual> = {};
