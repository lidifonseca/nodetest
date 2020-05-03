import { Moment } from 'moment';

export interface IPadMatMed {
  id?: string;
  idPad?: number;
  idMatMed?: number;
  qtd?: number;
  idUsuario?: number;
  dataPost?: Moment;
  ativo?: number;
}

export const defaultValue: Readonly<IPadMatMed> = {};
