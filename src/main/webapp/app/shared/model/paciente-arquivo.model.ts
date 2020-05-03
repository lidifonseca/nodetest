import { Moment } from 'moment';

export interface IPacienteArquivo {
  id?: string;
  idPaciente?: string;
  arquivo?: string;
  ativo?: number;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IPacienteArquivo> = {};
