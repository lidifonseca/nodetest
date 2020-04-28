import { Moment } from 'moment';
import { IMovimentacao } from 'app/shared/model/movimentacao.model';
import { IParte } from 'app/shared/model/parte.model';
import { IPeticao } from 'app/shared/model/peticao.model';
import { IIncidente } from 'app/shared/model/incidente.model';
import { IApenso } from 'app/shared/model/apenso.model';
import { IAudiencia } from 'app/shared/model/audiencia.model';
import { IHistoricoClase } from 'app/shared/model/historico-clase.model';
import { IPesquisa } from 'app/shared/model/pesquisa.model';

export interface IProcesso {
  id?: number;
  numero?: string;
  cnpj?: string;
  razaoSocial?: string;
  classe?: string;
  assunto?: string;
  vara?: string;
  juiz?: string;
  dataDistribuicao?: Moment;
  distribuicao?: string;
  localFisico?: string;
  controle?: string;
  area?: string;
  estado?: string;
  observacao?: any;
  interesse?: boolean;
  dataCriacao?: Moment;
  dataAtualicacao?: Moment;
  dataExclusao?: Moment;
  link?: any;
  valor?: number;
  moeda?: string;
  movimentacoes?: IMovimentacao[];
  partes?: IParte[];
  peticoes?: IPeticao[];
  incidentes?: IIncidente[];
  apensos?: IApenso[];
  audioencias?: IAudiencia[];
  historicos?: IHistoricoClase[];
  comarcaId?: number;
  comarcaNome?: string;
  pesquisas?: IPesquisa[];
}

export const defaultValue: Readonly<IProcesso> = {
  interesse: false
};
