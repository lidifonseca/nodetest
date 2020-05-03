export interface IUsuarioPanico {
  id?: string;
  idPaciente?: number;
  idUsuario?: number;
  idProfissional?: number;
  observacao?: string;
  resolvido?: number;
  idUserResolvido?: number;
}

export const defaultValue: Readonly<IUsuarioPanico> = {};
