export interface ITipoProntuario {
  id?: string;
  prontuario?: string;
  ativo?: boolean;
}

export const defaultValue: Readonly<ITipoProntuario> = {
  ativo: false
};
