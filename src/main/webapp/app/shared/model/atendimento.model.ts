import { Moment } from 'moment';
import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';

export interface IAtendimento {
  id?: string;
  idFranquia?: string;
  idProfissional?: string;
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
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
  unidadeRazaoSocial?: string;
  unidade?: string | any;
}

export const defaultValue: Readonly<IAtendimento> = {};
