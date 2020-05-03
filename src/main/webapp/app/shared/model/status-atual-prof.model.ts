import { Moment } from 'moment';
import { IProfissionalStatusAtual } from 'app/shared/model/profissional-status-atual.model';

export interface IStatusAtualProf {
  id?: string;
  statusAtualProf?: string;
  styleLabel?: string;
  dataPost?: Moment;
  profissionalStatusAtuals?: IProfissionalStatusAtual[];
}

export const defaultValue: Readonly<IStatusAtualProf> = {};
