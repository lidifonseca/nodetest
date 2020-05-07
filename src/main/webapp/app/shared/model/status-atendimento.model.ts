export interface IStatusAtendimento {
  id?: string;
  statusAtendimento?: string;
  styleLabel?: string;
  ordenacao?: number;
  ativo?: number;
}

export const defaultValue: Readonly<IStatusAtendimento> = {};
