import { IIndicadores } from 'app/shared/model/indicadores.model';

export interface IIndicadoresValores {
  id?: string;
  sexo?: string;
  vlMinimo?: string;
  vlMaximo?: string;
  unidadeMedida?: string;
  idadeMinima?: string;
  idadeMaxima?: string;
  indicadores?: string | any;
}

export const defaultValue: Readonly<IIndicadoresValores> = {};
