export interface IProfissionalAreaAtuacao {
  id?: string;
  idProfissional?: string;
  cepArea?: string;
  cepFim?: string;
  ativo?: boolean;
  cepIni?: string;
}

export const defaultValue: Readonly<IProfissionalAreaAtuacao> = {
  ativo: false
};
