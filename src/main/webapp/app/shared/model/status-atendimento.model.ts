import { IAtendimento } from 'app/shared/model/atendimento.model';

export interface IStatusAtendimento {
  id?: string;
  statusAtendimento?: string;
  styleLabel?: string;
  ordenacao?: number;
  ativo?: boolean;
  atendimentos?: IAtendimento[];
}

export const defaultValue: Readonly<IStatusAtendimento> = {
  ativo: false
};
