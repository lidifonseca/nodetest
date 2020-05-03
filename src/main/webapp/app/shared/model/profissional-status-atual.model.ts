import { Moment } from 'moment';
import { IStatusAtualProf } from 'app/shared/model/status-atual-prof.model';

export interface IProfissionalStatusAtual {
  id?: string;
  idProfissional?: string;
  obs?: string;
  ativo?: number;
  dataPost?: Moment;
  idUsuario?: string;
  idStatusAtualProf?: string | any;
}

export const defaultValue: Readonly<IProfissionalStatusAtual> = {};
