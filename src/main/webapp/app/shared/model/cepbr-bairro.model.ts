import { ICepbrEndereco } from 'app/shared/model/cepbr-endereco.model';
import { ICepbrCidade } from 'app/shared/model/cepbr-cidade.model';

export interface ICepbrBairro {
  id?: string;
  idBairro?: number;
  bairro?: string;
  cepbrEnderecos?: ICepbrEndereco[];
  idCidade?: string | any;
}

export const defaultValue: Readonly<ICepbrBairro> = {};
