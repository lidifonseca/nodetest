import { Moment } from 'moment';
import { IProfissional } from 'app/shared/model/profissional.model';
import { IAtendimento } from 'app/shared/model/atendimento.model';

export interface IAtendimentoAceite {
  id?: string;
  msgPush?: string;
  dataPost?: Moment;
  idProfissional?: string | any;
  idAtendimento?: string | any;
}

export const defaultValue: Readonly<IAtendimentoAceite> = {};
