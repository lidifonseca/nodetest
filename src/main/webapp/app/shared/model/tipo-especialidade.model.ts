import { IEspecialidade } from 'app/shared/model/especialidade.model';

export interface ITipoEspecialidade {
  id?: string;
  tipoEspecialidade?: string;
  especialidades?: IEspecialidade[];
}

export const defaultValue: Readonly<ITipoEspecialidade> = {};
