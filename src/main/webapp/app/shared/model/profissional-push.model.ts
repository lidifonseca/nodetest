export interface IProfissionalPush {
  id?: string;
  idProfissional?: string;
  idFranquia?: string;
  mensagem?: string;
  ativo?: number;
}

export const defaultValue: Readonly<IProfissionalPush> = {};
