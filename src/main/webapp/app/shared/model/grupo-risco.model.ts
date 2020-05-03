import { Moment } from 'moment';

export interface IGrupoRisco {
  id?: string;
  grupoRisco?: string;
  styleLabel?: string;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IGrupoRisco> = {};
