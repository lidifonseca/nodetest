/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFilesPanico, defaultValue } from 'app/shared/model/files-panico.model';

export const ACTION_TYPES = {
  FETCH_FILESPANICO_LIST_EXPORT: 'filesPanico/FETCH_FILESPANICO_LIST_EXPORT',
  FETCH_FILESPANICO_LIST: 'filesPanico/FETCH_FILESPANICO_LIST',
  FETCH_FILESPANICO: 'filesPanico/FETCH_FILESPANICO',
  CREATE_FILESPANICO: 'filesPanico/CREATE_FILESPANICO',
  UPDATE_FILESPANICO: 'filesPanico/UPDATE_FILESPANICO',
  DELETE_FILESPANICO: 'filesPanico/DELETE_FILESPANICO',
  RESET: 'filesPanico/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFilesPanico>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type FilesPanicoState = Readonly<typeof initialState>;

export interface IFilesPanicoBaseState {
  baseFilters: any;
  idPanico: any;
  idPaciente: any;
  tipo: any;
  imagem: any;
  criadoEm: any;
}

export interface IFilesPanicoUpdateState {
  fieldsBase: IFilesPanicoBaseState;

  isNew: boolean;
}

// Reducer

export default (state: FilesPanicoState = initialState, action): FilesPanicoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FILESPANICO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_FILESPANICO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FILESPANICO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FILESPANICO):
    case REQUEST(ACTION_TYPES.UPDATE_FILESPANICO):
    case REQUEST(ACTION_TYPES.DELETE_FILESPANICO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FILESPANICO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_FILESPANICO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FILESPANICO):
    case FAILURE(ACTION_TYPES.CREATE_FILESPANICO):
    case FAILURE(ACTION_TYPES.UPDATE_FILESPANICO):
    case FAILURE(ACTION_TYPES.DELETE_FILESPANICO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FILESPANICO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_FILESPANICO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FILESPANICO):
    case SUCCESS(ACTION_TYPES.UPDATE_FILESPANICO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FILESPANICO):
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

const apiUrl = 'api/files-panicos';

// Actions

// Actions
export type ICrudGetAllActionFilesPanico<T> = (
  idPanico?: any,
  idPaciente?: any,
  tipo?: any,
  imagem?: any,
  criadoEm?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionFilesPanico<IFilesPanico> = (idPanico, idPaciente, tipo, imagem, criadoEm, page, size, sort) => {
  const idPanicoRequest = idPanico ? `idPanico.contains=${idPanico}&` : '';
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const tipoRequest = tipo ? `tipo.contains=${tipo}&` : '';
  const imagemRequest = imagem ? `imagem.contains=${imagem}&` : '';
  const criadoEmRequest = criadoEm ? `criadoEm.contains=${criadoEm}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_FILESPANICO_LIST,
    payload: axios.get<IFilesPanico>(
      `${requestUrl}${idPanicoRequest}${idPacienteRequest}${tipoRequest}${imagemRequest}${criadoEmRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IFilesPanico> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FILESPANICO,
    payload: axios.get<IFilesPanico>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionFilesPanico<IFilesPanico> = (
  idPanico,
  idPaciente,
  tipo,
  imagem,
  criadoEm,
  page,
  size,
  sort
) => {
  const idPanicoRequest = idPanico ? `idPanico.contains=${idPanico}&` : '';
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const tipoRequest = tipo ? `tipo.contains=${tipo}&` : '';
  const imagemRequest = imagem ? `imagem.contains=${imagem}&` : '';
  const criadoEmRequest = criadoEm ? `criadoEm.contains=${criadoEm}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_FILESPANICO_LIST,
    payload: axios.get<IFilesPanico>(
      `${requestUrl}${idPanicoRequest}${idPacienteRequest}${tipoRequest}${imagemRequest}${criadoEmRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IFilesPanico> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FILESPANICO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFilesPanico> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FILESPANICO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFilesPanico> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FILESPANICO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getFilesPanicoState = (location): IFilesPanicoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idPanico = url.searchParams.get('idPanico') || '';
  const idPaciente = url.searchParams.get('idPaciente') || '';
  const tipo = url.searchParams.get('tipo') || '';
  const imagem = url.searchParams.get('imagem') || '';
  const criadoEm = url.searchParams.get('criadoEm') || '';

  return {
    baseFilters,
    idPanico,
    idPaciente,
    tipo,
    imagem,
    criadoEm
  };
};
