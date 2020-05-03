export interface ITipoExame {
  id?: string;
  exame?: string;
  idPai?: number;
  ativo?: number;
}

export const defaultValue: Readonly<ITipoExame> = {};
