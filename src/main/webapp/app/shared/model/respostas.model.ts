export interface IRespostas {
  id?: string;
  resposta?: string;
  pontuacao?: number;
  respostaAtiva?: boolean;
}

export const defaultValue: Readonly<IRespostas> = {
  respostaAtiva: false
};
