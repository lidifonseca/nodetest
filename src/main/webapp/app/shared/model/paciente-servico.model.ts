export interface IPacienteServico {
  id?: string;
  idPaciente?: number;
  servico?: number;
}

export const defaultValue: Readonly<IPacienteServico> = {};
