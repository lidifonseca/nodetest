import { Moment } from 'moment';
import { ICategoria } from 'app/shared/model/categoria.model';

export interface ICategoriaContrato {
  id?: string;
  contrato?: string;
  ativo?: number;
  dataPost?: Moment;
  idCategoria?: string | any;
}

export const defaultValue: Readonly<ICategoriaContrato> = {};
