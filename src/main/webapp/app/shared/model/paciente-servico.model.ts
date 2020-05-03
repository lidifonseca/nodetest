import { Moment } from 'moment';

export interface IPacienteServico {
  id?: string;
  idPaciente?: number;
  servico?: number;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IPacienteServico> = {};
