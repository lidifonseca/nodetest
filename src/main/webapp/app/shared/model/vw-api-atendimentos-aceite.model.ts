export interface IVwApiAtendimentosAceite {
  id?: string;
  idPadItem?: number;
  idPaciente?: number;
  idPeriodo?: number;
  idPeriodicidade?: number;
  idProfissional?: number;
  aceito?: number;
  bairro?: number;
  cep?: number;
  cidade?: number;
  complemento?: number;
  endereco?: number;
  especialidade?: number;
  latitude?: number;
  longitude?: number;
  numero?: number;
  paciente?: number;
  periodo?: number;
  periodicidade?: number;
  qtdSessoes?: number;
  uf?: number;
  valor?: number;
}

export const defaultValue: Readonly<IVwApiAtendimentosAceite> = {};
