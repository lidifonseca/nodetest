export interface IPadMatMed {
  id?: string;
  idPad?: number;
  idMatMed?: number;
  qtd?: number;
  idUsuario?: number;
  ativo?: number;
}

export const defaultValue: Readonly<IPadMatMed> = {};
