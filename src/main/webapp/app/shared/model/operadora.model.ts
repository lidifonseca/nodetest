import { IAtendimento } from 'app/shared/model/atendimento.model';
import { IEspecialidadeOperadora } from 'app/shared/model/especialidade-operadora.model';
import { IPacienteOperadora } from 'app/shared/model/paciente-operadora.model';
import { ITipoOperadora } from 'app/shared/model/tipo-operadora.model';

export interface IOperadora {
  id?: string;
  nomeFantasia?: string;
  razaoSocial?: string;
  cnpj?: string;
  ie?: string;
  site?: string;
  ativo?: number;
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
  atendimentos?: IAtendimento[];
  especialidadeOperadoras?: IEspecialidadeOperadora[];
  pacienteOperadoras?: IPacienteOperadora[];
  idTipoOperadora?: string | any;
}

export const defaultValue: Readonly<IOperadora> = {};
