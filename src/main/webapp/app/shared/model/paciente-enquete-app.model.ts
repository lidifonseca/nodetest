import { Moment } from 'moment';
import { IPaciente } from 'app/shared/model/paciente.model';

export interface IPacienteEnqueteApp {
  id?: string;
  votacao?: number;
  dataPost?: Moment;
  idPaciente?: string | any;
}

export const defaultValue: Readonly<IPacienteEnqueteApp> = {};
