import { Moment } from 'moment';

export interface IPacienteComplexidadeAtual {
  id?: string;
  idPaciente?: number;
  idPacienteComplexidade?: number;
  baixa?: number;
  media?: number;
  alta?: number;
  ventilacaoMecanica?: number;
  telemonitoramente?: number;
  idUsuario?: number;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IPacienteComplexidadeAtual> = {};
