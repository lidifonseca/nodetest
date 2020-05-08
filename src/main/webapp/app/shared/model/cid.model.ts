import { ICidXPtaNovo } from 'app/shared/model/cid-x-pta-novo.model';
import { IPacienteDiagnostico } from 'app/shared/model/paciente-diagnostico.model';
import { IPadCid } from 'app/shared/model/pad-cid.model';

export interface ICid {
  id?: string;
  codigo?: string;
  diagnostico?: string;
  gr?: string;
  temp?: string;
  apelido?: string;
  cidXPtaNovos?: ICidXPtaNovo[];
  pacienteDiagnosticos?: IPacienteDiagnostico[];
  padCids?: IPadCid[];
}

export const defaultValue: Readonly<ICid> = {};
