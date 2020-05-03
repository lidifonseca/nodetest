export interface IProfissionalArquivo {
  id?: string;
  idProfissional?: string;
  arquivo?: string;
  ativo?: number;
}

export const defaultValue: Readonly<IProfissionalArquivo> = {};
