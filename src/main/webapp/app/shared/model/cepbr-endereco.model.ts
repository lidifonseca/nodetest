import { ICepbrCidade } from 'app/shared/model/cepbr-cidade.model';
import { ICepbrBairro } from 'app/shared/model/cepbr-bairro.model';

export interface ICepbrEndereco {
  id?: string;
  cep?: string;
  logradouro?: string;
  tipoLogradouro?: string;
  complemento?: string;
  local?: string;
  idCidade?: string | any;
  idBairro?: string | any;
}

export const defaultValue: Readonly<ICepbrEndereco> = {};
