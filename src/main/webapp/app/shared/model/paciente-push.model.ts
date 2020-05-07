export interface IPacientePush {
  id?: string;
  idFranquia?: string;
  mensagem?: string;
  ativo?: number;
}

export const defaultValue: Readonly<IPacientePush> = {};
