import { IEspecialidade } from 'app/shared/model/especialidade.model';

export interface IEspecialidadeValor {
  id?: string;
  idFranquia?: string;
  valor?: number;
  ativo?: number;
  especialidade?: string | any;
}

export const defaultValue: Readonly<IEspecialidadeValor> = {};
