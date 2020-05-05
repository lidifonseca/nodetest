import { ICategoria } from 'app/shared/model/categoria.model';

export interface ICategoriaContrato {
  id?: string;
  contrato?: string;
  ativo?: number;
  idCategoria?: string | any;
}

export const defaultValue: Readonly<ICategoriaContrato> = {};
