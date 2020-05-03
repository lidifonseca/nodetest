export interface IAtendimentoGlosado {
  id?: string;
  idAtendimento?: number;
  glosado?: string;
  idUsuario?: number;
}

export const defaultValue: Readonly<IAtendimentoGlosado> = {};
