import { Moment } from 'moment';
import { IEspecialidade } from 'app/shared/model/especialidade.model';

export interface ITipoEspecialidade {
  id?: string;
  tipoEspecialidade?: string;
  dataPost?: Moment;
  especialidades?: IEspecialidade[];
}

export const defaultValue: Readonly<ITipoEspecialidade> = {};
