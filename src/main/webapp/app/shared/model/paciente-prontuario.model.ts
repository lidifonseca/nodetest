import { Moment } from 'moment';

export interface IPacienteProntuario {
  id?: string;
  idPaciente?: string;
  idTipoProntuario?: number;
  oQue?: any;
  resultado?: any;
  ativo?: boolean;
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
  dataManifestacao?: Moment;
}

export const defaultValue: Readonly<IPacienteProntuario> = {
  ativo: false
};
