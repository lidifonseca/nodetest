import { Moment } from 'moment';

export interface IPadPta {
  id?: string;
  idPad?: string;
  idDescPta?: string;
  idCid?: string;
  idUsuario?: string;
  dataPost?: Moment;
  idCidXPtaNovo?: number;
}

export const defaultValue: Readonly<IPadPta> = {};
