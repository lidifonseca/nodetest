import { Moment } from 'moment';
import { IPaciente } from 'app/shared/model/paciente.model';
import { IOperadora } from 'app/shared/model/operadora.model';

export interface IPacienteOperadora {
  id?: string;
  registro?: string;
  ativo?: number;
  dataPost?: Moment;
  idPaciente?: string | any;
  idOperadora?: string | any;
}

export const defaultValue: Readonly<IPacienteOperadora> = {};
