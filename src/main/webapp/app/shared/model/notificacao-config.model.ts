import { Moment } from 'moment';

export interface INotificacaoConfig {
  id?: string;
  criadoEm?: Moment;
  titulo?: string;
  referencia?: string;
  descricao?: string;
  ativo?: boolean;
  envioObrigatorio?: boolean;
  serveProfissional?: boolean;
  servePaciente?: boolean;
}

export const defaultValue: Readonly<INotificacaoConfig> = {
  ativo: false,
  envioObrigatorio: false,
  serveProfissional: false,
  servePaciente: false
};
