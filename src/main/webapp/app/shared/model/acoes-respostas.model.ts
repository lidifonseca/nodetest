export interface IAcoesRespostas {
  id?: string;
  abrirCampoPersonalizado?: boolean;
  condicaoSexo?: string;
  observacoes?: string;
  tipoCampo1?: string;
  tipoCampo2?: string;
}

export const defaultValue: Readonly<IAcoesRespostas> = {
  abrirCampoPersonalizado: false
};
