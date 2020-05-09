import { IAtendimento } from 'app/shared/model/atendimento.model';
import { IEspecialidadeOperadora } from 'app/shared/model/especialidade-operadora.model';
import { IEspecialidadeUnidade } from 'app/shared/model/especialidade-unidade.model';
import { IEspecialidadeValor } from 'app/shared/model/especialidade-valor.model';
import { IPacientePedido } from 'app/shared/model/paciente-pedido.model';
import { IPadItem } from 'app/shared/model/pad-item.model';
import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { ICategoria } from 'app/shared/model/categoria.model';
import { ITipoEspecialidade } from 'app/shared/model/tipo-especialidade.model';
import { ITipoUnidade } from 'app/shared/model/tipo-unidade.model';
import { IProfissional } from 'app/shared/model/profissional.model';

export interface IEspecialidade {
  id?: string;
  icon?: string;
  especialidade?: string;
  descricao?: any;
  duracao?: number;
  importante?: string;
  ativo?: boolean;
  atendimentos?: IAtendimento[];
  especialidadeOperadoras?: IEspecialidadeOperadora[];
  especialidadeUnidades?: IEspecialidadeUnidade[];
  especialidadeValors?: IEspecialidadeValor[];
  pacientePedidos?: IPacientePedido[];
  padItems?: IPadItem[];
  unidadeRazaoSocial?: string;
  unidade?: string | any;
  categoria?: string | any;
  tipoEspecialidade?: string | any;
  tipoUnidade?: string | any;
  profissionals?: IProfissional[];
}

export const defaultValue: Readonly<IEspecialidade> = {
  ativo: false
};
