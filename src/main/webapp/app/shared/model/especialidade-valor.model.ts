import { IEspecialidade } from 'app/shared/model/especialidade.model';

export interface IEspecialidadeValor {
  id?: string;
  idFranquia?: string;
  valor?: number;
  ativo?: boolean;
  especialidade?: string | any;
}

export const defaultValue: Readonly<IEspecialidadeValor> = {
  ativo: false
};
