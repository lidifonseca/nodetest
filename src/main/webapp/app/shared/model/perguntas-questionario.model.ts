export interface IPerguntasQuestionario {
  id?: string;
  pergunta?: string;
  tipoResposta?: string;
  obrigatorio?: boolean;
  tipoCampo?: string;
}

export const defaultValue: Readonly<IPerguntasQuestionario> = {
  obrigatorio: false
};
