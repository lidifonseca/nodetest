export interface IPacienteDiario {
  id?: string;
  idOperadora?: number;
  historico?: any;
  ativo?: number;
}

export const defaultValue: Readonly<IPacienteDiario> = {};
