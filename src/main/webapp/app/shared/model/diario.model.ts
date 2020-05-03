import { IUsuario } from 'app/shared/model/usuario.model';
import { IPaciente } from 'app/shared/model/paciente.model';

export interface IDiario {
  id?: string;
  historico?: string;
  gerarPdf?: number;
  idUsuario?: string | any;
  idPaciente?: string | any;
}

export const defaultValue: Readonly<IDiario> = {};
