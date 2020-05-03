import { Moment } from 'moment';
import { IEspecialidade } from 'app/shared/model/especialidade.model';

export interface IEspecialidadeValor {
  id?: string;
  idFranquia?: string;
  valor?: number;
  ativo?: number;
  dataPost?: Moment;
  idEspecialidade?: string | any;
}

export const defaultValue: Readonly<IEspecialidadeValor> = {};
