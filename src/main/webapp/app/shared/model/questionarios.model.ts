import { Moment } from 'moment';
import { IRespostasQuestionarios } from 'app/shared/model/respostas-questionarios.model';
import { IPaciente } from 'app/shared/model/paciente.model';

export interface IQuestionarios {
  id?: string;
  dataCadastro?: Moment;
  etapaAtual?: string;
  finalizado?: boolean;
  ultimaPerguntaRespondida?: number;
  respostasQuestionarios?: IRespostasQuestionarios[];
  pacienteNome?: string;
  paciente?: string | any;
}

export const defaultValue: Readonly<IQuestionarios> = {
  finalizado: false
};
