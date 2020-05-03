export interface IProfissionalStatusAtualNew {
  id?: string;
  idProfissional?: string;
  idStatusAtualProf?: number;
  obs?: any;
  ativo?: number;
  idUsuario?: string;
}

export const defaultValue: Readonly<IProfissionalStatusAtualNew> = {};
