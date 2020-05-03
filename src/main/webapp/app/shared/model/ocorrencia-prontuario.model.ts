import { Moment } from 'moment';

export interface IOcorrenciaProntuario {
  id?: string;
  nome?: string;
  ativo?: string;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IOcorrenciaProntuario> = {};
