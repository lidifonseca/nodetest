import { Moment } from 'moment';

export interface IAtendimentoAcompanhamentoPush {
  id?: string;
  atendimentoId?: number;
  pacienteId?: number;
  profissionalId?: number;
  timestampAtendimento?: Moment;
  nomePaciente?: string;
  nomeProfissioinal?: string;
  timestampConfirmacao?: Moment;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IAtendimentoAcompanhamentoPush> = {};
