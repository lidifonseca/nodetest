export interface IProfissionalArquivo {
  id?: string;
  idProfissional?: string;
  arquivo?: string;
  ativo?: boolean;
}

export const defaultValue: Readonly<IProfissionalArquivo> = {
  ativo: false
};
