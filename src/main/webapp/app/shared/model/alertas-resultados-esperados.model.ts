import { IResultados } from 'app/shared/model/resultados.model';

export interface IAlertasResultadosEsperados {
  id?: string;
  pontuacao?: number;
  alteracaoEsperada?: boolean;
  observacoes?: string;
  usuarioId?: number;
  valor?: number;
  resultados?: string | any;
}

export const defaultValue: Readonly<IAlertasResultadosEsperados> = {
  alteracaoEsperada: false
};
