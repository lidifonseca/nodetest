export interface IPacienteCaracteristicaAtual {
  id?: string;
  idPaciente?: number;
  idPacienteCaracteristica?: number;
  idUsuario?: number;
}

export const defaultValue: Readonly<IPacienteCaracteristicaAtual> = {};
