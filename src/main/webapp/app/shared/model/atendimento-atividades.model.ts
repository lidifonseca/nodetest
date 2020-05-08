import { ICategoriaAtividade } from 'app/shared/model/categoria-atividade.model';
import { IAtendimento } from 'app/shared/model/atendimento.model';

export interface IAtendimentoAtividades {
  id?: string;
  feito?: number;
  atividade?: string | any;
  atendimento?: string | any;
}

export const defaultValue: Readonly<IAtendimentoAtividades> = {};
