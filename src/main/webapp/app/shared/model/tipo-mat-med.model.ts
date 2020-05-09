export interface ITipoMatMed {
  id?: string;
  tipo?: string;
  ativo?: boolean;
}

export const defaultValue: Readonly<ITipoMatMed> = {
  ativo: false
};
