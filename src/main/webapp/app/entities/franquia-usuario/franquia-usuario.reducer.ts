/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFranquiaUsuario, defaultValue } from 'app/shared/model/franquia-usuario.model';

export const ACTION_TYPES = {
  FETCH_FRANQUIAUSUARIO_LIST_EXPORT: 'franquiaUsuario/FETCH_FRANQUIAUSUARIO_LIST_EXPORT',
  FETCH_FRANQUIAUSUARIO_LIST: 'franquiaUsuario/FETCH_FRANQUIAUSUARIO_LIST',
  FETCH_FRANQUIAUSUARIO: 'franquiaUsuario/FETCH_FRANQUIAUSUARIO',
  CREATE_FRANQUIAUSUARIO: 'franquiaUsuario/CREATE_FRANQUIAUSUARIO',
  UPDATE_FRANQUIAUSUARIO: 'franquiaUsuario/UPDATE_FRANQUIAUSUARIO',
  DELETE_FRANQUIAUSUARIO: 'franquiaUsuario/DELETE_FRANQUIAUSUARIO',
  RESET: 'franquiaUsuario/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFranquiaUsuario>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type FranquiaUsuarioState = Readonly<typeof initialState>;

export interface IFranquiaUsuarioBaseState {
  baseFilters: any;
  senha: any;
  nome: any;
  email: any;
  verProfissional: any;
  cadProfissional: any;
  ediProfissional: any;
  delProfissional: any;
  relProfissional: any;
  verPaciente: any;
  cadPaciente: any;
  ediPaciente: any;
  delPaciente: any;
  relPaciente: any;
  verPad: any;
  cadPad: any;
  ediPad: any;
  delPad: any;
  relPad: any;
  verAtendimento: any;
  cadAtendimento: any;
  ediAtendimento: any;
  delAtendimento: any;
  relAtendimento: any;
  verPush: any;
  cadPush: any;
  verEspecialidadeValor: any;
  cadEspecialidadeValor: any;
  ediEspecialidadeValor: any;
  delEspecialidadeValor: any;
  verUsuario: any;
  cadUsuario: any;
  ediUsuario: any;
  delUsuario: any;
  envioRecusa: any;
  envioIntercorrencia: any;
  envioCancelamento: any;
  ativo: any;
}

export interface IFranquiaUsuarioUpdateState {
  fieldsBase: IFranquiaUsuarioBaseState;
  isNew: boolean;
}

// Reducer

export default (state: FranquiaUsuarioState = initialState, action): FranquiaUsuarioState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FRANQUIAUSUARIO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_FRANQUIAUSUARIO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FRANQUIAUSUARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FRANQUIAUSUARIO):
    case REQUEST(ACTION_TYPES.UPDATE_FRANQUIAUSUARIO):
    case REQUEST(ACTION_TYPES.DELETE_FRANQUIAUSUARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FRANQUIAUSUARIO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_FRANQUIAUSUARIO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FRANQUIAUSUARIO):
    case FAILURE(ACTION_TYPES.CREATE_FRANQUIAUSUARIO):
    case FAILURE(ACTION_TYPES.UPDATE_FRANQUIAUSUARIO):
    case FAILURE(ACTION_TYPES.DELETE_FRANQUIAUSUARIO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FRANQUIAUSUARIO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_FRANQUIAUSUARIO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FRANQUIAUSUARIO):
    case SUCCESS(ACTION_TYPES.UPDATE_FRANQUIAUSUARIO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FRANQUIAUSUARIO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/franquia-usuarios';

// Actions

// Actions
export type ICrudGetAllActionFranquiaUsuario<T> = (
  senha?: any,
  nome?: any,
  email?: any,
  verProfissional?: any,
  cadProfissional?: any,
  ediProfissional?: any,
  delProfissional?: any,
  relProfissional?: any,
  verPaciente?: any,
  cadPaciente?: any,
  ediPaciente?: any,
  delPaciente?: any,
  relPaciente?: any,
  verPad?: any,
  cadPad?: any,
  ediPad?: any,
  delPad?: any,
  relPad?: any,
  verAtendimento?: any,
  cadAtendimento?: any,
  ediAtendimento?: any,
  delAtendimento?: any,
  relAtendimento?: any,
  verPush?: any,
  cadPush?: any,
  verEspecialidadeValor?: any,
  cadEspecialidadeValor?: any,
  ediEspecialidadeValor?: any,
  delEspecialidadeValor?: any,
  verUsuario?: any,
  cadUsuario?: any,
  ediUsuario?: any,
  delUsuario?: any,
  envioRecusa?: any,
  envioIntercorrencia?: any,
  envioCancelamento?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionFranquiaUsuario<IFranquiaUsuario> = (
  senha,
  nome,
  email,
  verProfissional,
  cadProfissional,
  ediProfissional,
  delProfissional,
  relProfissional,
  verPaciente,
  cadPaciente,
  ediPaciente,
  delPaciente,
  relPaciente,
  verPad,
  cadPad,
  ediPad,
  delPad,
  relPad,
  verAtendimento,
  cadAtendimento,
  ediAtendimento,
  delAtendimento,
  relAtendimento,
  verPush,
  cadPush,
  verEspecialidadeValor,
  cadEspecialidadeValor,
  ediEspecialidadeValor,
  delEspecialidadeValor,
  verUsuario,
  cadUsuario,
  ediUsuario,
  delUsuario,
  envioRecusa,
  envioIntercorrencia,
  envioCancelamento,
  ativo,
  page,
  size,
  sort
) => {
  const senhaRequest = senha ? `senha.contains=${senha}&` : '';
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const emailRequest = email ? `email.contains=${email}&` : '';
  const verProfissionalRequest = verProfissional ? `verProfissional.contains=${verProfissional}&` : '';
  const cadProfissionalRequest = cadProfissional ? `cadProfissional.contains=${cadProfissional}&` : '';
  const ediProfissionalRequest = ediProfissional ? `ediProfissional.contains=${ediProfissional}&` : '';
  const delProfissionalRequest = delProfissional ? `delProfissional.contains=${delProfissional}&` : '';
  const relProfissionalRequest = relProfissional ? `relProfissional.contains=${relProfissional}&` : '';
  const verPacienteRequest = verPaciente ? `verPaciente.contains=${verPaciente}&` : '';
  const cadPacienteRequest = cadPaciente ? `cadPaciente.contains=${cadPaciente}&` : '';
  const ediPacienteRequest = ediPaciente ? `ediPaciente.contains=${ediPaciente}&` : '';
  const delPacienteRequest = delPaciente ? `delPaciente.contains=${delPaciente}&` : '';
  const relPacienteRequest = relPaciente ? `relPaciente.contains=${relPaciente}&` : '';
  const verPadRequest = verPad ? `verPad.contains=${verPad}&` : '';
  const cadPadRequest = cadPad ? `cadPad.contains=${cadPad}&` : '';
  const ediPadRequest = ediPad ? `ediPad.contains=${ediPad}&` : '';
  const delPadRequest = delPad ? `delPad.contains=${delPad}&` : '';
  const relPadRequest = relPad ? `relPad.contains=${relPad}&` : '';
  const verAtendimentoRequest = verAtendimento ? `verAtendimento.contains=${verAtendimento}&` : '';
  const cadAtendimentoRequest = cadAtendimento ? `cadAtendimento.contains=${cadAtendimento}&` : '';
  const ediAtendimentoRequest = ediAtendimento ? `ediAtendimento.contains=${ediAtendimento}&` : '';
  const delAtendimentoRequest = delAtendimento ? `delAtendimento.contains=${delAtendimento}&` : '';
  const relAtendimentoRequest = relAtendimento ? `relAtendimento.contains=${relAtendimento}&` : '';
  const verPushRequest = verPush ? `verPush.contains=${verPush}&` : '';
  const cadPushRequest = cadPush ? `cadPush.contains=${cadPush}&` : '';
  const verEspecialidadeValorRequest = verEspecialidadeValor ? `verEspecialidadeValor.contains=${verEspecialidadeValor}&` : '';
  const cadEspecialidadeValorRequest = cadEspecialidadeValor ? `cadEspecialidadeValor.contains=${cadEspecialidadeValor}&` : '';
  const ediEspecialidadeValorRequest = ediEspecialidadeValor ? `ediEspecialidadeValor.contains=${ediEspecialidadeValor}&` : '';
  const delEspecialidadeValorRequest = delEspecialidadeValor ? `delEspecialidadeValor.contains=${delEspecialidadeValor}&` : '';
  const verUsuarioRequest = verUsuario ? `verUsuario.contains=${verUsuario}&` : '';
  const cadUsuarioRequest = cadUsuario ? `cadUsuario.contains=${cadUsuario}&` : '';
  const ediUsuarioRequest = ediUsuario ? `ediUsuario.contains=${ediUsuario}&` : '';
  const delUsuarioRequest = delUsuario ? `delUsuario.contains=${delUsuario}&` : '';
  const envioRecusaRequest = envioRecusa ? `envioRecusa.contains=${envioRecusa}&` : '';
  const envioIntercorrenciaRequest = envioIntercorrencia ? `envioIntercorrencia.contains=${envioIntercorrencia}&` : '';
  const envioCancelamentoRequest = envioCancelamento ? `envioCancelamento.contains=${envioCancelamento}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_FRANQUIAUSUARIO_LIST,
    payload: axios.get<IFranquiaUsuario>(
      `${requestUrl}${senhaRequest}${nomeRequest}${emailRequest}${verProfissionalRequest}${cadProfissionalRequest}${ediProfissionalRequest}${delProfissionalRequest}${relProfissionalRequest}${verPacienteRequest}${cadPacienteRequest}${ediPacienteRequest}${delPacienteRequest}${relPacienteRequest}${verPadRequest}${cadPadRequest}${ediPadRequest}${delPadRequest}${relPadRequest}${verAtendimentoRequest}${cadAtendimentoRequest}${ediAtendimentoRequest}${delAtendimentoRequest}${relAtendimentoRequest}${verPushRequest}${cadPushRequest}${verEspecialidadeValorRequest}${cadEspecialidadeValorRequest}${ediEspecialidadeValorRequest}${delEspecialidadeValorRequest}${verUsuarioRequest}${cadUsuarioRequest}${ediUsuarioRequest}${delUsuarioRequest}${envioRecusaRequest}${envioIntercorrenciaRequest}${envioCancelamentoRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IFranquiaUsuario> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FRANQUIAUSUARIO,
    payload: axios.get<IFranquiaUsuario>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionFranquiaUsuario<IFranquiaUsuario> = (
  senha,
  nome,
  email,
  verProfissional,
  cadProfissional,
  ediProfissional,
  delProfissional,
  relProfissional,
  verPaciente,
  cadPaciente,
  ediPaciente,
  delPaciente,
  relPaciente,
  verPad,
  cadPad,
  ediPad,
  delPad,
  relPad,
  verAtendimento,
  cadAtendimento,
  ediAtendimento,
  delAtendimento,
  relAtendimento,
  verPush,
  cadPush,
  verEspecialidadeValor,
  cadEspecialidadeValor,
  ediEspecialidadeValor,
  delEspecialidadeValor,
  verUsuario,
  cadUsuario,
  ediUsuario,
  delUsuario,
  envioRecusa,
  envioIntercorrencia,
  envioCancelamento,
  ativo,
  page,
  size,
  sort
) => {
  const senhaRequest = senha ? `senha.contains=${senha}&` : '';
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const emailRequest = email ? `email.contains=${email}&` : '';
  const verProfissionalRequest = verProfissional ? `verProfissional.contains=${verProfissional}&` : '';
  const cadProfissionalRequest = cadProfissional ? `cadProfissional.contains=${cadProfissional}&` : '';
  const ediProfissionalRequest = ediProfissional ? `ediProfissional.contains=${ediProfissional}&` : '';
  const delProfissionalRequest = delProfissional ? `delProfissional.contains=${delProfissional}&` : '';
  const relProfissionalRequest = relProfissional ? `relProfissional.contains=${relProfissional}&` : '';
  const verPacienteRequest = verPaciente ? `verPaciente.contains=${verPaciente}&` : '';
  const cadPacienteRequest = cadPaciente ? `cadPaciente.contains=${cadPaciente}&` : '';
  const ediPacienteRequest = ediPaciente ? `ediPaciente.contains=${ediPaciente}&` : '';
  const delPacienteRequest = delPaciente ? `delPaciente.contains=${delPaciente}&` : '';
  const relPacienteRequest = relPaciente ? `relPaciente.contains=${relPaciente}&` : '';
  const verPadRequest = verPad ? `verPad.contains=${verPad}&` : '';
  const cadPadRequest = cadPad ? `cadPad.contains=${cadPad}&` : '';
  const ediPadRequest = ediPad ? `ediPad.contains=${ediPad}&` : '';
  const delPadRequest = delPad ? `delPad.contains=${delPad}&` : '';
  const relPadRequest = relPad ? `relPad.contains=${relPad}&` : '';
  const verAtendimentoRequest = verAtendimento ? `verAtendimento.contains=${verAtendimento}&` : '';
  const cadAtendimentoRequest = cadAtendimento ? `cadAtendimento.contains=${cadAtendimento}&` : '';
  const ediAtendimentoRequest = ediAtendimento ? `ediAtendimento.contains=${ediAtendimento}&` : '';
  const delAtendimentoRequest = delAtendimento ? `delAtendimento.contains=${delAtendimento}&` : '';
  const relAtendimentoRequest = relAtendimento ? `relAtendimento.contains=${relAtendimento}&` : '';
  const verPushRequest = verPush ? `verPush.contains=${verPush}&` : '';
  const cadPushRequest = cadPush ? `cadPush.contains=${cadPush}&` : '';
  const verEspecialidadeValorRequest = verEspecialidadeValor ? `verEspecialidadeValor.contains=${verEspecialidadeValor}&` : '';
  const cadEspecialidadeValorRequest = cadEspecialidadeValor ? `cadEspecialidadeValor.contains=${cadEspecialidadeValor}&` : '';
  const ediEspecialidadeValorRequest = ediEspecialidadeValor ? `ediEspecialidadeValor.contains=${ediEspecialidadeValor}&` : '';
  const delEspecialidadeValorRequest = delEspecialidadeValor ? `delEspecialidadeValor.contains=${delEspecialidadeValor}&` : '';
  const verUsuarioRequest = verUsuario ? `verUsuario.contains=${verUsuario}&` : '';
  const cadUsuarioRequest = cadUsuario ? `cadUsuario.contains=${cadUsuario}&` : '';
  const ediUsuarioRequest = ediUsuario ? `ediUsuario.contains=${ediUsuario}&` : '';
  const delUsuarioRequest = delUsuario ? `delUsuario.contains=${delUsuario}&` : '';
  const envioRecusaRequest = envioRecusa ? `envioRecusa.contains=${envioRecusa}&` : '';
  const envioIntercorrenciaRequest = envioIntercorrencia ? `envioIntercorrencia.contains=${envioIntercorrencia}&` : '';
  const envioCancelamentoRequest = envioCancelamento ? `envioCancelamento.contains=${envioCancelamento}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_FRANQUIAUSUARIO_LIST,
    payload: axios.get<IFranquiaUsuario>(
      `${requestUrl}${senhaRequest}${nomeRequest}${emailRequest}${verProfissionalRequest}${cadProfissionalRequest}${ediProfissionalRequest}${delProfissionalRequest}${relProfissionalRequest}${verPacienteRequest}${cadPacienteRequest}${ediPacienteRequest}${delPacienteRequest}${relPacienteRequest}${verPadRequest}${cadPadRequest}${ediPadRequest}${delPadRequest}${relPadRequest}${verAtendimentoRequest}${cadAtendimentoRequest}${ediAtendimentoRequest}${delAtendimentoRequest}${relAtendimentoRequest}${verPushRequest}${cadPushRequest}${verEspecialidadeValorRequest}${cadEspecialidadeValorRequest}${ediEspecialidadeValorRequest}${delEspecialidadeValorRequest}${verUsuarioRequest}${cadUsuarioRequest}${ediUsuarioRequest}${delUsuarioRequest}${envioRecusaRequest}${envioIntercorrenciaRequest}${envioCancelamentoRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IFranquiaUsuario> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FRANQUIAUSUARIO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFranquiaUsuario> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FRANQUIAUSUARIO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFranquiaUsuario> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FRANQUIAUSUARIO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getFranquiaUsuarioState = (location): IFranquiaUsuarioBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const senha = url.searchParams.get('senha') || '';
  const nome = url.searchParams.get('nome') || '';
  const email = url.searchParams.get('email') || '';
  const verProfissional = url.searchParams.get('verProfissional') || '';
  const cadProfissional = url.searchParams.get('cadProfissional') || '';
  const ediProfissional = url.searchParams.get('ediProfissional') || '';
  const delProfissional = url.searchParams.get('delProfissional') || '';
  const relProfissional = url.searchParams.get('relProfissional') || '';
  const verPaciente = url.searchParams.get('verPaciente') || '';
  const cadPaciente = url.searchParams.get('cadPaciente') || '';
  const ediPaciente = url.searchParams.get('ediPaciente') || '';
  const delPaciente = url.searchParams.get('delPaciente') || '';
  const relPaciente = url.searchParams.get('relPaciente') || '';
  const verPad = url.searchParams.get('verPad') || '';
  const cadPad = url.searchParams.get('cadPad') || '';
  const ediPad = url.searchParams.get('ediPad') || '';
  const delPad = url.searchParams.get('delPad') || '';
  const relPad = url.searchParams.get('relPad') || '';
  const verAtendimento = url.searchParams.get('verAtendimento') || '';
  const cadAtendimento = url.searchParams.get('cadAtendimento') || '';
  const ediAtendimento = url.searchParams.get('ediAtendimento') || '';
  const delAtendimento = url.searchParams.get('delAtendimento') || '';
  const relAtendimento = url.searchParams.get('relAtendimento') || '';
  const verPush = url.searchParams.get('verPush') || '';
  const cadPush = url.searchParams.get('cadPush') || '';
  const verEspecialidadeValor = url.searchParams.get('verEspecialidadeValor') || '';
  const cadEspecialidadeValor = url.searchParams.get('cadEspecialidadeValor') || '';
  const ediEspecialidadeValor = url.searchParams.get('ediEspecialidadeValor') || '';
  const delEspecialidadeValor = url.searchParams.get('delEspecialidadeValor') || '';
  const verUsuario = url.searchParams.get('verUsuario') || '';
  const cadUsuario = url.searchParams.get('cadUsuario') || '';
  const ediUsuario = url.searchParams.get('ediUsuario') || '';
  const delUsuario = url.searchParams.get('delUsuario') || '';
  const envioRecusa = url.searchParams.get('envioRecusa') || '';
  const envioIntercorrencia = url.searchParams.get('envioIntercorrencia') || '';
  const envioCancelamento = url.searchParams.get('envioCancelamento') || '';
  const ativo = url.searchParams.get('ativo') || '';

  return {
    baseFilters,
    senha,
    nome,
    email,
    verProfissional,
    cadProfissional,
    ediProfissional,
    delProfissional,
    relProfissional,
    verPaciente,
    cadPaciente,
    ediPaciente,
    delPaciente,
    relPaciente,
    verPad,
    cadPad,
    ediPad,
    delPad,
    relPad,
    verAtendimento,
    cadAtendimento,
    ediAtendimento,
    delAtendimento,
    relAtendimento,
    verPush,
    cadPush,
    verEspecialidadeValor,
    cadEspecialidadeValor,
    ediEspecialidadeValor,
    delEspecialidadeValor,
    verUsuario,
    cadUsuario,
    ediUsuario,
    delUsuario,
    envioRecusa,
    envioIntercorrencia,
    envioCancelamento,
    ativo
  };
};
