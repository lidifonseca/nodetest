export interface IProfissionalStatusAtualNew {
  id?: string;
  idProfissional?: string;
  idStatusAtualProf?: number;
  obs?: any;
  ativo?: boolean;
}

export const defaultValue: Readonly<IProfissionalStatusAtualNew> = {
  ativo: false
};
