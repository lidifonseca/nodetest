import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
  ENVIAR_DADOS: 'configuracoes/ENVIAR_DADOS',
  LIMPAR_RESPOSTA: 'configuracoes/LIMPAR_RESPOSTA',
  PRENCHER_COMARCAR: 'configuracoes/PRENCHER_COMARCAR',
  PRENCHER_ESTADOS: 'configuracoes/PRENCHER_ESTADOS'
};
const urlCaptura = {
  1: 'tj-sc',
  2: 'tj-sp'
};
const initialState = {
  dadosEnviados: false,
  coletando: false,

  listaComarcas: [{ value: null, label: 'Sem Estado Selecionado' }],
  listaEstados: [{ value: null, label: 'Seleccione Estado', sigla: '' }]
};

export type ConfiguracoesState = Readonly<typeof initialState>;

// Reducer

export default (state: ConfiguracoesState = initialState, action): ConfiguracoesState => {
  switch (action.type) {
    case SUCCESS(ACTION_TYPES.ENVIAR_DADOS):
      return {
        ...state,
        dadosEnviados: true,
        coletando: false
      };
    case FAILURE(ACTION_TYPES.ENVIAR_DADOS):
      return {
        ...state,
        coletando: false
      };
    case REQUEST(ACTION_TYPES.ENVIAR_DADOS):
      return {
        ...state,
        coletando: true
      };
    case SUCCESS(ACTION_TYPES.PRENCHER_COMARCAR): {
      const listaComarcas = action.payload.data;
      const listaComarcasSelect = [{ value: -1, label: 'Todas' }];
      for (const i in listaComarcas) {
        if (Object.prototype.hasOwnProperty.call(listaComarcas, i)) {
          listaComarcasSelect.push({ value: listaComarcas[i].tjid, label: listaComarcas[i].nome });
        }
      }
      return {
        ...state,
        listaComarcas: listaComarcasSelect,
        listaEstados: state.listaEstados[0].value === '' ? state.listaEstados.slice(1) : state.listaEstados
      };
    }
    case FAILURE(ACTION_TYPES.PRENCHER_COMARCAR):
      return {
        ...state,
        listaComarcas: []
      };
    case SUCCESS(ACTION_TYPES.PRENCHER_ESTADOS): {
      const listaEstado = action.payload.data;
      const listaEstadoSelect = [];
      for (const i in listaEstado) {
        if (Object.prototype.hasOwnProperty.call(listaEstado, i)) {
          listaEstadoSelect.push({ value: listaEstado[i].id, label: listaEstado[i].nome, sigla: listaEstado[i].sigla });
        }
      }
      return {
        ...state,
        listaEstados: listaEstadoSelect
      };
    }
    case ACTION_TYPES.LIMPAR_RESPOSTA:
      return {
        ...state
      };
    default:
      return state;
  }
};

export const enviarDados = dados => {
  return {
    type: ACTION_TYPES.ENVIAR_DADOS,
    payload: axios.post('api/' + urlCaptura[dados['estadoId']] + '/collect', dados)
  };
};
export const limparResposta = () => dispatch => {
  dispatch({
    type: ACTION_TYPES.LIMPAR_RESPOSTA
  });
};

export const prencherComarcas = estadoId => {
  return {
    type: ACTION_TYPES.PRENCHER_COMARCAR,
    payload: axios.get('api/comarcas?size=1000&estadoId.equals=' + estadoId)
  };
};

export const prencherEstados: any = estadoSelected => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PRENCHER_ESTADOS,
    payload: axios.get('api/estados/')
  });
  if (estadoSelected) {
    dispatch(prencherComarcas(estadoSelected));
  }
  return result;
};
