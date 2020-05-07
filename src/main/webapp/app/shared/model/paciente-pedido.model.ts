import { Moment } from 'moment';
import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';

export interface IPacientePedido {
  id?: string;
  dataPedido?: Moment;
  dataAgenda?: Moment;
  qtdSessoes?: number;
  parcelas?: number;
  valor?: number;
  desconto?: number;
  tipoValor?: number;
  unidadeRazaoSocial?: string;
  unidade?: string | any;
}

export const defaultValue: Readonly<IPacientePedido> = {};
