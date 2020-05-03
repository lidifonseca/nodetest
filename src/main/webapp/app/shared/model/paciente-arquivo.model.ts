export interface IPacienteArquivo {
  id?: string;
  idPaciente?: string;
  arquivo?: string;
  ativo?: number;
}

export const defaultValue: Readonly<IPacienteArquivo> = {};
