import { IProfissional } from 'app/shared/model/profissional.model';
import { IAtendimento } from 'app/shared/model/atendimento.model';

export interface IAtendimentoAceite {
  id?: string;
  msgPush?: string;
  profissional?: string | any;
  atendimento?: string | any;
}

export const defaultValue: Readonly<IAtendimentoAceite> = {};
