export interface IProfissionalAreaAtuacao {
  id?: string;
  idProfissional?: string;
  cepArea?: string;
  cepFim?: string;
  ativo?: number;
  cepIni?: string;
}

export const defaultValue: Readonly<IProfissionalAreaAtuacao> = {};
