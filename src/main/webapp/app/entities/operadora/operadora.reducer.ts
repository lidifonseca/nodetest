/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IOperadora, defaultValue } from 'app/shared/model/operadora.model';

export const ACTION_TYPES = {
  FETCH_OPERADORA_LIST: 'operadora/FETCH_OPERADORA_LIST',
  FETCH_OPERADORA: 'operadora/FETCH_OPERADORA',
  CREATE_OPERADORA: 'operadora/CREATE_OPERADORA',
  UPDATE_OPERADORA: 'operadora/UPDATE_OPERADORA',
  DELETE_OPERADORA: 'operadora/DELETE_OPERADORA',
  RESET: 'operadora/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IOperadora>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type OperadoraState = Readonly<typeof initialState>;

// Reducer

export default (state: OperadoraState = initialState, action): OperadoraState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_OPERADORA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_OPERADORA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_OPERADORA):
    case REQUEST(ACTION_TYPES.UPDATE_OPERADORA):
    case REQUEST(ACTION_TYPES.DELETE_OPERADORA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_OPERADORA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_OPERADORA):
    case FAILURE(ACTION_TYPES.CREATE_OPERADORA):
    case FAILURE(ACTION_TYPES.UPDATE_OPERADORA):
    case FAILURE(ACTION_TYPES.DELETE_OPERADORA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_OPERADORA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_OPERADORA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_OPERADORA):
    case SUCCESS(ACTION_TYPES.UPDATE_OPERADORA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_OPERADORA):
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

const apiUrl = 'api/operadoras';

// Actions

// Actions
export type ICrudGetAllActionOperadora<T> = (
  nomeFantasia?: any,
  razaoSocial?: any,
  cnpj?: any,
  ie?: any,
  site?: any,
  ativo?: any,
  idUnidade?: any,
  endereco?: any,
  contatoCentralAtendimento?: any,
  emailCentralAtendimento?: any,
  nomeContatoComercial?: any,
  contatoComercial?: any,
  emailComercial?: any,
  nomeContatoFinanceiro?: any,
  contatoFinanceiro?: any,
  emailFinanceiro?: any,
  atendimento?: any,
  especialidadeOperadora?: any,
  pacienteOperadora?: any,
  idTipoOperadora?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionOperadora<IOperadora> = (
  nomeFantasia,
  razaoSocial,
  cnpj,
  ie,
  site,
  ativo,
  idUnidade,
  endereco,
  contatoCentralAtendimento,
  emailCentralAtendimento,
  nomeContatoComercial,
  contatoComercial,
  emailComercial,
  nomeContatoFinanceiro,
  contatoFinanceiro,
  emailFinanceiro,
  atendimento,
  especialidadeOperadora,
  pacienteOperadora,
  idTipoOperadora,
  page,
  size,
  sort
) => {
  const nomeFantasiaRequest = nomeFantasia ? `nomeFantasia.contains=${nomeFantasia}&` : '';
  const razaoSocialRequest = razaoSocial ? `razaoSocial.contains=${razaoSocial}&` : '';
  const cnpjRequest = cnpj ? `cnpj.contains=${cnpj}&` : '';
  const ieRequest = ie ? `ie.contains=${ie}&` : '';
  const siteRequest = site ? `site.contains=${site}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const idUnidadeRequest = idUnidade ? `idUnidade.contains=${idUnidade}&` : '';
  const enderecoRequest = endereco ? `endereco.contains=${endereco}&` : '';
  const contatoCentralAtendimentoRequest = contatoCentralAtendimento
    ? `contatoCentralAtendimento.contains=${contatoCentralAtendimento}&`
    : '';
  const emailCentralAtendimentoRequest = emailCentralAtendimento ? `emailCentralAtendimento.contains=${emailCentralAtendimento}&` : '';
  const nomeContatoComercialRequest = nomeContatoComercial ? `nomeContatoComercial.contains=${nomeContatoComercial}&` : '';
  const contatoComercialRequest = contatoComercial ? `contatoComercial.contains=${contatoComercial}&` : '';
  const emailComercialRequest = emailComercial ? `emailComercial.contains=${emailComercial}&` : '';
  const nomeContatoFinanceiroRequest = nomeContatoFinanceiro ? `nomeContatoFinanceiro.contains=${nomeContatoFinanceiro}&` : '';
  const contatoFinanceiroRequest = contatoFinanceiro ? `contatoFinanceiro.contains=${contatoFinanceiro}&` : '';
  const emailFinanceiroRequest = emailFinanceiro ? `emailFinanceiro.contains=${emailFinanceiro}&` : '';
  const atendimentoRequest = atendimento ? `atendimento.equals=${atendimento}&` : '';
  const especialidadeOperadoraRequest = especialidadeOperadora ? `especialidadeOperadora.equals=${especialidadeOperadora}&` : '';
  const pacienteOperadoraRequest = pacienteOperadora ? `pacienteOperadora.equals=${pacienteOperadora}&` : '';
  const idTipoOperadoraRequest = idTipoOperadora ? `idTipoOperadora.equals=${idTipoOperadora}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_OPERADORA_LIST,
    payload: axios.get<IOperadora>(
      `${requestUrl}${nomeFantasiaRequest}${razaoSocialRequest}${cnpjRequest}${ieRequest}${siteRequest}${ativoRequest}${idUnidadeRequest}${enderecoRequest}${contatoCentralAtendimentoRequest}${emailCentralAtendimentoRequest}${nomeContatoComercialRequest}${contatoComercialRequest}${emailComercialRequest}${nomeContatoFinanceiroRequest}${contatoFinanceiroRequest}${emailFinanceiroRequest}${atendimentoRequest}${especialidadeOperadoraRequest}${pacienteOperadoraRequest}${idTipoOperadoraRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IOperadora> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_OPERADORA,
    payload: axios.get<IOperadora>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IOperadora> = entity => async dispatch => {
  entity = {
    ...entity,
    idTipoOperadora: entity.idTipoOperadora === 'null' ? null : entity.idTipoOperadora
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_OPERADORA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IOperadora> = entity => async dispatch => {
  entity = { ...entity, idTipoOperadora: entity.idTipoOperadora === 'null' ? null : entity.idTipoOperadora };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_OPERADORA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IOperadora> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_OPERADORA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
