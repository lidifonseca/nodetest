import { IRespostas } from 'app/shared/model/respostas.model';
import { IPerguntasQuestionario } from 'app/shared/model/perguntas-questionario.model';

export interface IAcoesRespostas {
  id?: string;
  abrirCampoPersonalizado?: boolean;
  condicaoSexo?: string;
  observacoes?: string;
  tipoCampo1?: string;
  tipoCampo2?: string;
  respostas?: string | any;
  perguntasQuestionario?: string | any;
}

export const defaultValue: Readonly<IAcoesRespostas> = {
  abrirCampoPersonalizado: false
};
