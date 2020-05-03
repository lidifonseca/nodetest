import { IPerguntasQuestionario } from 'app/shared/model/perguntas-questionario.model';

export interface ISegmentosPerguntas {
  id?: string;
  segmento?: string;
  perguntasQuestionarios?: IPerguntasQuestionario[];
}

export const defaultValue: Readonly<ISegmentosPerguntas> = {};
