export interface IProntuarioTipoMotivo {
  id?: string;
  nome?: string;
  idPai?: number;
  ativo?: number;
  classe?: string;
  name?: string;
  idTipoProntuario?: number;
}

export const defaultValue: Readonly<IProntuarioTipoMotivo> = {};
