/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUnidadeEasy, defaultValue } from 'app/shared/model/unidade-easy.model';

export const ACTION_TYPES = {
  FETCH_UNIDADEEASY_LIST: 'unidadeEasy/FETCH_UNIDADEEASY_LIST',
  FETCH_UNIDADEEASY: 'unidadeEasy/FETCH_UNIDADEEASY',
  CREATE_UNIDADEEASY: 'unidadeEasy/CREATE_UNIDADEEASY',
  UPDATE_UNIDADEEASY: 'unidadeEasy/UPDATE_UNIDADEEASY',
  DELETE_UNIDADEEASY: 'unidadeEasy/DELETE_UNIDADEEASY',
  RESET: 'unidadeEasy/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUnidadeEasy>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type UnidadeEasyState = Readonly<typeof initialState>;

// Reducer

export default (state: UnidadeEasyState = initialState, action): UnidadeEasyState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_UNIDADEEASY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_UNIDADEEASY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_UNIDADEEASY):
    case REQUEST(ACTION_TYPES.UPDATE_UNIDADEEASY):
    case REQUEST(ACTION_TYPES.DELETE_UNIDADEEASY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_UNIDADEEASY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_UNIDADEEASY):
    case FAILURE(ACTION_TYPES.CREATE_UNIDADEEASY):
    case FAILURE(ACTION_TYPES.UPDATE_UNIDADEEASY):
    case FAILURE(ACTION_TYPES.DELETE_UNIDADEEASY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_UNIDADEEASY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_UNIDADEEASY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_UNIDADEEASY):
    case SUCCESS(ACTION_TYPES.UPDATE_UNIDADEEASY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_UNIDADEEASY):
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

const apiUrl = 'api/unidade-easies';

// Actions

// Actions
export type ICrudGetAllActionUnidadeEasy<T> = (
  razaoSocial?: any,
  nomeFantasia?: any,
  cnpj?: any,
  ie?: any,
  telefone1?: any,
  telefone2?: any,
  endereco?: any,
  numero?: any,
  complemento?: any,
  bairro?: any,
  cidade?: any,
  uf?: any,
  cep?: any,
  regans?: any,
  regcnes?: any,
  tissresponsavel?: any,
  tissconselho?: any,
  tissinscricao?: any,
  tisscbo?: any,
  tisscoduf?: any,
  ativo?: any,
  categoriaUnidade?: any,
  especialidadeUnidade?: any,
  pacientePedido?: any,
  unidadeEasyAreaAtuacao?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionUnidadeEasy<IUnidadeEasy> = (
  razaoSocial,
  nomeFantasia,
  cnpj,
  ie,
  telefone1,
  telefone2,
  endereco,
  numero,
  complemento,
  bairro,
  cidade,
  uf,
  cep,
  regans,
  regcnes,
  tissresponsavel,
  tissconselho,
  tissinscricao,
  tisscbo,
  tisscoduf,
  ativo,
  categoriaUnidade,
  especialidadeUnidade,
  pacientePedido,
  unidadeEasyAreaAtuacao,
  page,
  size,
  sort
) => {
  const razaoSocialRequest = razaoSocial ? `razaoSocial.contains=${razaoSocial}&` : '';
  const nomeFantasiaRequest = nomeFantasia ? `nomeFantasia.contains=${nomeFantasia}&` : '';
  const cnpjRequest = cnpj ? `cnpj.contains=${cnpj}&` : '';
  const ieRequest = ie ? `ie.contains=${ie}&` : '';
  const telefone1Request = telefone1 ? `telefone1.contains=${telefone1}&` : '';
  const telefone2Request = telefone2 ? `telefone2.contains=${telefone2}&` : '';
  const enderecoRequest = endereco ? `endereco.contains=${endereco}&` : '';
  const numeroRequest = numero ? `numero.contains=${numero}&` : '';
  const complementoRequest = complemento ? `complemento.contains=${complemento}&` : '';
  const bairroRequest = bairro ? `bairro.contains=${bairro}&` : '';
  const cidadeRequest = cidade ? `cidade.contains=${cidade}&` : '';
  const ufRequest = uf ? `uf.contains=${uf}&` : '';
  const cepRequest = cep ? `cep.contains=${cep}&` : '';
  const regansRequest = regans ? `regans.contains=${regans}&` : '';
  const regcnesRequest = regcnes ? `regcnes.contains=${regcnes}&` : '';
  const tissresponsavelRequest = tissresponsavel ? `tissresponsavel.contains=${tissresponsavel}&` : '';
  const tissconselhoRequest = tissconselho ? `tissconselho.contains=${tissconselho}&` : '';
  const tissinscricaoRequest = tissinscricao ? `tissinscricao.contains=${tissinscricao}&` : '';
  const tisscboRequest = tisscbo ? `tisscbo.contains=${tisscbo}&` : '';
  const tisscodufRequest = tisscoduf ? `tisscoduf.contains=${tisscoduf}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const categoriaUnidadeRequest = categoriaUnidade ? `categoriaUnidade.equals=${categoriaUnidade}&` : '';
  const especialidadeUnidadeRequest = especialidadeUnidade ? `especialidadeUnidade.equals=${especialidadeUnidade}&` : '';
  const pacientePedidoRequest = pacientePedido ? `pacientePedido.equals=${pacientePedido}&` : '';
  const unidadeEasyAreaAtuacaoRequest = unidadeEasyAreaAtuacao ? `unidadeEasyAreaAtuacao.equals=${unidadeEasyAreaAtuacao}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_UNIDADEEASY_LIST,
    payload: axios.get<IUnidadeEasy>(
      `${requestUrl}${razaoSocialRequest}${nomeFantasiaRequest}${cnpjRequest}${ieRequest}${telefone1Request}${telefone2Request}${enderecoRequest}${numeroRequest}${complementoRequest}${bairroRequest}${cidadeRequest}${ufRequest}${cepRequest}${regansRequest}${regcnesRequest}${tissresponsavelRequest}${tissconselhoRequest}${tissinscricaoRequest}${tisscboRequest}${tisscodufRequest}${ativoRequest}${categoriaUnidadeRequest}${especialidadeUnidadeRequest}${pacientePedidoRequest}${unidadeEasyAreaAtuacaoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IUnidadeEasy> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_UNIDADEEASY,
    payload: axios.get<IUnidadeEasy>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IUnidadeEasy> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_UNIDADEEASY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUnidadeEasy> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_UNIDADEEASY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUnidadeEasy> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_UNIDADEEASY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
