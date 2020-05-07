import { Moment } from 'moment';
import { IPaciente } from 'app/shared/model/paciente.model';

export interface IQuestionarios {
  id?: string;
  dataCadastro?: Moment;
  etapaAtual?: string;
  finalizado?: boolean;
  ultimaPerguntaRespondida?: number;
  pacienteNome?: string;
  paciente?: string | any;
}

export const defaultValue: Readonly<IQuestionarios> = {
  finalizado: false
};
