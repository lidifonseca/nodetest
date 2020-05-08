/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmpresa, defaultValue } from 'app/shared/model/empresa.model';

export const ACTION_TYPES = {
  FETCH_EMPRESA_LIST_EXPORT: 'empresa/FETCH_EMPRESA_LIST_EXPORT',
  FETCH_EMPRESA_LIST: 'empresa/FETCH_EMPRESA_LIST',
  FETCH_EMPRESA: 'empresa/FETCH_EMPRESA',
  CREATE_EMPRESA: 'empresa/CREATE_EMPRESA',
  UPDATE_EMPRESA: 'empresa/UPDATE_EMPRESA',
  DELETE_EMPRESA: 'empresa/DELETE_EMPRESA',
  RESET: 'empresa/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmpresa>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type EmpresaState = Readonly<typeof initialState>;

export interface IEmpresaBaseState {
  baseFilters: any;
  empresa: any;
  nome: any;
  email: any;
  cpf: any;
  rg: any;
  nascimento: any;
  sexo: any;
  telefone1: any;
  telefone2: any;
  celular1: any;
  celular2: any;
  cep: any;
  endereco: any;
  numero: any;
  complemento: any;
  bairro: any;
  cidade: any;
  uf: any;
  tipo: any;
  cidade: any;
}

export interface IEmpresaUpdateState {
  fieldsBase: IEmpresaBaseState;

  cidadeSelectValue: any;
  isNew: boolean;
  cidadeId: string;
}

// Reducer

export default (state: EmpresaState = initialState, action): EmpresaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPRESA_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_EMPRESA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPRESA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPRESA):
    case REQUEST(ACTION_TYPES.UPDATE_EMPRESA):
    case REQUEST(ACTION_TYPES.DELETE_EMPRESA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPRESA_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_EMPRESA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPRESA):
    case FAILURE(ACTION_TYPES.CREATE_EMPRESA):
    case FAILURE(ACTION_TYPES.UPDATE_EMPRESA):
    case FAILURE(ACTION_TYPES.DELETE_EMPRESA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPRESA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPRESA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPRESA):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPRESA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPRESA):
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

const apiUrl = 'api/empresas';

// Actions

