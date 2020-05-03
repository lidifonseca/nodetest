import { Moment } from 'moment';

export interface IFilesPanico {
  id?: string;
  idPanico?: number;
  idPaciente?: number;
  tipo?: string;
  imagem?: string;
  criadoEm?: Moment;
}

export const defaultValue: Readonly<IFilesPanico> = {};
