export interface IMatMed {
  id?: string;
  nome?: string;
  idTipoMatMed?: number;
  valor?: number;
  ativo?: number;
}

export const defaultValue: Readonly<IMatMed> = {};
