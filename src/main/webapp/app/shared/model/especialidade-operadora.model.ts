import { IOperadora } from 'app/shared/model/operadora.model';
import { IEspecialidade } from 'app/shared/model/especialidade.model';

export interface IEspecialidadeOperadora {
  id?: string;
  codTuss?: string;
  codDespesa?: string;
  codTabela?: string;
  valorCusto?: number;
  valorVenda?: number;
  descontoCusto?: number;
  descontoVenda?: number;
  ativo?: boolean;
  operadora?: string | any;
  especialidade?: string | any;
}

export const defaultValue: Readonly<IEspecialidadeOperadora> = {
  ativo: false
};
