import { IUsuario } from 'app/shared/model/usuario.model';
import { IPaciente } from 'app/shared/model/paciente.model';

export interface IDiario {
  id?: string;
  historico?: any;
  gerarPdf?: boolean;
  usuario?: string | any;
  paciente?: string | any;
}

export const defaultValue: Readonly<IDiario> = {
  gerarPdf: false
};
