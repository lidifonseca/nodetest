export interface IIndicadoresValores {
  id?: string;
  sexo?: string;
  vlMinimo?: string;
  vlMaximo?: string;
  unidadeMedida?: string;
  idadeMinima?: string;
  idadeMaxima?: string;
}

export const defaultValue: Readonly<IIndicadoresValores> = {};
