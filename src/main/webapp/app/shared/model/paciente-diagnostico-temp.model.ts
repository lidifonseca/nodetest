import { Moment } from 'moment';

export interface IPacienteDiagnosticoTemp {
  id?: string;
  idCid?: number;
  cidPrimario?: boolean;
  complexidade?: string;
  createdAt?: Moment;
  sessionId?: string;
  observacao?: string;
}

export const defaultValue: Readonly<IPacienteDiagnosticoTemp> = {
  cidPrimario: false
};
