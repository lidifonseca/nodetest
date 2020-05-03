import { IPaciente } from 'app/shared/model/paciente.model';

export interface IPacientePush {
  id?: string;
  idFranquia?: string;
  mensagem?: string;
  ativo?: number;
  idPaciente?: string | any;
}

export const defaultValue: Readonly<IPacientePush> = {};
