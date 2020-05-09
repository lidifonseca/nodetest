export interface IAtividades {
  id?: string;
  atividade?: string;
  ativo?: boolean;
}

export const defaultValue: Readonly<IAtividades> = {
  ativo: false
};
