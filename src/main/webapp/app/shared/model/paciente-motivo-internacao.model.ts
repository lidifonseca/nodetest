export interface IPacienteMotivoInternacao {
  id?: string;
  idPaciente?: number;
  idMotivoInternacao?: number;
  idUsuario?: number;
}

export const defaultValue: Readonly<IPacienteMotivoInternacao> = {};
