import { Moment } from 'moment';
import { IPaciente } from 'app/shared/model/paciente.model';
import { IStatusAtual } from 'app/shared/model/status-atual.model';

export interface IPacienteStatusAtual {
  id?: string;
  dataStatus?: Moment;
  observacao?: any;
  ativo?: number;
  idUsuario?: string;
  idPaciente?: string | any;
  idStatusAtual?: string | any;
}

export const defaultValue: Readonly<IPacienteStatusAtual> = {};
