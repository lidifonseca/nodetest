import { Moment } from 'moment';

export interface ILicaoCasa {
  id?: string;
  atendimentoId?: number;
  pacienteId?: number;
  profissionalId?: number;
  atividade?: string;
  horaInicio?: Moment;
  repeticaoHoras?: boolean;
  qtdDias?: boolean;
  intervaloDias?: boolean;
  criadoEm?: Moment;
  concluidaEm?: Moment;
  ativo?: boolean;
  ativ?: number;
  forma?: string;
  enviarPara?: string;
  notificarFamiliar?: string;
  replicarAtividade?: string;
}

export const defaultValue: Readonly<ILicaoCasa> = {
  repeticaoHoras: false,
  qtdDias: false,
  intervaloDias: false,
  ativo: false
};
