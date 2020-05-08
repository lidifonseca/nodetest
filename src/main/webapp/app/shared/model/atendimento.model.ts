import { Moment } from 'moment';
import { IAtendimentoAceite } from 'app/shared/model/atendimento-aceite.model';
import { IAtendimentoAssinaturas } from 'app/shared/model/atendimento-assinaturas.model';
import { IAtendimentoAtividades } from 'app/shared/model/atendimento-atividades.model';
import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { IPaciente } from 'app/shared/model/paciente.model';
import { IOperadora } from 'app/shared/model/operadora.model';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { IPadItem } from 'app/shared/model/pad-item.model';
import { IStatusAtendimento } from 'app/shared/model/status-atendimento.model';
import { IPeriodo } from 'app/shared/model/periodo.model';
import { ICidade } from 'app/shared/model/cidade.model';

export interface IAtendimento {
  id?: string;
  idFranquia?: string;
  idProfissional?: string;
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  uf?: string;
  latitude?: string;
  longitude?: string;
  dataAgenda?: Moment;
  horario?: string;
  dataChegada?: Moment;
  latitudeChegada?: string;
  longitudeChegada?: string;
  dataSaida?: Moment;
  latitudeSaida?: string;
  longitudeSaida?: string;
  evolucao?: string;
  observacao?: string;
  intercorrencia?: number;
  avaliacao?: number;
  aceito?: number;
  motivo?: string;
  valor?: number;
  ordemAtendimento?: number;
  ativo?: number;
  dataForaHora?: Moment;
  idUsuarioCancelamento?: number;
  dataCancelamento?: Moment;
  tipoUsuarioCancelamento?: string;
  confidencialProfissional?: string;
  confidencialPaciente?: string;
  imagemAssinatura?: string;
  atendimentoAceites?: IAtendimentoAceite[];
  atendimentoAssinaturas?: IAtendimentoAssinaturas[];
  atendimentoAtividades?: IAtendimentoAtividades[];
  unidadeRazaoSocial?: string;
  unidade?: string | any;
  paciente?: string | any;
  operadora?: string | any;
  especialidade?: string | any;
  padItem?: string | any;
  statusAtendimento?: string | any;
  periodo?: string | any;
  cidade?: string | any;
}

export const defaultValue: Readonly<IAtendimento> = {};
