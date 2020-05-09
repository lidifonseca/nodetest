export interface IDiarioTags {
  id?: string;
  nome?: string;
  idPai?: number;
  nomeId?: string;
  ativo?: boolean;
}

export const defaultValue: Readonly<IDiarioTags> = {
  ativo: false
};
