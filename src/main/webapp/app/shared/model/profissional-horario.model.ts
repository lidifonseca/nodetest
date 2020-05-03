import { Moment } from 'moment';

export interface IProfissionalHorario {
  id?: string;
  idAtendimento?: number;
  idProfissional?: number;
  horario?: Moment;
  confirm?: number;
}

export const defaultValue: Readonly<IProfissionalHorario> = {};
