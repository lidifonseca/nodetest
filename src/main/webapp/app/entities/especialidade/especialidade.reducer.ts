/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEspecialidade, defaultValue } from 'app/shared/model/especialidade.model';

export const ACTION_TYPES = {
  FETCH_ESPECIALIDADE_LIST: 'especialidade/FETCH_ESPECIALIDADE_LIST',
  FETCH_ESPECIALIDADE: 'especialidade/FETCH_ESPECIALIDADE',
  CREATE_ESPECIALIDADE: 'especialidade/CREATE_ESPECIALIDADE',
  UPDATE_ESPECIALIDADE: 'especialidade/UPDATE_ESPECIALIDADE',
  DELETE_ESPECIALIDADE: 'especialidade/DELETE_ESPECIALIDADE',
  RESET: 'especialidade/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEspecialidade>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type EspecialidadeState = Readonly<typeof initialState>;

// Reducer

export default (state: EspecialidadeState = initialState, action): EspecialidadeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ESPECIALIDADE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ESPECIALIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ESPECIALIDADE):
    case REQUEST(ACTION_TYPES.UPDATE_ESPECIALIDADE):
    case REQUEST(ACTION_TYPES.DELETE_ESPECIALIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ESPECIALIDADE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ESPECIALIDADE):
    case FAILURE(ACTION_TYPES.CREATE_ESPECIALIDADE):
    case FAILURE(ACTION_TYPES.UPDATE_ESPECIALIDADE):
    case FAILURE(ACTION_TYPES.DELETE_ESPECIALIDADE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESPECIALIDADE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESPECIALIDADE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ESPECIALIDADE):
    case SUCCESS(ACTION_TYPES.UPDATE_ESPECIALIDADE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ESPECIALIDADE):
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

const apiUrl = 'api/especialidades';

// Actions

// Actions
export type ICrudGetAllActionEspecialidade<T> = (
  icon?: any,
  especialidade?: any,
  descricao?: any,
  duracao?: any,
  importante?: any,
  ativo?: any,
  dataPost?: any,
  idUnidade?: any,
  atendimento?: any,
  especialidadeOperadora?: any,
  especialidadeUnidade?: any,
  especialidadeValor?: any,
  pacientePedido?: any,
  padItem?: any,
  idCategoria?: any,
  idTipoEspecialidade?: any,
  idTipoUnidade?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionEspecialidade<IEspecialidade> = (
  icon,
  especialidade,
  descricao,
  duracao,
  importante,
  ativo,
  dataPost,
  idUnidade,
  atendimento,
  especialidadeOperadora,
  especialidadeUnidade,
  especialidadeValor,
  pacientePedido,
  padItem,
  idCategoria,
  idTipoEspecialidade,
  idTipoUnidade,
  page,
  size,
  sort
) => {
  const iconRequest = icon ? `icon.contains=${icon}&` : '';
  const especialidadeRequest = especialidade ? `especialidade.contains=${especialidade}&` : '';
  const descricaoRequest = descricao ? `descricao.contains=${descricao}&` : '';
  const duracaoRequest = duracao ? `duracao.contains=${duracao}&` : '';
  const importanteRequest = importante ? `importante.contains=${importante}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';
  const idUnidadeRequest = idUnidade ? `idUnidade.contains=${idUnidade}&` : '';
  const atendimentoRequest = atendimento ? `atendimento.equals=${atendimento}&` : '';
  const especialidadeOperadoraRequest = especialidadeOperadora ? `especialidadeOperadora.equals=${especialidadeOperadora}&` : '';
  const especialidadeUnidadeRequest = especialidadeUnidade ? `especialidadeUnidade.equals=${especialidadeUnidade}&` : '';
  const especialidadeValorRequest = especialidadeValor ? `especialidadeValor.equals=${especialidadeValor}&` : '';
  const pacientePedidoRequest = pacientePedido ? `pacientePedido.equals=${pacientePedido}&` : '';
  const padItemRequest = padItem ? `padItem.equals=${padItem}&` : '';
  const idCategoriaRequest = idCategoria ? `idCategoria.equals=${idCategoria}&` : '';
  const idTipoEspecialidadeRequest = idTipoEspecialidade ? `idTipoEspecialidade.equals=${idTipoEspecialidade}&` : '';
  const idTipoUnidadeRequest = idTipoUnidade ? `idTipoUnidade.equals=${idTipoUnidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ESPECIALIDADE_LIST,
    payload: axios.get<IEspecialidade>(
      `${requestUrl}${iconRequest}${especialidadeRequest}${descricaoRequest}${duracaoRequest}${importanteRequest}${ativoRequest}${dataPostRequest}${idUnidadeRequest}${atendimentoRequest}${especialidadeOperadoraRequest}${especialidadeUnidadeRequest}${especialidadeValorRequest}${pacientePedidoRequest}${padItemRequest}${idCategoriaRequest}${idTipoEspecialidadeRequest}${idTipoUnidadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IEspecialidade> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ESPECIALIDADE,
    payload: axios.get<IEspecialidade>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEspecialidade> = entity => async dispatch => {
  entity = {
    ...entity,
    idCategoria: entity.idCategoria === 'null' ? null : entity.idCategoria,
    idTipoEspecialidade: entity.idTipoEspecialidade === 'null' ? null : entity.idTipoEspecialidade,
    idTipoUnidade: entity.idTipoUnidade === 'null' ? null : entity.idTipoUnidade
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ESPECIALIDADE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEspecialidade> = entity => async dispatch => {
  entity = {
    ...entity,
    idCategoria: entity.idCategoria === 'null' ? null : entity.idCategoria,
    idTipoEspecialidade: entity.idTipoEspecialidade === 'null' ? null : entity.idTipoEspecialidade,
    idTipoUnidade: entity.idTipoUnidade === 'null' ? null : entity.idTipoUnidade
  };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ESPECIALIDADE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEspecialidade> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ESPECIALIDADE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
