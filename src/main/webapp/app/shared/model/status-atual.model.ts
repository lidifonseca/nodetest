import { Moment } from 'moment';
import { IPacienteStatusAtual } from 'app/shared/model/paciente-status-atual.model';

export interface IStatusAtual {
  id?: string;
  statusAtual?: string;
  styleLabel?: string;
  dataPost?: Moment;
  pacienteStatusAtuals?: IPacienteStatusAtual[];
}

export const defaultValue: Readonly<IStatusAtual> = {};
