import { Moment } from 'moment';
import { IPaciente } from 'app/shared/model/paciente.model';

export interface ICidade {
  id?: string;
  descrCidade?: string;
  dataPost?: Moment;
  pacientes?: IPaciente[];
}

export const defaultValue: Readonly<ICidade> = {};
