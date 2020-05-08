import { IPaciente } from 'app/shared/model/paciente.model';
import { ICid } from 'app/shared/model/cid.model';

export interface IPacienteDiagnostico {
  id?: string;
  observacao?: string;
  ativo?: number;
  cidPrimario?: boolean;
  complexidade?: string;
  cidComAlta?: boolean;
  paciente?: string | any;
  c?: string | any;
}

export const defaultValue: Readonly<IPacienteDiagnostico> = {
  cidPrimario: false,
  cidComAlta: false
};
