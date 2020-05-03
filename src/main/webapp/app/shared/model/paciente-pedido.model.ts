import { Moment } from 'moment';
import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { IPaciente } from 'app/shared/model/paciente.model';
import { IPacienteDadosCartao } from 'app/shared/model/paciente-dados-cartao.model';
import { IEspecialidade } from 'app/shared/model/especialidade.model';

export interface IPacientePedido {
  id?: string;
  dataPedido?: Moment;
  dataAgenda?: Moment;
  qtdSessoes?: number;
  parcelas?: number;
  valor?: number;
  desconto?: number;
  tipoValor?: number;
  idUnidade?: string | any;
  idPaciente?: string | any;
  idCartao?: string | any;
  idEspecialidade?: string | any;
}

export const defaultValue: Readonly<IPacientePedido> = {};
