import { Moment } from 'moment';

export interface IProfissionalDispositivoComplexidadeAtual {
  id?: string;
  idProfissional?: number;
  idProfissionalDispositivoComplexidade?: number;
  idUsuario?: number;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IProfissionalDispositivoComplexidadeAtual> = {};
