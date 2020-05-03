import { Moment } from 'moment';

export interface ILogPacAcesso {
  id?: string;
  idPaciente?: number;
  profissional?: string;
  token?: string;
  ipLocal?: string;
  inforAcesso?: string;
  dataPost?: Moment;
}

export const defaultValue: Readonly<ILogPacAcesso> = {};
