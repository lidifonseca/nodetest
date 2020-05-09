export interface IPadMatMed {
  id?: string;
  idPad?: number;
  idMatMed?: number;
  qtd?: number;
  ativo?: boolean;
}

export const defaultValue: Readonly<IPadMatMed> = {
  ativo: false
};
