export interface IMotivoInternacao {
  id?: string;
  nome?: string;
  idPai?: number;
  ativo?: number;
  classe?: string;
  name?: string;
}

export const defaultValue: Readonly<IMotivoInternacao> = {};
