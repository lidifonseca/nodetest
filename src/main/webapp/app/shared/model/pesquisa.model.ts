import { Moment } from 'moment';
import { IProcesso } from 'app/shared/model/processo.model';
import { Situacao } from 'app/shared/model/enumerations/situacao.model';

export interface IPesquisa {
  id?: number;
  nome?: string;
  classesIncluir?: any;
  incluirMovimentacoes?: any;
  descartarMovimentacoes?: any;
  incluirMovimentacoesAll?: boolean;
  anoInicial?: number;
  anoFinal?: number;
  csv?: any;
  dataCriacao?: Moment;
  dataFinalizacao?: Moment;
  situacao?: Situacao;
  observacoes?: string;
  csvTotal?: number;
  csvVerificados?: number;
  comarcaPorComarca?: boolean;
  userId?: number;
  processos?: IProcesso[];
  userLogin?: string;
  comarcasId?: number;
  quantidadeResultados?: number;
  estadoSigla?: string;
  comarcaNome?: string;
  estadoId?: number;
  comarcaTjId?: number;
}

export const defaultValue: Readonly<IPesquisa> = {
  incluirMovimentacoesAll: false,
  comarcaPorComarca: false
};
