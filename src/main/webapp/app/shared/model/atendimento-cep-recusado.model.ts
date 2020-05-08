import { IPadItem } from 'app/shared/model/pad-item.model';

export interface IAtendimentoCepRecusado {
  id?: string;
  cep?: string;
  padItem?: string | any;
}

export const defaultValue: Readonly<IAtendimentoCepRecusado> = {};
