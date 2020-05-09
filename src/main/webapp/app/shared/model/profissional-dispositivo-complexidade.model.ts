export interface IProfissionalDispositivoComplexidade {
  id?: string;
  caracteristica?: string;
  ativo?: boolean;
  tipo?: string;
}

export const defaultValue: Readonly<IProfissionalDispositivoComplexidade> = {
  ativo: false
};
