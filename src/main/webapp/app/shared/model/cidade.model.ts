import { IAtendimento } from 'app/shared/model/atendimento.model';
import { IEmpresa } from 'app/shared/model/empresa.model';
import { IUf } from 'app/shared/model/uf.model';

export interface ICidade {
  id?: string;
  descrCidade?: string;
  atendimentos?: IAtendimento[];
  empresas?: IEmpresa[];
  uf?: string | any;
}

export const defaultValue: Readonly<ICidade> = {};
