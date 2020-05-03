import { Moment } from 'moment';

export interface ITokenUsuario {
  id?: string;
  idPaciente?: number;
  token?: string;
  dataValida?: Moment;
  dataPost?: Moment;
}

export const defaultValue: Readonly<ITokenUsuario> = {};
