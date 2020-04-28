import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import configuracoes, { ConfiguracoesState } from './configuracoes';
import sidebar, { SidebarState } from './sidebar';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import processo, {
  ProcessoState
} from 'app/entities/processo/processo.reducer';
// prettier-ignore
import parte, {
  ParteState
} from 'app/entities/parte/parte.reducer';
// prettier-ignore
import movimentacao, {
  MovimentacaoState
} from 'app/entities/movimentacao/movimentacao.reducer';
// prettier-ignore
import peticao, {
  PeticaoState
} from 'app/entities/peticao/peticao.reducer';
// prettier-ignore
import incidente, {
  IncidenteState
} from 'app/entities/incidente/incidente.reducer';
// prettier-ignore
import apenso, {
  ApensoState
} from 'app/entities/apenso/apenso.reducer';
// prettier-ignore
import audiencia, {
  AudienciaState
} from 'app/entities/audiencia/audiencia.reducer';
// prettier-ignore
import historicoClase, {
  HistoricoClaseState
} from 'app/entities/historico-clase/historico-clase.reducer';
// prettier-ignore
import cliente, {
  ClienteState
} from 'app/entities/cliente/cliente.reducer';
// prettier-ignore
import pesquisa, {
  PesquisaState
} from 'app/entities/pesquisa/pesquisa.reducer';
// prettier-ignore
import estado, {
  EstadoState
} from 'app/entities/estado/estado.reducer';
// prettier-ignore
import comarca, {
  ComarcaState
} from 'app/entities/comarca/comarca.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly configuracoes: ConfiguracoesState;
  readonly sidebar: SidebarState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly processo: ProcessoState;
  readonly parte: ParteState;
  readonly movimentacao: MovimentacaoState;
  readonly peticao: PeticaoState;
  readonly incidente: IncidenteState;
  readonly apenso: ApensoState;
  readonly audiencia: AudienciaState;
  readonly historicoClase: HistoricoClaseState;
  readonly cliente: ClienteState;
  readonly pesquisa: PesquisaState;
  readonly estado: EstadoState;
  readonly comarca: ComarcaState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  configuracoes,
  sidebar,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  processo,
  parte,
  movimentacao,
  peticao,
  incidente,
  apenso,
  audiencia,
  historicoClase,
  cliente,
  pesquisa,
  estado,
  comarca,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
