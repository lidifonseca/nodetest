import { Moment } from 'moment';

export interface IProntuarioMotivoInternacaoPs {
  id?: string;
  idProntuario?: number;
  idPaciente?: number;
  idMotivo?: number;
  idUsuario?: number;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IProntuarioMotivoInternacaoPs> = {};
