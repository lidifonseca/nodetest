import { IIndicadoresValores } from 'app/shared/model/indicadores-valores.model';

export interface IIndicadores {
  id?: string;
  titulo?: string;
  indicadoresValores?: IIndicadoresValores[];
}

export const defaultValue: Readonly<IIndicadores> = {};
