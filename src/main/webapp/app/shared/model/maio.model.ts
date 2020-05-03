export interface IMaio {
  id?: string;
  idFranquia?: number;
  idPaciente?: number;
  nroPad?: number;
  dataInicio?: string;
  dataFim?: string;
  idEspecialidade?: number;
  idPeriodicidade?: number;
  idPeriodo?: number;
  qtdSessoes?: number;
}

export const defaultValue: Readonly<IMaio> = {};
