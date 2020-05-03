import { Moment } from 'moment';

export interface IUsuarioPanico {
  id?: string;
  idPaciente?: number;
  idUsuario?: number;
  idProfissional?: number;
  observacao?: string;
  resolvido?: number;
  idUserResolvido?: number;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IUsuarioPanico> = {};
