import { Moment } from 'moment';
import { IAtendimento } from 'app/shared/model/atendimento.model';
import { IEmpresa } from 'app/shared/model/empresa.model';
import { IUf } from 'app/shared/model/uf.model';

export interface ICidade {
  id?: string;
  descrCidade?: string;
  dataPost?: Moment;
  atendimentos?: IAtendimento[];
  empresas?: IEmpresa[];
  idUf?: string | any;
}

export const defaultValue: Readonly<ICidade> = {};
