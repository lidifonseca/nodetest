export interface IStatusFinanceiro {
  id?: string;
  nome?: string;
  ativo?: string;
  dataPost?: string;
}

export const defaultValue: Readonly<IStatusFinanceiro> = {};
