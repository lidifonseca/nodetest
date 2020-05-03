import { Moment } from 'moment';

export interface IProfissionalEspecialidade {
  id?: string;
  idEspecialidade?: number;
  idProfissional?: string;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IProfissionalEspecialidade> = {};
