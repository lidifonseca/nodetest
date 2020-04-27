import { IProcesso } from 'app/shared/model/processo.model';
import { IPesquisa } from 'app/shared/model/pesquisa.model';

export interface IComarca {
  id?: number;
  tjid?: number;
  nome?: string;
  processos?: IProcesso[];
  pesquisas?: IPesquisa[];
  estadoId?: number;
}

export const defaultValue: Readonly<IComarca> = {};
