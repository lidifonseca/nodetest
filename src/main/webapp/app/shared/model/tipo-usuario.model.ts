import { Moment } from 'moment';
import { IUsuario } from 'app/shared/model/usuario.model';

export interface ITipoUsuario {
  id?: string;
  tipoUsuario?: string;
  ativo?: number;
  dataPost?: Moment;
  usuarios?: IUsuario[];
}

export const defaultValue: Readonly<ITipoUsuario> = {};
