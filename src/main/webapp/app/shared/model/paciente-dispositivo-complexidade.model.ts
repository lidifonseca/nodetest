export interface IPacienteDispositivoComplexidade {
  id?: string;
  caracteristica?: string;
  ativo?: boolean;
  tipo?: string;
}

export const defaultValue: Readonly<IPacienteDispositivoComplexidade> = {
  ativo: false
};
