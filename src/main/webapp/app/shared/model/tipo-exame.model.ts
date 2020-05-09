export interface ITipoExame {
  id?: string;
  exame?: string;
  idPai?: number;
  ativo?: boolean;
}

export const defaultValue: Readonly<ITipoExame> = {
  ativo: false
};
