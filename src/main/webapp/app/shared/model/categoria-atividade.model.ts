import { IAtendimentoAtividades } from 'app/shared/model/atendimento-atividades.model';
import { IPadItemAtividade } from 'app/shared/model/pad-item-atividade.model';
import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { ICategoria } from 'app/shared/model/categoria.model';

export interface ICategoriaAtividade {
  id?: string;
  atividade?: string;
  atendimentoAtividades?: IAtendimentoAtividades[];
  padItemAtividades?: IPadItemAtividade[];
  unidadeRazaoSocial?: string;
  unidade?: string | any;
  idCategoria?: string | any;
}

export const defaultValue: Readonly<ICategoriaAtividade> = {};
