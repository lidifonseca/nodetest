export interface ICepbrCidade {
  id?: string;
  idCidade?: number;
  cidade?: string;
  codIbge?: string;
  area?: number;
}

export const defaultValue: Readonly<ICepbrCidade> = {};
