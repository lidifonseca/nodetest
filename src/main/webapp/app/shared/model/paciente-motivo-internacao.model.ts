export interface IPacienteMotivoInternacao {
  id?: string;
  idPaciente?: number;
  idMotivoInternacao?: number;
  idUsuario?: number;
  dataPost?: string;
}

export const defaultValue: Readonly<IPacienteMotivoInternacao> = {};
