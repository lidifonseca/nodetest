import { Moment } from 'moment';

export interface IProfissionalEspecialidadeNew {
  id?: string;
  idEspecialidade?: number;
  idProfissional?: string;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IProfissionalEspecialidadeNew> = {};
