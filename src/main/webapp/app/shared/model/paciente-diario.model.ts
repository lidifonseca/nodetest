import { IPaciente } from 'app/shared/model/paciente.model';
import { IUsuario } from 'app/shared/model/usuario.model';

export interface IPacienteDiario {
  id?: string;
  idOperadora?: number;
  historico?: string;
  ativo?: number;
  idPaciente?: string | any;
  idUsuario?: string | any;
}

export const defaultValue: Readonly<IPacienteDiario> = {};
