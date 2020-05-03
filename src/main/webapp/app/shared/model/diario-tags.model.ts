export interface IDiarioTags {
  id?: string;
  nome?: string;
  idPai?: number;
  nomeId?: string;
  ativo?: number;
}

export const defaultValue: Readonly<IDiarioTags> = {};
