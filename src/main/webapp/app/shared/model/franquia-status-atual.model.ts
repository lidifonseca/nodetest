export interface IFranquiaStatusAtual {
  id?: string;
  statusAtual?: number;
  obs?: string;
  ativo?: number;
}

export const defaultValue: Readonly<IFranquiaStatusAtual> = {};
