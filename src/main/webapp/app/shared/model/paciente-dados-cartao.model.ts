import { Moment } from 'moment';
import { IPacientePedido } from 'app/shared/model/paciente-pedido.model';
import { IPaciente } from 'app/shared/model/paciente.model';

export interface IPacienteDadosCartao {
  id?: string;
  bandeira?: string;
  numeroCartao?: string;
  validade?: Moment;
  codAtivacao?: number;
  ativo?: boolean;
  pacientePedidos?: IPacientePedido[];
  paciente?: string | any;
}

export const defaultValue: Readonly<IPacienteDadosCartao> = {
  ativo: false
};
