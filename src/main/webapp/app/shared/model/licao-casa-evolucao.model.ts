import { Moment } from 'moment';

export interface ILicaoCasaEvolucao {
  id?: string;
  licaoCasaId?: number;
  atualizadoEm?: Moment;
  realizada?: boolean;
  realizadaEm?: Moment;
  observacoes?: string;
  instrucoes?: string;
  dataAgenda?: Moment;
  qtdLembrete?: boolean;
}

export const defaultValue: Readonly<ILicaoCasaEvolucao> = {
  realizada: false,
  qtdLembrete: false
};
