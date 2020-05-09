export interface IDescPta {
  id?: string;
  nome?: string;
  resultadoEsperado?: string;
  ativo?: boolean;
}

export const defaultValue: Readonly<IDescPta> = {
  ativo: false
};
