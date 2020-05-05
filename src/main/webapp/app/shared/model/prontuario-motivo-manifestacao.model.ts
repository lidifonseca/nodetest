export interface IProntuarioMotivoManifestacao {
  id?: string;
  idProntuario?: number;
  idPaciente?: number;
  idMotivo?: number;
  idMotivoFilho?: number;
  idManifestacao?: number;
  idManifestacaoFilho?: number;
  sugestao?: string;
  idUsuario?: number;
  informacaoAdicional?: string;
}

export const defaultValue: Readonly<IProntuarioMotivoManifestacao> = {};
