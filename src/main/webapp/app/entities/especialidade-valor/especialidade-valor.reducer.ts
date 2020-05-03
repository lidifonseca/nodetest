/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEspecialidadeValor, defaultValue } from 'app/shared/model/especialidade-valor.model';

export const ACTION_TYPES = {
  FETCH_ESPECIALIDADEVALOR_LIST: 'especialidadeValor/FETCH_ESPECIALIDADEVALOR_LIST',
  FETCH_ESPECIALIDADEVALOR: 'especialidadeValor/FETCH_ESPECIALIDADEVALOR',
  CREATE_ESPECIALIDADEVALOR: 'especialidadeValor/CREATE_ESPECIALIDADEVALOR',
  UPDATE_ESPECIALIDADEVALOR: 'especialidadeValor/UPDATE_ESPECIALIDADEVALOR',
  DELETE_ESPECIALIDADEVALOR: 'especialidadeValor/DELETE_ESPECIALIDADEVALOR',
  RESET: 'especialidadeValor/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEspecialidadeValor>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type EspecialidadeValorState = Readonly<typeof initialState>;

// Reducer

export default (state: EspecialidadeValorState = initialState, action): EspecialidadeValorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ESPECIALIDADEVALOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ESPECIALIDADEVALOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ESPECIALIDADEVALOR):
    case REQUEST(ACTION_TYPES.UPDATE_ESPECIALIDADEVALOR):
    case REQUEST(ACTION_TYPES.DELETE_ESPECIALIDADEVALOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ESPECIALIDADEVALOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ESPECIALIDADEVALOR):
    case FAILURE(ACTION_TYPES.CREATE_ESPECIALIDADEVALOR):
    case FAILURE(ACTION_TYPES.UPDATE_ESPECIALIDADEVALOR):
    case FAILURE(ACTION_TYPES.DELETE_ESPECIALIDADEVALOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESPECIALIDADEVALOR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESPECIALIDADEVALOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ESPECIALIDADEVALOR):
    case SUCCESS(ACTION_TYPES.UPDATE_ESPECIALIDADEVALOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ESPECIALIDADEVALOR):
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

const apiUrl = 'api/especialidade-valors';

// Actions

// Actions
export type ICrudGetAllActionEspecialidadeValor<T> = (
  idFranquia?: any,
  valor?: any,
  ativo?: any,
  idEspecialidade?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionEspecialidadeValor<IEspecialidadeValor> = (
  idFranquia,
  valor,
  ativo,
  idEspecialidade,
  page,
  size,
  sort
) => {
  const idFranquiaRequest = idFranquia ? `idFranquia.contains=${idFranquia}&` : '';
  const valorRequest = valor ? `valor.contains=${valor}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const idEspecialidadeRequest = idEspecialidade ? `idEspecialidade.equals=${idEspecialidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ESPECIALIDADEVALOR_LIST,
    payload: axios.get<IEspecialidadeValor>(
      `${requestUrl}${idFranquiaRequest}${valorRequest}${ativoRequest}${idEspecialidadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IEspecialidadeValor> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ESPECIALIDADEVALOR,
    payload: axios.get<IEspecialidadeValor>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEspecialidadeValor> = entity => async dispatch => {
  entity = {
    ...entity,
    idEspecialidade: entity.idEspecialidade === 'null' ? null : entity.idEspecialidade
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ESPECIALIDADEVALOR,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEspecialidadeValor> = entity => async dispatch => {
  entity = { ...entity, idEspecialidade: entity.idEspecialidade === 'null' ? null : entity.idEspecialidade };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ESPECIALIDADEVALOR,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEspecialidadeValor> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ESPECIALIDADEVALOR,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
