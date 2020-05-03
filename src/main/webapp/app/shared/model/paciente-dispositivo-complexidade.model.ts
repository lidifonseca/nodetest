export interface IPacienteDispositivoComplexidade {
  id?: string;
  caracteristica?: string;
  ativo?: number;
  tipo?: string;
}

export const defaultValue: Readonly<IPacienteDispositivoComplexidade> = {};
