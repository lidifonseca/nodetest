import { Moment } from 'moment';

export interface IAtendimentoImagem {
  id?: string;
  atendimentoId?: number;
  imagem?: string;
  criadoEm?: Moment;
}

export const defaultValue: Readonly<IAtendimentoImagem> = {};
