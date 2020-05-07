export interface IAlertasResultadosEsperados {
  id?: string;
  pontuacao?: number;
  alteracaoEsperada?: boolean;
  observacoes?: string;
  usuarioId?: number;
  valor?: number;
}

export const defaultValue: Readonly<IAlertasResultadosEsperados> = {
  alteracaoEsperada: false
};
