export interface IEspecialidadeOperadora {
  id?: string;
  codTuss?: string;
  codDespesa?: string;
  codTabela?: string;
  valorCusto?: number;
  valorVenda?: number;
  descontoCusto?: number;
  descontoVenda?: number;
  ativo?: number;
}

export const defaultValue: Readonly<IEspecialidadeOperadora> = {};
