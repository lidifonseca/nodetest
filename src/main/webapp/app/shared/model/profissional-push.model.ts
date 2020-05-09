export interface IProfissionalPush {
  id?: string;
  idProfissional?: string;
  idFranquia?: string;
  mensagem?: string;
  ativo?: boolean;
}

export const defaultValue: Readonly<IProfissionalPush> = {
  ativo: false
};
