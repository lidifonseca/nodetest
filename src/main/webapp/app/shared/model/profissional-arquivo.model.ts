import { Moment } from 'moment';

export interface IProfissionalArquivo {
  id?: string;
  idProfissional?: string;
  arquivo?: string;
  ativo?: number;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IProfissionalArquivo> = {};
