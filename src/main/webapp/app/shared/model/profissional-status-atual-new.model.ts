import { Moment } from 'moment';

export interface IProfissionalStatusAtualNew {
  id?: string;
  idProfissional?: string;
  idStatusAtualProf?: number;
  obs?: string;
  ativo?: number;
  dataPost?: Moment;
  idUsuario?: string;
}

export const defaultValue: Readonly<IProfissionalStatusAtualNew> = {};
