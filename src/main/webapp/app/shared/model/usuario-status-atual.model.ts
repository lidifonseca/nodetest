import { Moment } from 'moment';

export interface IUsuarioStatusAtual {
  id?: string;
  idUsuario?: string;
  statusAtual?: number;
  obs?: string;
  ativo?: number;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IUsuarioStatusAtual> = {};
