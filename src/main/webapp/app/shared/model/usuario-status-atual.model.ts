export interface IUsuarioStatusAtual {
  id?: string;
  statusAtual?: number;
  obs?: string;
  ativo?: number;
}

export const defaultValue: Readonly<IUsuarioStatusAtual> = {};
