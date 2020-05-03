import { IAtendimento } from 'app/shared/model/atendimento.model';
import { IProfissional } from 'app/shared/model/profissional.model';
import { IPaciente } from 'app/shared/model/paciente.model';

export interface IAtendimentoAssinaturas {
  id?: string;
  arquivoAssinatura?: string;
  idAtendimento?: string | any;
  idProfissional?: string | any;
  idPaciente?: string | any;
}

export const defaultValue: Readonly<IAtendimentoAssinaturas> = {};
