import { Moment } from 'moment';

export interface IPacienteGrauParentesco {
  id?: string;
  grauParentesco?: string;
  ativo?: number;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IPacienteGrauParentesco> = {};
