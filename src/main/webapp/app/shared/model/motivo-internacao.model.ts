export interface IMotivoInternacao {
  id?: string;
  nome?: string;
  idPai?: number;
  ativo?: boolean;
  classe?: string;
  name?: string;
}

export const defaultValue: Readonly<IMotivoInternacao> = {
  ativo: false
};
