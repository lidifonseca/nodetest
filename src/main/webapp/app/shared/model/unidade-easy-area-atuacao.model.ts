import { Moment } from 'moment';
import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';

export interface IUnidadeEasyAreaAtuacao {
  id?: string;
  cepInicial?: string;
  cepFinal?: string;
  dataPost?: Moment;
  idUnidade?: string | any;
}

export const defaultValue: Readonly<IUnidadeEasyAreaAtuacao> = {};
