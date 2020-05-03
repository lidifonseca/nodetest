import { Moment } from 'moment';

export interface IPacienteHospital {
  id?: string;
  servico?: string;
  styleLabel?: string;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IPacienteHospital> = {};
