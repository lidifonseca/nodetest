export interface IAlertasIndicadores {
  id?: string;
  pontuacao?: number;
  alteracaoEsperada?: boolean;
  observacoes?: string;
  usuarioId?: number;
}

export const defaultValue: Readonly<IAlertasIndicadores> = {
  alteracaoEsperada: false
};
