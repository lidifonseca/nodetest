/* eslint no-console: off */
import axios from 'axios';
import fileDownload from 'js-file-download';
import { ICrudDeleteAction, ICrudGetAction, ICrudPutAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';

import { defaultValue, IProcesso } from 'app/shared/model/processo.model';
import { IPayload } from 'react-jhipster/src/type/redux-action.type';

export const ACTION_TYPES = {
  FETCH_PROCESSO_LIST: 'processo/FETCH_PROCESSO_LIST',
  FETCH_PROCESSO_DETALE_FILTER: 'processo/FETCH_PROCESSO_DETALE_FILTER',
  FETCH_PROCESSO_LIST_CSV: 'processo/FETCH_PROCESSO_LIST_CSV',
  UPDATE_PROCESSO_INTERESSE: 'processo/UPDATE_PROCESSO_INTERESSE',
  FETCH_PROCESSO: 'processo/FETCH_PROCESSO',
  CREATE_PROCESSO: 'processo/CREATE_PROCESSO',
  UPDATE_PROCESSO: 'processo/UPDATE_PROCESSO',
  DELETE_PROCESSO: 'processo/DELETE_PROCESSO',
  SET_BLOB: 'processo/SET_BLOB',
  RESET: 'processo/RESET',
  INSERT_OBSERVACAO: 'processo/INSERT_OBSERVACAO',
  PRENCHER_COMARCAR: 'processo/PRENCHER_COMARCAR',
  EDIT_VALOR: 'processo/EDIT_VALOR',
  EDIT_MOEDA: 'processo/EDIT_MOEDA'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProcesso>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  csvError: '',
  listaComarcas: []
};

export type ProcessoState = Readonly<typeof initialState>;

// Reducer

export default (state: ProcessoState = initialState, action): ProcessoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROCESSO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROCESSO_LIST_CSV):
    case REQUEST(ACTION_TYPES.FETCH_PROCESSO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROCESSO):
    case REQUEST(ACTION_TYPES.UPDATE_PROCESSO):
    case REQUEST(ACTION_TYPES.DELETE_PROCESSO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROCESSO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROCESSO_LIST_CSV):
    case FAILURE(ACTION_TYPES.FETCH_PROCESSO):
    case FAILURE(ACTION_TYPES.CREATE_PROCESSO):
    case FAILURE(ACTION_TYPES.UPDATE_PROCESSO):
    case FAILURE(ACTION_TYPES.DELETE_PROCESSO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROCESSO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROCESSO_LIST_CSV):
      {
        fileDownload(action.payload.data, 'processos.csv');
      }

      return {
        ...state,
        loading: false,
        csvError: 'Erro ao exportar o arquivo csv do processo'
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROCESSO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROCESSO_DETALE_FILTER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data.length > 0 ? action.payload.data[0] : {}
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROCESSO):
    case SUCCESS(ACTION_TYPES.UPDATE_PROCESSO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.UPDATE_PROCESSO_INTERESSE):
      return {
        ...state
      };
    case SUCCESS(ACTION_TYPES.INSERT_OBSERVACAO):
      return {
        ...state
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROCESSO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case SUCCESS(ACTION_TYPES.PRENCHER_COMARCAR): {
      const listaComarcas = action.payload.data;
      const listaComarcasSelect = [];
      for (const i in listaComarcas) {
        if (Object.prototype.hasOwnProperty.call(listaComarcas, i)) {
          listaComarcasSelect.push({ value: listaComarcas[i].id, label: listaComarcas[i].nome });
        }
      }
      return {
        ...state,
        listaComarcas: listaComarcasSelect
      };
    }
    case FAILURE(ACTION_TYPES.PRENCHER_COMARCAR):
      return {
        ...state,
        listaComarcas: []
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

const apiUrl = 'api/processos';

// Actions
export type ICrudGetAllActionProcesso<T> = (
  estado?: string,
  page?: number,
  size?: number,
  sort?: string,
  activeTab?: string,
  comarca?: string,
  numeroProcesso?: string,
  advogados?: any,
  pesquisa?: any,
  assunto?: string,
  distribuicaoInicial?: Date,
  distribuicaoFinal?: Date,
  valorInicial?: number,
  valorFinal?: number,
  moeda?: string,
  cnpj?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionProcesso<IProcesso> = (
  estado,
  page,
  size,
  sort,
  activeTab?,
  comarca?,
  numeroProcesso?,
  advogados?,
  pesquisa?,
  assunto?,
  distribuicaoInicial?,
  distribuicaoFinal?,
  valorInicial?,
  valorFinal?,
  moeda?,
  cnpj?
) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  let activeTabRequest = '';
  if (activeTab === 'sem_clasificacao') activeTabRequest = 'interesse.specified=false&';
  else if (activeTab === 'com_interesse') activeTabRequest = 'interesse.equals=true&';
  else if (activeTab === 'sem_interesse') activeTabRequest = 'interesse.equals=false&';
  const advogadosRequest =
    parseInt(advogados, 10) === 1 || parseInt(advogados, 10) === 0
      ? parseInt(advogados, 10) === 1
        ? 'advogados.equals=true&'
        : 'advogados.equals=false&'
      : '';

  let estadoRequest = '';
  if (estado === 'Todos') {
    estadoRequest = `estado.specified=true&`;
  } else {
    estadoRequest = `estado.equals=${estado}&`;
  }
  const pesquisaRequest = pesquisa ? `pesquisaId.equals=${pesquisa}&` : '';
  const comarcasRequest = comarca ? `comarcaId.equals=${comarca}&` : '';
  const assuntoRequest = assunto ? `assunto.contains=${assunto}&` : '';
  const numeroRequest = numeroProcesso ? `numero.contains=${numeroProcesso}&` : '';
  const valorInicialRequest = valorInicial ? `valor.greaterThanOrEqual=${valorInicial}&` : '';
  const valorFinalRequest = valorFinal ? `valor.lessThanOrEqual=${valorFinal}&` : '';
  const distribuicaoInicialRequest = distribuicaoInicial
    ? `dataDistribuicao.greaterThanOrEqual=${distribuicaoInicial.toISOString().slice(0, 10)}&`
    : '';
  const distribuicaoFinalRequest = distribuicaoFinal
    ? `dataDistribuicao.lessThanOrEqual=${distribuicaoFinal.toISOString().slice(0, 10)}&`
    : '';

  const moedaRequest = moeda ? `moeda.equals=${moeda}&` : '';
  const cnpjRequest = cnpj ? `cnpj.contains=${cnpj}&` : '';

  return {
    type: ACTION_TYPES.FETCH_PROCESSO_LIST,
    payload: axios.get<IProcesso>(
      `${requestUrl}${
        sort ? '&' : '?'
      }${activeTabRequest}${estadoRequest}${advogadosRequest}${pesquisaRequest}${comarcasRequest}${assuntoRequest}${numeroRequest}${distribuicaoInicialRequest}${distribuicaoFinalRequest}${valorInicialRequest}${valorFinalRequest}${moedaRequest}${cnpjRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntityFilter: ICrudGetAllActionProcesso<IProcesso> = (
  estado,
  page,
  size,
  sort,
  activeTab?,
  comarca?,
  numeroProcesso?,
  advogados?,
  pesquisa?,
  assunto?,
  distribuicaoInicial?,
  distribuicaoFinal?,
  valorInicial?,
  valorFinal?,
  moeda?,
  cnpj?
) => {
  const requestUrl = `${apiUrl}?details=true${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`;
  let activeTabRequest = '';
  if (activeTab === 'sem_clasificacao') activeTabRequest = 'interesse.specified=false&';
  else if (activeTab === 'com_interesse') activeTabRequest = 'interesse.equals=true&';
  else if (activeTab === 'sem_interesse') activeTabRequest = 'interesse.equals=false&';
  const advogadosRequest =
    parseInt(advogados, 10) === 1 || parseInt(advogados, 10) === 0
      ? parseInt(advogados, 10) === 1
        ? 'advogados.equals=true&'
        : 'advogados.equals=false&'
      : '';

  let estadoRequest = '';
  if (estado !== 'Todos') {
    estadoRequest = `estado.equals=${estado}&`;
  }

  const pesquisaRequest = pesquisa ? `pesquisaId.equals=${pesquisa}&` : '';
  const comarcasRequest = comarca ? `comarcaId.equals=${comarca}&` : '';
  const assuntoRequest = assunto ? `assunto.contains=${assunto}&` : '';
  const numeroRequest = numeroProcesso ? `numero.contains=${numeroProcesso}&` : '';
  const valorInicialRequest = valorInicial ? `valor.greaterThanOrEqual=${valorInicial}&` : '';
  const valorFinalRequest = valorFinal ? `valor.lessThanOrEqual=${valorFinal}&` : '';
  const distribuicaoInicialRequest = distribuicaoInicial
    ? `dataDistribuicao.greaterThanOrEqual=${distribuicaoInicial.toISOString().slice(0, 10)}&`
    : '';
  const distribuicaoFinalRequest = distribuicaoFinal
    ? `dataDistribuicao.lessThanOrEqual=${distribuicaoFinal.toISOString().slice(0, 10)}&`
    : '';

  const moedaRequest = moeda ? `moeda.equals=${moeda}&` : '';
  const cnpjRequest = cnpj ? `cnpj.contains=${cnpj}&` : '';

  return {
    type: ACTION_TYPES.FETCH_PROCESSO_DETALE_FILTER,
    payload: axios.get<IProcesso>(
      `${requestUrl}&${activeTabRequest}${estadoRequest}${advogadosRequest}${pesquisaRequest}${comarcasRequest}${assuntoRequest}${numeroRequest}${distribuicaoInicialRequest}${distribuicaoFinalRequest}${valorInicialRequest}${valorFinalRequest}${moedaRequest}${cnpjRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const getEntitiesCSV: ICrudGetAllActionProcesso<IProcesso> = (
  estado,
  page,
  size,
  sort,
  activeTab?,
  comarca?,
  numeroProcesso?,
  advogados?,
  pesquisa?,
  assunto?,
  distribuicaoInicial?,
  distribuicaoFinal?,
  valorInicial?,
  valorFinal?,
  moeda?,
  cnpj?
) => {
  const requestUrl = `${apiUrl}`;

  let activeTabRequest = '';
  if (activeTab === 'sem_clasificacao') activeTabRequest = 'interesse.specified=false&';
  else if (activeTab === 'com_interesse') activeTabRequest = 'interesse.equals=true&';
  else if (activeTab === 'sem_interesse') activeTabRequest = 'interesse.equals=false&';

  const advogadosRequest =
    parseInt(advogados, 10) === 1 || parseInt(advogados, 10) === 0
      ? parseInt(advogados, 10) === 1
        ? 'advogados.equals=true&'
        : 'advogados.equals=false&'
      : '';
  let estadoRequest = '';
  if (estado !== 'Todos') {
    estadoRequest = `estado.equals=${estado}&`;
  }
  const comarcasRequest = comarca ? `comarcaId.equals=${comarca}&` : '';
  const assuntoRequest = assunto ? `assunto.contains=${assunto}&` : '';
  const numeroRequest = numeroProcesso ? `numero.contains=${numeroProcesso}&` : '';
  const valorInicialRequest = valorInicial ? `valor.greaterThanOrEqual=${valorInicial}&` : '';
  const valorFinalRequest = valorFinal ? `valor.lessThanOrEqual=${valorFinal}&` : '';
  const distribuicaoInicialRequest = distribuicaoInicial
    ? `dataDistribuicao.greaterThanOrEqual=${distribuicaoInicial.toISOString().slice(0, 10)}&`
    : '';
  const distribuicaoFinalRequest = distribuicaoFinal
    ? `dataDistribuicao.lessThanOrEqual=${distribuicaoFinal.toISOString().slice(0, 10)}&`
    : '';
  const moedaRequest = moeda ? `moeda.equals=${moeda}&` : '';
  const pesquisaRequest = pesquisa ? `pesquisaId.equals=${pesquisa}&` : '';
  const cnpjRequest = cnpj ? `cnpj.contains=${cnpj}&` : '';
  return {
    type: ACTION_TYPES.FETCH_PROCESSO_LIST_CSV,
    // payload: axios.get<IProcesso>(`${requestUrl}/export-csv${sort ? '&' : '?'}${activeTabRequest}${advogadosRequest}${comarcasRequest}${assuntoRequest}${numeroRequest}${distribuicaoInicialRequest}${distribuicaoFinalRequest}cacheBuster=${new Date().getTime()}`)
    payload: axios.get<IProcesso>(
      `${requestUrl}/export-csv?${pesquisaRequest}${estadoRequest}${activeTabRequest}${advogadosRequest}${comarcasRequest}${assuntoRequest}${numeroRequest}${distribuicaoInicialRequest}${distribuicaoFinalRequest}${valorInicialRequest}${valorFinalRequest}${moedaRequest}${cnpjRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export type IGetProcessWithPesquisaIdAction<T> = (
  id: string | number,
  pesquisaId: number | null
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntity: IGetProcessWithPesquisaIdAction<IProcesso> = (id, pesquisaId) => {
  const requestUrl = `${apiUrl}/${id}/details${pesquisaId ? '?pesquisaId=' + pesquisaId : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PROCESSO,
    payload: axios.get<IProcesso>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProcesso> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROCESSO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProcesso> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROCESSO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateInteresseEntity = (id, interesse, listFiltersPage) => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROCESSO,
    payload: axios.put(apiUrl + '/interesse', { id, interesse })
  });

  dispatch(getEntities(...listFiltersPage));
  return result;
};

export const updateInteresseEntityDetails = (id, interesse, listFiltersPage) => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROCESSO,
    payload: axios.put(apiUrl + '/interesse', { id, interesse })
  });

  dispatch(getEntityFilter(...listFiltersPage));
  return result;
};

export const insertObservacao = (id, observacao, listFiltersPage) => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.INSERT_OBSERVACAO,
    payload: axios.put(apiUrl + '/observacoes', { id, observacao })
  });

  dispatch(getEntities(...listFiltersPage));
  return result;
};

export const editValorAcao = (id, valor, listFiltersPage) => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.EDIT_VALOR,
    payload: axios.put(apiUrl + '/valor', { id, valor })
  });
  dispatch(getEntities(...listFiltersPage));
  return result;
};

export const editMoeda = (id, moeda, listFiltersPage) => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.EDIT_MOEDA,
    payload: axios.put(apiUrl + '/moeda', { id, moeda })
  });
  dispatch(getEntities(...listFiltersPage));
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProcesso> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROCESSO,
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

export const prencherComarcas = estadoId => {
  let queryUrl = '';
  if (estadoId !== -1) {
    queryUrl = '&estadoId.equals=' + estadoId;
  }
  return {
    type: ACTION_TYPES.PRENCHER_COMARCAR,
    payload: axios.get('api/comarcas?size=10000' + queryUrl)
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
