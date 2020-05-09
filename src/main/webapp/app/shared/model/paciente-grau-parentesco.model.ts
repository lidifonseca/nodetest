export interface IPacienteGrauParentesco {
  id?: string;
  grauParentesco?: string;
  ativo?: boolean;
}

export const defaultValue: Readonly<IPacienteGrauParentesco> = {
  ativo: false
};
