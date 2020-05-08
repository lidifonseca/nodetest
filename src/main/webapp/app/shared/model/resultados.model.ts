import { Moment } from 'moment';
import { IAlertasResultadosEsperados } from 'app/shared/model/alertas-resultados-esperados.model';

export interface IResultados {
  id?: string;
  objetivo?: string;
  valor?: string;
  prazo?: string;
  complemento?: string;
  dataCadastro?: Moment;
  dataVencimentoPrazo?: Moment;
  alertasResultadosEsperados?: IAlertasResultadosEsperados[];
}

export const defaultValue: Readonly<IResultados> = {};
