import { ICategoriaAtividade } from 'app/shared/model/categoria-atividade.model';
import { ICategoriaContrato } from 'app/shared/model/categoria-contrato.model';
import { ICategoriaUnidade } from 'app/shared/model/categoria-unidade.model';
import { ICidXPtaNovoPadItemIndi } from 'app/shared/model/cid-x-pta-novo-pad-item-indi.model';
import { IEspecialidade } from 'app/shared/model/especialidade.model';

export interface ICategoria {
  id?: string;
  categoria?: string;
  styleCategoria?: string;
  icon?: string;
  publicar?: number;
  ordem?: number;
  publicarSite?: number;
  categoriaAtividades?: ICategoriaAtividade[];
  categoriaContratoes?: ICategoriaContrato[];
  categoriaUnidades?: ICategoriaUnidade[];
  cidXPtaNovoPadItemIndis?: ICidXPtaNovoPadItemIndi[];
  especialidades?: IEspecialidade[];
}

export const defaultValue: Readonly<ICategoria> = {};
