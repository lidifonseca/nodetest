import { Moment } from 'moment';

export interface IProfissionalComplexidadeAtual {
  id?: string;
  idProfissional?: number;
  baixa?: number;
  media?: number;
  alta?: number;
  ventilacaoMecanica?: number;
  telemonitoramente?: number;
  idUsuario?: number;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IProfissionalComplexidadeAtual> = {};
