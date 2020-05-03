import { Moment } from 'moment';
import { IAtendimentoAtividades } from 'app/shared/model/atendimento-atividades.model';
import { IPadItemAtividade } from 'app/shared/model/pad-item-atividade.model';
import { ICategoria } from 'app/shared/model/categoria.model';

export interface ICategoriaAtividade {
  id?: string;
  atividade?: string;
  dataPost?: Moment;
  idUnidade?: number;
  atendimentoAtividades?: IAtendimentoAtividades[];
  padItemAtividades?: IPadItemAtividade[];
  idCategoria?: string | any;
}

export const defaultValue: Readonly<ICategoriaAtividade> = {};
