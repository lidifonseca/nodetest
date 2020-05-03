import { Moment } from 'moment';

export interface INotificacaoConfigUsuario {
  id?: string;
  notificacaoConfigId?: number;
  profissionalId?: number;
  pacienteId?: number;
  atualizadoEm?: Moment;
  atualizadoPor?: number;
  enviarPush?: boolean;
  enviarEmail?: boolean;
  observacao?: string;
}

export const defaultValue: Readonly<INotificacaoConfigUsuario> = {
  enviarPush: false,
  enviarEmail: false
};
