import { Moment } from 'moment';

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
}

export const defaultValue: Readonly<IPadItem> = {};
