export interface IMotivoPs {
  id?: string;
  nome?: string;
  idPai?: number;
  ativo?: boolean;
  classe?: string;
  name?: string;
}

export const defaultValue: Readonly<IMotivoPs> = {
  ativo: false
};
