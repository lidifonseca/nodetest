import { Moment } from 'moment';
import { IAtendimento } from 'app/shared/model/atendimento.model';
import { IEspecialidadeOperadora } from 'app/shared/model/especialidade-operadora.model';
import { IPacienteOperadora } from 'app/shared/model/paciente-operadora.model';

export interface IOperadora {
  id?: string;
  nomeFantasia?: string;
  razaoSocial?: string;
  cnpj?: string;
  ie?: string;
  site?: string;
  ativo?: number;
  dataPost?: Moment;
  idUnidade?: number;
  endereco?: string;
  contatoCentralAtendimento?: string;
  emailCentralAtendimento?: string;
  nomeContatoComercial?: string;
  contatoComercial?: string;
  emailComercial?: string;
  nomeContatoFinanceiro?: string;
  contatoFinanceiro?: string;
  emailFinanceiro?: string;
  idTipoOperadora?: number;
  atendimentos?: IAtendimento[];
  especialidadeOperadoras?: IEspecialidadeOperadora[];
  pacienteOperadoras?: IPacienteOperadora[];
}

export const defaultValue: Readonly<IOperadora> = {};
