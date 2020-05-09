import { ICategoria } from 'app/shared/model/categoria.model';

export interface ICategoriaContrato {
  id?: string;
  contratoContentType?: string;
  contratoBase64?: string;
  contrato?: any;
  ativo?: boolean;
  categoria?: string | any;
}

export const defaultValue: Readonly<ICategoriaContrato> = {
  ativo: false
};
