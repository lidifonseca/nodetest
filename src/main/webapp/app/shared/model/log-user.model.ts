import { IAcao } from 'app/shared/model/acao.model';
import { ITela } from 'app/shared/model/tela.model';

export interface ILogUser {
  id?: string;
  descricao?: any;
  acao?: string | any;
  tela?: string | any;
}

export const defaultValue: Readonly<ILogUser> = {};
