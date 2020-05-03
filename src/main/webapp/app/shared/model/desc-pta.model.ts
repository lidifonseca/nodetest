export interface IDescPta {
  id?: string;
  nome?: string;
  resultadoEsperado?: string;
  ativo?: number;
}

export const defaultValue: Readonly<IDescPta> = {};
