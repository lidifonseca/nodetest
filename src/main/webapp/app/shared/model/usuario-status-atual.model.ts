export interface IUsuarioStatusAtual {
  id?: string;
  idUsuario?: string;
  statusAtual?: number;
  obs?: string;
  ativo?: number;
}

export const defaultValue: Readonly<IUsuarioStatusAtual> = {};
