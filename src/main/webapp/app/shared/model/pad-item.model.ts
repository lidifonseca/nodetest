import { Moment } from 'moment';
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
  ativo?: boolean;
  dataPadItemIncompleto?: Moment;
  dataPadItemCompleto?: Moment;
  numGhc?: string;
  atendimentoCepRecusados?: IAtendimentoCepRecusado[];
  atendimentoSorteioFeitos?: IAtendimentoSorteioFeito[];
  padItemAtividades?: IPadItemAtividade[];
  padItemCepRecusados?: IPadItemCepRecusado[];
  padItemResultados?: IPadItemResultado[];
  padItemSorteioFeitos?: IPadItemSorteioFeito[];
  pad?: string | any;
  especialidade?: string | any;
  periodicidade?: string | any;
  periodo?: string | any;
}

export const defaultValue: Readonly<IPadItem> = {
  ativo: false
};
