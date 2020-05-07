export interface IProntuarioMotivoManifestacao {
  id?: string;
  idProntuario?: number;
  idPaciente?: number;
  idMotivo?: number;
  idMotivoFilho?: number;
  idManifestacao?: number;
  idManifestacaoFilho?: number;
  sugestao?: any;
  informacaoAdicional?: any;
}

export const defaultValue: Readonly<IProntuarioMotivoManifestacao> = {};
