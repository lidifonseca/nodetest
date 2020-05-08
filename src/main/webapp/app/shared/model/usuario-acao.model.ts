import { ITela } from 'app/shared/model/tela.model';
import { IAcao } from 'app/shared/model/acao.model';

export interface IUsuarioAcao {
  id?: string;
  idAtendimento?: number;
  descricao?: any;
  tela?: string | any;
  acao?: string | any;
}

export const defaultValue: Readonly<IUsuarioAcao> = {};
