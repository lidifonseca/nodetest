export interface IDiario {
  id?: string;
  historico?: string;
  gerarPdf?: number;
}

export const defaultValue: Readonly<IDiario> = {};
