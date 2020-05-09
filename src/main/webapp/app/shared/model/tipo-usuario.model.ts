import { IUsuario } from 'app/shared/model/usuario.model';

export interface ITipoUsuario {
  id?: string;
  tipoUsuario?: string;
  ativo?: boolean;
  usuarios?: IUsuario[];
}

export const defaultValue: Readonly<ITipoUsuario> = {
  ativo: false
};
