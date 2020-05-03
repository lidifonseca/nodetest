import { Moment } from 'moment';
import { IQuestionarios } from 'app/shared/model/questionarios.model';

export interface IRespostasQuestionarios {
  id?: string;
  dataResposta?: Moment;
  informacaoAdicional?: string;
  questionarioId?: number;
  questionariosId?: string | any;
}

export const defaultValue: Readonly<IRespostasQuestionarios> = {};
