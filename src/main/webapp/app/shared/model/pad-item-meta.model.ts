import { Moment } from 'moment';

export interface IPadItemMeta {
  id?: string;
  unidadeMedidaId?: number;
  indicadorId?: number;
  idPaciente?: number;
  idPad?: number;
  idPadItem?: number;
  minimo?: string;
  maximo?: string;
  meta?: string;
  valorAtual?: string;
  atualizadoEm?: Moment;
  dataLimite?: Moment;
  frequenciaMedicaoHoras?: number;
  tipoAcompanhamento?: string;
  atendimentoId?: number;
  email?: number;
  minimoSistolica?: string;
  maximoSistolica?: string;
  minimoDiastolica?: string;
  maximoDiastolica?: string;
  idUsuario?: number;
  score?: number;
  alteracaoEsperada?: boolean;
}

export const defaultValue: Readonly<IPadItemMeta> = {
  alteracaoEsperada: false
};
