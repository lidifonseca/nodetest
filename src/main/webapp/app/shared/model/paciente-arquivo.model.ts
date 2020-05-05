import { IPaciente } from 'app/shared/model/paciente.model';

export interface IPacienteArquivo {
  id?: string;
  arquivoContentType?: string;
  arquivo?: any;
  ativo?: number;
  pacienteNome?: string;
  paciente?: string | any;
}

export const defaultValue: Readonly<IPacienteArquivo> = {};
