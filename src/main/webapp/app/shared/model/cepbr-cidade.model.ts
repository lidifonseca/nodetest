import { ICepbrBairro } from 'app/shared/model/cepbr-bairro.model';
import { ICepbrEndereco } from 'app/shared/model/cepbr-endereco.model';
import { ICepbrEstado } from 'app/shared/model/cepbr-estado.model';

export interface ICepbrCidade {
  id?: string;
  idCidade?: number;
  cidade?: string;
  codIbge?: string;
  area?: number;
  cepbrBairros?: ICepbrBairro[];
  cepbrEnderecos?: ICepbrEndereco[];
  uf?: string | any;
}

export const defaultValue: Readonly<ICepbrCidade> = {};
