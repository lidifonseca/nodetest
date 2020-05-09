import { IAtendimento } from 'app/shared/model/atendimento.model';
import { ICategoriaAtividade } from 'app/shared/model/categoria-atividade.model';

export interface IAtendimentoAtividades {
  id?: string;
  feito?: number;
  atendimento?: string | any;
  atividade?: string | any;
}

export const defaultValue: Readonly<IAtendimentoAtividades> = {};
