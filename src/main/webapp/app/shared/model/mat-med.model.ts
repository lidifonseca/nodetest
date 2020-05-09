export interface IMatMed {
  id?: string;
  nome?: string;
  idTipoMatMed?: number;
  valor?: number;
  ativo?: boolean;
}

export const defaultValue: Readonly<IMatMed> = {
  ativo: false
};
