import { Moment } from 'moment';

export interface IRespostasQuestionarios {
  id?: string;
  dataResposta?: Moment;
  informacaoAdicional?: string;
  questionarioId?: number;
}

export const defaultValue: Readonly<IRespostasQuestionarios> = {};
