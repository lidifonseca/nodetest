import { IPacienteStatusAtual } from 'app/shared/model/paciente-status-atual.model';

export interface IStatusAtual {
  id?: string;
  statusAtual?: string;
  styleLabel?: string;
  pacienteStatusAtuals?: IPacienteStatusAtual[];
}

export const defaultValue: Readonly<IStatusAtual> = {};
