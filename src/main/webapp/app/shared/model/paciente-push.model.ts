import { IPaciente } from 'app/shared/model/paciente.model';

export interface IPacientePush {
  id?: string;
  idFranquia?: string;
  mensagem?: string;
  ativo?: boolean;
  paciente?: string | any;
}

export const defaultValue: Readonly<IPacientePush> = {
  ativo: false
};
