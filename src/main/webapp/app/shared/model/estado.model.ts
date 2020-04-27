import { IPesquisa } from 'app/shared/model/pesquisa.model';
import { IComarca } from 'app/shared/model/comarca.model';

export interface IEstado {
  id?: number;
  nome?: string;
  sigla?: string;
  pesquisas?: IPesquisa[];
  comarcas?: IComarca[];
}

export const defaultValue: Readonly<IEstado> = {};
