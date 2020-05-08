import { IAcao } from 'app/shared/model/acao.model';
import { ITela } from 'app/shared/model/tela.model';
import { IFranquiaUsuario } from 'app/shared/model/franquia-usuario.model';

export interface ILogUserFranquia {
  id?: string;
  descricao?: any;
  acao?: string | any;
  tela?: string | any;
  usuario?: string | any;
}

export const defaultValue: Readonly<ILogUserFranquia> = {};
