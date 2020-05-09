import { IStatusAtualProf } from 'app/shared/model/status-atual-prof.model';

export interface IProfissionalStatusAtual {
  id?: string;
  idProfissional?: string;
  obs?: any;
  ativo?: boolean;
  statusAtualProf?: string | any;
}

export const defaultValue: Readonly<IProfissionalStatusAtual> = {
  ativo: false
};
