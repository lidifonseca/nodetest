import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';

export interface IUnidadeEasyAreaAtuacao {
  id?: string;
  cepInicial?: string;
  cepFinal?: string;
  unidadeRazaoSocial?: string;
  unidade?: string | any;
}

export const defaultValue: Readonly<IUnidadeEasyAreaAtuacao> = {};
