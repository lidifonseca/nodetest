export interface IJulho {
  id?: string;
  dataInicio?: string;
  dataFim?: string;
  especialidade?: number;
  periodicidade?: number;
  periodo?: number;
  qtd?: number;
}

export const defaultValue: Readonly<IJulho> = {};
