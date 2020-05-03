export interface IJunho {
  id?: string;
  idFranquia?: number;
  idPaciente?: number;
  nroPad?: string;
  dataInicio?: string;
  dataFim?: string;
  idEspecialidade?: number;
  idPeriodicidade?: number;
  idPeriodo?: number;
  qtdSessoes?: number;
}

export const defaultValue: Readonly<IJunho> = {};
