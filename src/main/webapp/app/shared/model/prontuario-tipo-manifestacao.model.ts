export interface IProntuarioTipoManifestacao {
  id?: string;
  nome?: string;
  idPai?: number;
  ativo?: number;
}

export const defaultValue: Readonly<IProntuarioTipoManifestacao> = {};
