import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudSearchAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPesquisa, defaultValue } from 'app/shared/model/pesquisa.model';
import fileDownload from 'js-file-download';
import { IProcesso } from 'app/shared/model/processo.model';
import { IPayload, IPayloadResult } from 'react-jhipster/src/type/redux-action.type';

export const ACTION_TYPES = {
  FETCH_PESQUISA_LIST: 'pesquisa/FETCH_PESQUISA_LIST',
  FETCH_PESQUISA_LIST_CSV: 'pesquisa/FETCH_PESQUISA_CSV',
  FETCH_PROCESSOS_LIST_CSV: 'processos/FETCH_PROCESSOS_CSV',
  FETCH_PESQUISA: 'pesquisa/FETCH_PESQUISA',
  CREATE_PESQUISA: 'pesquisa/CREATE_PESQUISA',
  UPDATE_PESQUISA: 'pesquisa/UPDATE_PESQUISA',
  DELETE_PESQUISA: 'pesquisa/DELETE_PESQUISA',
  SET_BLOB: 'pesquisa/SET_BLOB',
  RESET: 'pesquisa/RESET',
  EDIT_PESQUISA: 'pesquisa/EDIT_PESQUISA',
  EDIT_DADOS_PESQUISA: 'pesquisa/EDIT_DADOS_PESQUISA'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPesquisa>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  csvError: ''
};

export type PesquisaState = Readonly<typeof initialState>;

// Reducer

export default (state: PesquisaState = initialState, action): PesquisaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PESQUISA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PESQUISA_LIST_CSV):
    case REQUEST(ACTION_TYPES.FETCH_PESQUISA):
    case REQUEST(ACTION_TYPES.FETCH_PROCESSOS_LIST_CSV):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PESQUISA):
    case REQUEST(ACTION_TYPES.UPDATE_PESQUISA):
    case REQUEST(ACTION_TYPES.DELETE_PESQUISA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PESQUISA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PESQUISA_LIST_CSV):
    case FAILURE(ACTION_TYPES.FETCH_PROCESSOS_LIST_CSV):
    case FAILURE(ACTION_TYPES.FETCH_PESQUISA):
    case FAILURE(ACTION_TYPES.CREATE_PESQUISA):
    case FAILURE(ACTION_TYPES.UPDATE_PESQUISA):
    case FAILURE(ACTION_TYPES.DELETE_PESQUISA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PESQUISA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PESQUISA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PESQUISA):
    case SUCCESS(ACTION_TYPES.UPDATE_PESQUISA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PESQUISA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case SUCCESS(ACTION_TYPES.FETCH_PESQUISA_LIST_CSV):
      {
        fileDownload(action.payload.data, 'pesquisa.csv');
      }
      return {
        ...state,
        loading: false,
        csvError: 'Erro ao exportar o arquivo csv da pesquisa'
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROCESSOS_LIST_CSV):
      {
        fileDownload(action.payload.data, 'processos.csv');
      }
      return {
        ...state,
        loading: false,
        csvError: 'Erro ao exportar o arquivo csv dos processos'
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/pesquisas';

// Actions

export const getEntities: ICrudGetAllAction<IPesquisa> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PESQUISA_LIST,
    payload: axios.get<IPesquisa>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IPesquisa> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PESQUISA,
    payload: axios.get<IPesquisa>(requestUrl)
  };
};
export const editPesquisa = (id, observacao) => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.EDIT_PESQUISA,
    payload: axios.put(apiUrl + '/edit', { id, observacao })
  });
};

export const getPesquisaCSV: ICrudGetAction<IPesquisa> = id => {
  const requestUrl = `${apiUrl}/export-csv/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PESQUISA_LIST_CSV,
    payload: axios.get<IPesquisa>(requestUrl)
  };
};
export const getPesquisaProcessoCSV: ICrudGetAction<IPesquisa> = id => {
  const requestUrl = `api/processos/export-csv?pesquisaId.equals=${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROCESSOS_LIST_CSV,
    payload: axios.get<IProcesso>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPesquisa> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PESQUISA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPesquisa> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PESQUISA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity = (id, listFiltersPage) => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PESQUISA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities(...listFiltersPage));
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});
export const insertObservacaoPesquisa = (id, nome, observacao, listFiltersPage) => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.EDIT_DADOS_PESQUISA,
    payload: axios.put(apiUrl, { id, nome, observacao })
  });

  dispatch(getEntities(...listFiltersPage));
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
