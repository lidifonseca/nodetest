import { Moment } from 'moment';
import { ICategoriaAtividade } from 'app/shared/model/categoria-atividade.model';
import { IPadItem } from 'app/shared/model/pad-item.model';

export interface IPadItemAtividade {
  id?: string;
  dataInicio?: Moment;
  dataFim?: Moment;
  dataPost?: Moment;
  idAtividade?: string | any;
  idPadItem?: string | any;
}

export const defaultValue: Readonly<IPadItemAtividade> = {};
