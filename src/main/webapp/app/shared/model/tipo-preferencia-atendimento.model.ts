export interface ITipoPreferenciaAtendimento {
  id?: string;
  nome?: string;
  ativo?: boolean;
}

export const defaultValue: Readonly<ITipoPreferenciaAtendimento> = {
  ativo: false
};
