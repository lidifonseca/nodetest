import { IEspecialidade } from 'app/shared/model/especialidade.model';

export interface ITipoUnidade {
  id?: string;
  tipoUnidade?: string;
  especialidades?: IEspecialidade[];
}

export const defaultValue: Readonly<ITipoUnidade> = {};
