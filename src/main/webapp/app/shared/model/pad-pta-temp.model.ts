import { Moment } from 'moment';

export interface IPadPtaTemp {
  id?: string;
  sessionId?: string;
  idPta?: number;
  idCid?: number;
  idUsuario?: number;
  dataPost?: Moment;
  cidXPtaNovoId?: number;
}

export const defaultValue: Readonly<IPadPtaTemp> = {};
