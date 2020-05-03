import { Moment } from 'moment';
import { IEspecialidade } from 'app/shared/model/especialidade.model';

export interface ITipoUnidade {
  id?: string;
  tipoUnidade?: string;
  dataPost?: Moment;
  especialidades?: IEspecialidade[];
}

export const defaultValue: Readonly<ITipoUnidade> = {};
