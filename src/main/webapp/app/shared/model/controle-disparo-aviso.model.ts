export interface IControleDisparoAviso {
  id?: string;
  idAtendimento?: number;
  qtdDisparo?: number;
  avisopush?: number;
}

export const defaultValue: Readonly<IControleDisparoAviso> = {};
