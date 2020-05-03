import { ICidade } from 'app/shared/model/cidade.model';

export interface IUf {
  id?: string;
  siglaUf?: string;
  descrUf?: string;
  cidades?: ICidade[];
}

export const defaultValue: Readonly<IUf> = {};
