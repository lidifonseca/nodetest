import { IAcoesRespostas } from 'app/shared/model/acoes-respostas.model';
import { IRespostas } from 'app/shared/model/respostas.model';
import { ISegmentosPerguntas } from 'app/shared/model/segmentos-perguntas.model';

export interface IPerguntasQuestionario {
  id?: string;
  pergunta?: string;
  tipoResposta?: string;
  obrigatorio?: boolean;
  tipoCampo?: string;
  acoesRespostas?: IAcoesRespostas[];
  respostas?: IRespostas[];
  segmentosPerguntasId?: string | any;
}

export const defaultValue: Readonly<IPerguntasQuestionario> = {
  obrigatorio: false
};
