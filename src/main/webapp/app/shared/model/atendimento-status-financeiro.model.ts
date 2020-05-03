export interface IAtendimentoStatusFinanceiro {
  id?: string;
  idAtendimento?: number;
  idStatusFinanceiro?: number;
  idUsuario?: number;
}

export const defaultValue: Readonly<IAtendimentoStatusFinanceiro> = {};
