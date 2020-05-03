import { Moment } from 'moment';
import { ILogUser } from 'app/shared/model/log-user.model';
import { ILogUserFranquia } from 'app/shared/model/log-user-franquia.model';
import { IUsuarioAcao } from 'app/shared/model/usuario-acao.model';

export interface ITela {
  id?: string;
  tela?: string;
  dataPost?: Moment;
  logUsers?: ILogUser[];
  logUserFranquias?: ILogUserFranquia[];
  usuarioAcaos?: IUsuarioAcao[];
}

export const defaultValue: Readonly<ITela> = {};
