/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFranquia, defaultValue } from 'app/shared/model/franquia.model';

export const ACTION_TYPES = {
  FETCH_FRANQUIA_LIST: 'franquia/FETCH_FRANQUIA_LIST',
  FETCH_FRANQUIA: 'franquia/FETCH_FRANQUIA',
  CREATE_FRANQUIA: 'franquia/CREATE_FRANQUIA',
  UPDATE_FRANQUIA: 'franquia/UPDATE_FRANQUIA',
  DELETE_FRANQUIA: 'franquia/DELETE_FRANQUIA',
  RESET: 'franquia/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFranquia>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type FranquiaState = Readonly<typeof initialState>;

// Reducer

export default (state: FranquiaState = initialState, action): FranquiaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FRANQUIA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FRANQUIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FRANQUIA):
    case REQUEST(ACTION_TYPES.UPDATE_FRANQUIA):
    case REQUEST(ACTION_TYPES.DELETE_FRANQUIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FRANQUIA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FRANQUIA):
    case FAILURE(ACTION_TYPES.CREATE_FRANQUIA):
    case FAILURE(ACTION_TYPES.UPDATE_FRANQUIA):
    case FAILURE(ACTION_TYPES.DELETE_FRANQUIA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FRANQUIA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_FRANQUIA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FRANQUIA):
    case SUCCESS(ACTION_TYPES.UPDATE_FRANQUIA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FRANQUIA):
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

const apiUrl = 'api/franquias';

// Actions

// Actions
export type ICrudGetAllActionFranquia<T> = (
  idCidade?: any,
  nomeFantasia?: any,
  razaoSocial?: any,
  cnpj?: any,
  ie?: any,
  site?: any,
  telefone1?: any,
  telefone2?: any,
  celular?: any,
  cep?: any,
  endereco?: any,
  numero?: any,
  complemento?: any,
  bairro?: any,
  cidade?: any,
  uf?: any,
  observacao?: any,
  ativo?: any,
  franquiaAreaAtuacao?: any,
  franquiaStatusAtual?: any,
  franquiaUsuario?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionFranquia<IFranquia> = (
  idCidade,
  nomeFantasia,
  razaoSocial,
  cnpj,
  ie,
  site,
  telefone1,
  telefone2,
  celular,
  cep,
  endereco,
  numero,
  complemento,
  bairro,
  cidade,
  uf,
  observacao,
  ativo,
  franquiaAreaAtuacao,
  franquiaStatusAtual,
  franquiaUsuario,
  page,
  size,
  sort
) => {
  const idCidadeRequest = idCidade ? `idCidade.contains=${idCidade}&` : '';
  const nomeFantasiaRequest = nomeFantasia ? `nomeFantasia.contains=${nomeFantasia}&` : '';
  const razaoSocialRequest = razaoSocial ? `razaoSocial.contains=${razaoSocial}&` : '';
  const cnpjRequest = cnpj ? `cnpj.contains=${cnpj}&` : '';
  const ieRequest = ie ? `ie.contains=${ie}&` : '';
  const siteRequest = site ? `site.contains=${site}&` : '';
  const telefone1Request = telefone1 ? `telefone1.contains=${telefone1}&` : '';
  const telefone2Request = telefone2 ? `telefone2.contains=${telefone2}&` : '';
  const celularRequest = celular ? `celular.contains=${celular}&` : '';
  const cepRequest = cep ? `cep.contains=${cep}&` : '';
  const enderecoRequest = endereco ? `endereco.contains=${endereco}&` : '';
  const numeroRequest = numero ? `numero.contains=${numero}&` : '';
  const complementoRequest = complemento ? `complemento.contains=${complemento}&` : '';
  const bairroRequest = bairro ? `bairro.contains=${bairro}&` : '';
  const cidadeRequest = cidade ? `cidade.contains=${cidade}&` : '';
  const ufRequest = uf ? `uf.contains=${uf}&` : '';
  const observacaoRequest = observacao ? `observacao.contains=${observacao}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const franquiaAreaAtuacaoRequest = franquiaAreaAtuacao ? `franquiaAreaAtuacao.equals=${franquiaAreaAtuacao}&` : '';
  const franquiaStatusAtualRequest = franquiaStatusAtual ? `franquiaStatusAtual.equals=${franquiaStatusAtual}&` : '';
  const franquiaUsuarioRequest = franquiaUsuario ? `franquiaUsuario.equals=${franquiaUsuario}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_FRANQUIA_LIST,
    payload: axios.get<IFranquia>(
      `${requestUrl}${idCidadeRequest}${nomeFantasiaRequest}${razaoSocialRequest}${cnpjRequest}${ieRequest}${siteRequest}${telefone1Request}${telefone2Request}${celularRequest}${cepRequest}${enderecoRequest}${numeroRequest}${complementoRequest}${bairroRequest}${cidadeRequest}${ufRequest}${observacaoRequest}${ativoRequest}${franquiaAreaAtuacaoRequest}${franquiaStatusAtualRequest}${franquiaUsuarioRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IFranquia> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FRANQUIA,
    payload: axios.get<IFranquia>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFranquia> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FRANQUIA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFranquia> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FRANQUIA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFranquia> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FRANQUIA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
