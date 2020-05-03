import { Moment } from 'moment';

export interface IPacienteCaracteristicaAtual {
  id?: string;
  idPaciente?: number;
  idPacienteCaracteristica?: number;
  idUsuario?: number;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IPacienteCaracteristicaAtual> = {};
