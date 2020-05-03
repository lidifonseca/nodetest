import { Moment } from 'moment';

export interface IPadItemTemp {
  id?: string;
  sessionId?: string;
  idEspecialidade?: number;
  idPeriodicidade?: number;
  idPeriodo?: number;
  dataInicio?: Moment;
  dataFim?: Moment;
  qtdSessoes?: number;
  observacao?: string;
  dataPost?: Moment;
  cidXPtaNovoId?: number;
  categoriaId?: number;
  numGhc?: string;
}

export const defaultValue: Readonly<IPadItemTemp> = {};