// Actions
export type ICrudGetAllActionEmpresa<T> = (
  empresa?: any,
  nome?: any,
  email?: any,
  cpf?: any,
  rg?: any,
  nascimento?: any,
  sexo?: any,
  telefone1?: any,
  telefone2?: any,
  celular1?: any,
  celular2?: any,
  cep?: any,
  endereco?: any,
  numero?: any,
  complemento?: any,
  bairro?: any,
  cidade?: any,
  uf?: any,
  tipo?: any,
  cidade?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionEmpresa<IEmpresa> = (
  empresa,
  nome,
  email,
  cpf,
  rg,
  nascimento,
  sexo,
  telefone1,
  telefone2,
  celular1,
  celular2,
  cep,
  endereco,
  numero,
  complemento,
  bairro,
  cidade,
  uf,
  tipo,
  cidade,
  page,
  size,
  sort
) => {
  const empresaRequest = empresa ? `empresa.contains=${empresa}&` : '';
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const emailRequest = email ? `email.contains=${email}&` : '';
  const cpfRequest = cpf ? `cpf.contains=${cpf}&` : '';
  const rgRequest = rg ? `rg.contains=${rg}&` : '';
  const nascimentoRequest = nascimento ? `nascimento.equals=${nascimento}&` : '';
  const sexoRequest = sexo ? `sexo.contains=${sexo}&` : '';
  const telefone1Request = telefone1 ? `telefone1.contains=${telefone1}&` : '';
  const telefone2Request = telefone2 ? `telefone2.contains=${telefone2}&` : '';
  const celular1Request = celular1 ? `celular1.contains=${celular1}&` : '';
  const celular2Request = celular2 ? `celular2.contains=${celular2}&` : '';
  const cepRequest = cep ? `cep.contains=${cep}&` : '';
  const enderecoRequest = endereco ? `endereco.contains=${endereco}&` : '';
  const numeroRequest = numero ? `numero.contains=${numero}&` : '';
  const complementoRequest = complemento ? `complemento.contains=${complemento}&` : '';
  const bairroRequest = bairro ? `bairro.contains=${bairro}&` : '';
  const cidadeRequest = cidade ? `cidade.contains=${cidade}&` : '';
  const ufRequest = uf ? `uf.contains=${uf}&` : '';
  const tipoRequest = tipo ? `tipo.contains=${tipo}&` : '';
  const cidadeRequest = cidade ? `cidade.equals=${cidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_EMPRESA_LIST,
    payload: axios.get<IEmpresa>(
      `${requestUrl}${empresaRequest}${nomeRequest}${emailRequest}${cpfRequest}${rgRequest}${nascimentoRequest}${sexoRequest}${telefone1Request}${telefone2Request}${celular1Request}${celular2Request}${cepRequest}${enderecoRequest}${numeroRequest}${complementoRequest}${bairroRequest}${cidadeRequest}${ufRequest}${tipoRequest}${cidadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IEmpresa> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPRESA,
    payload: axios.get<IEmpresa>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionEmpresa<IEmpresa> = (
  empresa,
  nome,
  email,
  cpf,
  rg,
  nascimento,
  sexo,
  telefone1,
  telefone2,
  celular1,
  celular2,
  cep,
  endereco,
  numero,
  complemento,
  bairro,
  cidade,
  uf,
  tipo,
  cidade,
  page,
  size,
  sort
) => {
  const empresaRequest = empresa ? `empresa.contains=${empresa}&` : '';
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const emailRequest = email ? `email.contains=${email}&` : '';
  const cpfRequest = cpf ? `cpf.contains=${cpf}&` : '';
  const rgRequest = rg ? `rg.contains=${rg}&` : '';
  const nascimentoRequest = nascimento ? `nascimento.equals=${nascimento}&` : '';
  const sexoRequest = sexo ? `sexo.contains=${sexo}&` : '';
  const telefone1Request = telefone1 ? `telefone1.contains=${telefone1}&` : '';
  const telefone2Request = telefone2 ? `telefone2.contains=${telefone2}&` : '';
  const celular1Request = celular1 ? `celular1.contains=${celular1}&` : '';
  const celular2Request = celular2 ? `celular2.contains=${celular2}&` : '';
  const cepRequest = cep ? `cep.contains=${cep}&` : '';
  const enderecoRequest = endereco ? `endereco.contains=${endereco}&` : '';
  const numeroRequest = numero ? `numero.contains=${numero}&` : '';
  const complementoRequest = complemento ? `complemento.contains=${complemento}&` : '';
  const bairroRequest = bairro ? `bairro.contains=${bairro}&` : '';
  const cidadeRequest = cidade ? `cidade.contains=${cidade}&` : '';
  const ufRequest = uf ? `uf.contains=${uf}&` : '';
  const tipoRequest = tipo ? `tipo.contains=${tipo}&` : '';
  const cidadeRequest = cidade ? `cidade.equals=${cidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_EMPRESA_LIST,
    payload: axios.get<IEmpresa>(
      `${requestUrl}${empresaRequest}${nomeRequest}${emailRequest}${cpfRequest}${rgRequest}${nascimentoRequest}${sexoRequest}${telefone1Request}${telefone2Request}${celular1Request}${celular2Request}${cepRequest}${enderecoRequest}${numeroRequest}${complementoRequest}${bairroRequest}${cidadeRequest}${ufRequest}${tipoRequest}${cidadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IEmpresa> = entity => async dispatch => {
  entity = {
    ...entity,
    cidade: entity.cidade === 'null' ? null : entity.cidade
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPRESA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmpresa> = entity => async dispatch => {
  entity = { ...entity, cidade: entity.cidade === 'null' ? null : entity.cidade };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPRESA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmpresa> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPRESA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getEmpresaState = (location): IEmpresaBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const empresa = url.searchParams.get('empresa') || '';
  const nome = url.searchParams.get('nome') || '';
  const email = url.searchParams.get('email') || '';
  const cpf = url.searchParams.get('cpf') || '';
  const rg = url.searchParams.get('rg') || '';
  const nascimento = url.searchParams.get('nascimento') || '';
  const sexo = url.searchParams.get('sexo') || '';
  const telefone1 = url.searchParams.get('telefone1') || '';
  const telefone2 = url.searchParams.get('telefone2') || '';
  const celular1 = url.searchParams.get('celular1') || '';
  const celular2 = url.searchParams.get('celular2') || '';
  const cep = url.searchParams.get('cep') || '';
  const endereco = url.searchParams.get('endereco') || '';
  const numero = url.searchParams.get('numero') || '';
  const complemento = url.searchParams.get('complemento') || '';
  const bairro = url.searchParams.get('bairro') || '';
  const cidade = url.searchParams.get('cidade') || '';
  const uf = url.searchParams.get('uf') || '';
  const tipo = url.searchParams.get('tipo') || '';

  const cidade = url.searchParams.get('cidade') || '';

  return {
    baseFilters,
    empresa,
    nome,
    email,
    cpf,
    rg,
    nascimento,
    sexo,
    telefone1,
    telefone2,
    celular1,
    celular2,
    cep,
    endereco,
    numero,
    complemento,
    bairro,
    cidade,
    uf,
    tipo,
    cidade
  };
};
