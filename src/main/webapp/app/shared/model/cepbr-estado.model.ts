import { ICepbrCidade } from 'app/shared/model/cepbr-cidade.model';

export interface ICepbrEstado {
  id?: string;
  uf?: string;
  estado?: string;
  codIbge?: string;
  cepbrCidades?: ICepbrCidade[];
}

export const defaultValue: Readonly<ICepbrEstado> = {};
