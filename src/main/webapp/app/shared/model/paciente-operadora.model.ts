import { IPaciente } from 'app/shared/model/paciente.model';
import { IOperadora } from 'app/shared/model/operadora.model';

export interface IPacienteOperadora {
  id?: string;
  registro?: string;
  ativo?: boolean;
  paciente?: string | any;
  operadora?: string | any;
}

export const defaultValue: Readonly<IPacienteOperadora> = {
  ativo: false
};
