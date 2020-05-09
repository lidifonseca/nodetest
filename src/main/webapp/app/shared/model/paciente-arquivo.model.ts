import { IPaciente } from 'app/shared/model/paciente.model';

export interface IPacienteArquivo {
  id?: string;
  arquivoContentType?: string;
  arquivoBase64?: string;
  arquivo?: any;
  ativo?: boolean;
  pacienteNome?: string;
  paciente?: string | any;
}

export const defaultValue: Readonly<IPacienteArquivo> = {
  ativo: false
};
