export interface IFranquiaAreaAtuacao {
  id?: string;
  cepIni?: string;
  cepFim?: string;
  ativo?: number;
}

export const defaultValue: Readonly<IFranquiaAreaAtuacao> = {};
