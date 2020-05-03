import { Moment } from 'moment';
import { IAcao } from 'app/shared/model/acao.model';
import { ITela } from 'app/shared/model/tela.model';

export interface ILogUser {
  id?: string;
  idUsuario?: string;
  descricao?: string;
  dataPost?: Moment;
  idAcao?: string | any;
  idTela?: string | any;
}

export const defaultValue: Readonly<ILogUser> = {};
