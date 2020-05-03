/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IReportEmailAtendimento, defaultValue } from 'app/shared/model/report-email-atendimento.model';

export const ACTION_TYPES = {
  FETCH_REPORTEMAILATENDIMENTO_LIST: 'reportEmailAtendimento/FETCH_REPORTEMAILATENDIMENTO_LIST',
  FETCH_REPORTEMAILATENDIMENTO: 'reportEmailAtendimento/FETCH_REPORTEMAILATENDIMENTO',
  CREATE_REPORTEMAILATENDIMENTO: 'reportEmailAtendimento/CREATE_REPORTEMAILATENDIMENTO',
  UPDATE_REPORTEMAILATENDIMENTO: 'reportEmailAtendimento/UPDATE_REPORTEMAILATENDIMENTO',
  DELETE_REPORTEMAILATENDIMENTO: 'reportEmailAtendimento/DELETE_REPORTEMAILATENDIMENTO',
  RESET: 'reportEmailAtendimento/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IReportEmailAtendimento>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ReportEmailAtendimentoState = Readonly<typeof initialState>;

// Reducer

export default (state: ReportEmailAtendimentoState = initialState, action): ReportEmailAtendimentoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_REPORTEMAILATENDIMENTO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_REPORTEMAILATENDIMENTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_REPORTEMAILATENDIMENTO):
    case REQUEST(ACTION_TYPES.UPDATE_REPORTEMAILATENDIMENTO):
    case REQUEST(ACTION_TYPES.DELETE_REPORTEMAILATENDIMENTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_REPORTEMAILATENDIMENTO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_REPORTEMAILATENDIMENTO):
    case FAILURE(ACTION_TYPES.CREATE_REPORTEMAILATENDIMENTO):
    case FAILURE(ACTION_TYPES.UPDATE_REPORTEMAILATENDIMENTO):
    case FAILURE(ACTION_TYPES.DELETE_REPORTEMAILATENDIMENTO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_REPORTEMAILATENDIMENTO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_REPORTEMAILATENDIMENTO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_REPORTEMAILATENDIMENTO):
    case SUCCESS(ACTION_TYPES.UPDATE_REPORTEMAILATENDIMENTO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_REPORTEMAILATENDIMENTO):
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

const apiUrl = 'api/report-email-atendimentos';

// Actions

// Actions
export type ICrudGetAllActionReportEmailAtendimento<T> = (
  idAtendimento?: any,
  tipoReport?: any,
  dataPost?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionReportEmailAtendimento<IReportEmailAtendimento> = (
  idAtendimento,
  tipoReport,
  dataPost,
  page,
  size,
  sort
) => {
  const idAtendimentoRequest = idAtendimento ? `idAtendimento.contains=${idAtendimento}&` : '';
  const tipoReportRequest = tipoReport ? `tipoReport.contains=${tipoReport}&` : '';
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_REPORTEMAILATENDIMENTO_LIST,
    payload: axios.get<IReportEmailAtendimento>(
      `${requestUrl}${idAtendimentoRequest}${tipoReportRequest}${dataPostRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IReportEmailAtendimento> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_REPORTEMAILATENDIMENTO,
    payload: axios.get<IReportEmailAtendimento>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IReportEmailAtendimento> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_REPORTEMAILATENDIMENTO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IReportEmailAtendimento> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_REPORTEMAILATENDIMENTO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IReportEmailAtendimento> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_REPORTEMAILATENDIMENTO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
