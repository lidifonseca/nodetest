export interface ILogPacAcesso {
  id?: string;
  idPaciente?: number;
  profissional?: string;
  token?: string;
  ipLocal?: string;
  inforAcesso?: string;
}

export const defaultValue: Readonly<ILogPacAcesso> = {};
