import { Moment } from 'moment';
import { IAtendimento } from 'app/shared/model/atendimento.model';
import { IAtendimentoCepRecusado } from 'app/shared/model/atendimento-cep-recusado.model';
import { IAtendimentoSorteioFeito } from 'app/shared/model/atendimento-sorteio-feito.model';
import { IPadItemAtividade } from 'app/shared/model/pad-item-atividade.model';
import { IPadItemCepRecusado } from 'app/shared/model/pad-item-cep-recusado.model';
import { IPadItemResultado } from 'app/shared/model/pad-item-resultado.model';
import { IPadItemSorteioFeito } from 'app/shared/model/pad-item-sorteio-feito.model';
import { IPad } from 'app/shared/model/pad.model';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { IPeriodicidade } from 'app/shared/model/periodicidade.model';
import { IPeriodo } from 'app/shared/model/periodo.model';

export interface IPadItem {
  id?: string;
  idPedido?: string;
  dataInicio?: Moment;
  dataFim?: Moment;
  qtdSessoes?: number;
  observacao?: any;
  sub?: number;
  ativo?: number;
  dataPadItemIncompleto?: Moment;
  dataPadItemCompleto?: Moment;
  numGhc?: string;
  cidXPtaNovo?: number;
  categoriaId?: number;
  score?: number;
  atendimentos?: IAtendimento[];
  atendimentoCepRecusados?: IAtendimentoCepRecusado[];
  atendimentoSorteioFeitos?: IAtendimentoSorteioFeito[];
  padItemAtividades?: IPadItemAtividade[];
  padItemCepRecusados?: IPadItemCepRecusado[];
  padItemResultados?: IPadItemResultado[];
  padItemSorteioFeitos?: IPadItemSorteioFeito[];
  idPad?: string | any;
  idEspecialidade?: string | any;
  idPeriodicidade?: string | any;
  idPeriodo?: string | any;
}

export const defaultValue: Readonly<IPadItem> = {};
