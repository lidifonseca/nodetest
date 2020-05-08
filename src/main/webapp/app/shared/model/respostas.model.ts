import { IAcoesRespostas } from 'app/shared/model/acoes-respostas.model';
import { IPerguntasQuestionario } from 'app/shared/model/perguntas-questionario.model';

export interface IRespostas {
  id?: string;
  resposta?: string;
  pontuacao?: number;
  respostaAtiva?: boolean;
  acoesRespostas?: IAcoesRespostas[];
  perguntasQuestionario?: string | any;
}

export const defaultValue: Readonly<IRespostas> = {
  respostaAtiva: false
};
