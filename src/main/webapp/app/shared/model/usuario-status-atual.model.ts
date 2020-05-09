export interface IUsuarioStatusAtual {
  id?: string;
  statusAtual?: number;
  obs?: string;
  ativo?: boolean;
}

export const defaultValue: Readonly<IUsuarioStatusAtual> = {
  ativo: false
};
