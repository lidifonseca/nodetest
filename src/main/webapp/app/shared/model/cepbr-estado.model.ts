export interface ICepbrEstado {
  id?: string;
  uf?: string;
  estado?: string;
  codIbge?: string;
}

export const defaultValue: Readonly<ICepbrEstado> = {};
