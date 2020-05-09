import { ILogUserFranquia } from 'app/shared/model/log-user-franquia.model';
import { IFranquia } from 'app/shared/model/franquia.model';

export interface IFranquiaUsuario {
  id?: string;
  senha?: string;
  nome?: string;
  email?: string;
  verProfissional?: number;
  cadProfissional?: number;
  ediProfissional?: number;
  delProfissional?: number;
  relProfissional?: number;
  verPaciente?: number;
  cadPaciente?: number;
  ediPaciente?: number;
  delPaciente?: number;
  relPaciente?: number;
  verPad?: number;
  cadPad?: number;
  ediPad?: number;
  delPad?: number;
  relPad?: number;
  verAtendimento?: number;
  cadAtendimento?: number;
  ediAtendimento?: number;
  delAtendimento?: number;
  relAtendimento?: number;
  verPush?: number;
  cadPush?: number;
  verEspecialidadeValor?: number;
  cadEspecialidadeValor?: number;
  ediEspecialidadeValor?: number;
  delEspecialidadeValor?: number;
  verUsuario?: number;
  cadUsuario?: number;
  ediUsuario?: number;
  delUsuario?: number;
  envioRecusa?: number;
  envioIntercorrencia?: number;
  envioCancelamento?: number;
  ativo?: boolean;
  logUserFranquias?: ILogUserFranquia[];
  franquia?: string | any;
}

export const defaultValue: Readonly<IFranquiaUsuario> = {
  ativo: false
};
