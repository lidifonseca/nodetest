/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProfissionalNew, defaultValue } from 'app/shared/model/profissional-new.model';

export const ACTION_TYPES = {
  FETCH_PROFISSIONALNEW_LIST: 'profissionalNew/FETCH_PROFISSIONALNEW_LIST',
  FETCH_PROFISSIONALNEW: 'profissionalNew/FETCH_PROFISSIONALNEW',
  CREATE_PROFISSIONALNEW: 'profissionalNew/CREATE_PROFISSIONALNEW',
  UPDATE_PROFISSIONALNEW: 'profissionalNew/UPDATE_PROFISSIONALNEW',
  DELETE_PROFISSIONALNEW: 'profissionalNew/DELETE_PROFISSIONALNEW',
  SET_BLOB: 'profissionalNew/SET_BLOB',
  RESET: 'profissionalNew/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProfissionalNew>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProfissionalNewState = Readonly<typeof initialState>;

// Reducer

export default (state: ProfissionalNewState = initialState, action): ProfissionalNewState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALNEW_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALNEW):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROFISSIONALNEW):
    case REQUEST(ACTION_TYPES.UPDATE_PROFISSIONALNEW):
    case REQUEST(ACTION_TYPES.DELETE_PROFISSIONALNEW):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALNEW_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALNEW):
    case FAILURE(ACTION_TYPES.CREATE_PROFISSIONALNEW):
    case FAILURE(ACTION_TYPES.UPDATE_PROFISSIONALNEW):
    case FAILURE(ACTION_TYPES.DELETE_PROFISSIONALNEW):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALNEW_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALNEW):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROFISSIONALNEW):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFISSIONALNEW):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROFISSIONALNEW):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
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

const apiUrl = 'api/profissional-news';

// Actions

// Actions
export type ICrudGetAllActionProfissionalNew<T> = (
  idUnidade?: any,
  idCidade?: any,
  idTempoExperiencia?: any,
  idBanco?: any,
  senha?: any,
  nome?: any,
  email?: any,
  cpf?: any,
  rg?: any,
  nomeEmpresa?: any,
  cnpj?: any,
  registro?: any,
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
  atendeCrianca?: any,
  atendeIdoso?: any,
  ag?: any,
  conta?: any,
  tipoConta?: any,
  origemCadastro?: any,
  obs?: any,
  chavePrivada?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionProfissionalNew<IProfissionalNew> = (
  idUnidade,
  idCidade,
  idTempoExperiencia,
  idBanco,
  senha,
  nome,
  email,
  cpf,
  rg,
  nomeEmpresa,
  cnpj,
  registro,
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
  atendeCrianca,
  atendeIdoso,
  ag,
  conta,
  tipoConta,
  origemCadastro,
  obs,
  chavePrivada,
  ativo,
  page,
  size,
  sort
) => {
  const idUnidadeRequest = idUnidade ? `idUnidade.contains=${idUnidade}&` : '';
  const idCidadeRequest = idCidade ? `idCidade.contains=${idCidade}&` : '';
  const idTempoExperienciaRequest = idTempoExperiencia ? `idTempoExperiencia.contains=${idTempoExperiencia}&` : '';
  const idBancoRequest = idBanco ? `idBanco.contains=${idBanco}&` : '';
  const senhaRequest = senha ? `senha.contains=${senha}&` : '';
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const emailRequest = email ? `email.contains=${email}&` : '';
  const cpfRequest = cpf ? `cpf.contains=${cpf}&` : '';
  const rgRequest = rg ? `rg.contains=${rg}&` : '';
  const nomeEmpresaRequest = nomeEmpresa ? `nomeEmpresa.contains=${nomeEmpresa}&` : '';
  const cnpjRequest = cnpj ? `cnpj.contains=${cnpj}&` : '';
  const registroRequest = registro ? `registro.contains=${registro}&` : '';
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
  const atendeCriancaRequest = atendeCrianca ? `atendeCrianca.contains=${atendeCrianca}&` : '';
  const atendeIdosoRequest = atendeIdoso ? `atendeIdoso.contains=${atendeIdoso}&` : '';
  const agRequest = ag ? `ag.contains=${ag}&` : '';
  const contaRequest = conta ? `conta.contains=${conta}&` : '';
  const tipoContaRequest = tipoConta ? `tipoConta.contains=${tipoConta}&` : '';
  const origemCadastroRequest = origemCadastro ? `origemCadastro.contains=${origemCadastro}&` : '';
  const obsRequest = obs ? `obs.contains=${obs}&` : '';
  const chavePrivadaRequest = chavePrivada ? `chavePrivada.contains=${chavePrivada}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALNEW_LIST,
    payload: axios.get<IProfissionalNew>(
      `${requestUrl}${idUnidadeRequest}${idCidadeRequest}${idTempoExperienciaRequest}${idBancoRequest}${senhaRequest}${nomeRequest}${emailRequest}${cpfRequest}${rgRequest}${nomeEmpresaRequest}${cnpjRequest}${registroRequest}${nascimentoRequest}${sexoRequest}${telefone1Request}${telefone2Request}${celular1Request}${celular2Request}${cepRequest}${enderecoRequest}${numeroRequest}${complementoRequest}${bairroRequest}${cidadeRequest}${ufRequest}${atendeCriancaRequest}${atendeIdosoRequest}${agRequest}${contaRequest}${tipoContaRequest}${origemCadastroRequest}${obsRequest}${chavePrivadaRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IProfissionalNew> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALNEW,
    payload: axios.get<IProfissionalNew>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProfissionalNew> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROFISSIONALNEW,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProfissionalNew> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFISSIONALNEW,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProfissionalNew> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROFISSIONALNEW,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
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

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
