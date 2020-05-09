export interface IProntuarioTipoManifestacao {
  id?: string;
  nome?: string;
  idPai?: number;
  ativo?: boolean;
}

export const defaultValue: Readonly<IProntuarioTipoManifestacao> = {
  ativo: false
};
