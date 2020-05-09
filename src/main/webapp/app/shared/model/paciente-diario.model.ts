import { IPaciente } from 'app/shared/model/paciente.model';
import { IUsuario } from 'app/shared/model/usuario.model';

export interface IPacienteDiario {
  id?: string;
  idOperadora?: number;
  historico?: any;
  ativo?: boolean;
  paciente?: string | any;
  usuario?: string | any;
}

export const defaultValue: Readonly<IPacienteDiario> = {
  ativo: false
};
