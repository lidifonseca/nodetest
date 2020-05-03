import { Moment } from 'moment';
import { ITela } from 'app/shared/model/tela.model';
import { IAcao } from 'app/shared/model/acao.model';

export interface IUsuarioAcao {
  id?: string;
  idUsuario?: string;
  idAtendimento?: number;
  descricao?: string;
  dataPost?: Moment;
  idTela?: string | any;
  idAcao?: string | any;
}

export const defaultValue: Readonly<IUsuarioAcao> = {};
