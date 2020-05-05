export interface ILogPacAcesso {
  id?: string;
  idPaciente?: number;
  profissional?: string;
  token?: string;
  ipLocal?: string;
  inforAcesso?: any;
}

export const defaultValue: Readonly<ILogPacAcesso> = {};
