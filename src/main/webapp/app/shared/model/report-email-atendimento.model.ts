export interface IReportEmailAtendimento {
  id?: string;
  idAtendimento?: number;
  tipoReport?: number;
}

export const defaultValue: Readonly<IReportEmailAtendimento> = {};
