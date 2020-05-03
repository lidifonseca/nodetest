import { ICategoriaAtividade } from 'app/shared/model/categoria-atividade.model';
import { IAtendimento } from 'app/shared/model/atendimento.model';

export interface IAtendimentoAtividades {
  id?: string;
  feito?: number;
  idAtividade?: string | any;
  idAtendimento?: string | any;
}

export const defaultValue: Readonly<IAtendimentoAtividades> = {};
