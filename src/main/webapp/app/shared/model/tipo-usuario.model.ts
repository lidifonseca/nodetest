import { IUsuario } from 'app/shared/model/usuario.model';

export interface ITipoUsuario {
  id?: string;
  tipoUsuario?: string;
  ativo?: number;
  usuarios?: IUsuario[];
}

export const defaultValue: Readonly<ITipoUsuario> = {};
