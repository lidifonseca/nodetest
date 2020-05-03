import { Moment } from 'moment';

export interface IPacienteProntuario {
  id?: string;
  idPaciente?: string;
  idTipoProntuario?: number;
  oQue?: string;
  resultado?: string;
  ativo?: number;
  idUsuario?: string;
  idEspecialidade?: number;
  dataConsulta?: Moment;
  idExame?: number;
  idTipoExame?: number;
  dataExame?: Moment;
  dataInternacao?: Moment;
  dataAlta?: Moment;
  dataPs?: Moment;
  dataOcorrencia?: Moment;
  idOcorrenciaProntuario?: number;
  dataPost?: Moment;
  dataManifestacao?: Moment;
}

export const defaultValue: Readonly<IPacienteProntuario> = {};
