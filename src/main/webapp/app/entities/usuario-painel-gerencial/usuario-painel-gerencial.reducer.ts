/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUsuarioPainelGerencial, defaultValue } from 'app/shared/model/usuario-painel-gerencial.model';

export const ACTION_TYPES = {
  FETCH_USUARIOPAINELGERENCIAL_LIST: 'usuarioPainelGerencial/FETCH_USUARIOPAINELGERENCIAL_LIST',
  FETCH_USUARIOPAINELGERENCIAL: 'usuarioPainelGerencial/FETCH_USUARIOPAINELGERENCIAL',
  CREATE_USUARIOPAINELGERENCIAL: 'usuarioPainelGerencial/CREATE_USUARIOPAINELGERENCIAL',
  UPDATE_USUARIOPAINELGERENCIAL: 'usuarioPainelGerencial/UPDATE_USUARIOPAINELGERENCIAL',
  DELETE_USUARIOPAINELGERENCIAL: 'usuarioPainelGerencial/DELETE_USUARIOPAINELGERENCIAL',
  RESET: 'usuarioPainelGerencial/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUsuarioPainelGerencial>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type UsuarioPainelGerencialState = Readonly<typeof initialState>;

// Reducer

export default (state: UsuarioPainelGerencialState = initialState, action): UsuarioPainelGerencialState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USUARIOPAINELGERENCIAL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USUARIOPAINELGERENCIAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_USUARIOPAINELGERENCIAL):
    case REQUEST(ACTION_TYPES.UPDATE_USUARIOPAINELGERENCIAL):
    case REQUEST(ACTION_TYPES.DELETE_USUARIOPAINELGERENCIAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_USUARIOPAINELGERENCIAL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USUARIOPAINELGERENCIAL):
    case FAILURE(ACTION_TYPES.CREATE_USUARIOPAINELGERENCIAL):
    case FAILURE(ACTION_TYPES.UPDATE_USUARIOPAINELGERENCIAL):
    case FAILURE(ACTION_TYPES.DELETE_USUARIOPAINELGERENCIAL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_USUARIOPAINELGERENCIAL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_USUARIOPAINELGERENCIAL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_USUARIOPAINELGERENCIAL):
    case SUCCESS(ACTION_TYPES.UPDATE_USUARIOPAINELGERENCIAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_USUARIOPAINELGERENCIAL):
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

const apiUrl = 'api/usuario-painel-gerencials';

// Actions

// Actions
export type ICrudGetAllActionUsuarioPainelGerencial<T> = (
  idUsuario?: any,
  verCronicos?: any,
  verPacientesAtivosCr?: any,
  filtroPacientesAtivosCr?: any,
  verNumHospCr?: any,
  filtroNumHospCr?: any,
  verNumDesospCr?: any,
  filtroNumDesospCr?: any,
  verNumPsCr?: any,
  filtroNumPsCr?: any,
  verNumObitoCr?: any,
  filtroNumObitoCr?: any,
  verIndCliEstaveisCr?: any,
  filtroIndCliEstaveisCr?: any,
  verNumConsMedInternasCr?: any,
  filtroNumConsMedInternasCr?: any,
  verNumConsMedExternasCr?: any,
  filtroNumConsMedExternasCr?: any,
  verNumLaboratorialCr?: any,
  filtroNumLaboratorialCr?: any,
  verNumImagemCr?: any,
  filtroNumImagemCr?: any,
  verNumOutrosCr?: any,
  filtroNumOutrosCr?: any,
  verNumAtCatCr?: any,
  filtroNumAtCatCr?: any,
  verNumCatCompCr?: any,
  filtroNumCatCompCr?: any,
  verAtCmSucessoCr?: any,
  filtroAtCmSucessoCr?: any,
  verMediaPadAbertoCr?: any,
  filtroMediaPadAbertoCr?: any,
  verAtIntercorrenciaCr?: any,
  filtroAtIntercorrenciaCr?: any,
  verTempoMedioAtCr?: any,
  filtroTempoMedioAtCr?: any,
  verMediaPtaCr?: any,
  filtroMediaPtaCr?: any,
  verIndicadorUsoAppCr?: any,
  filtroIndicadorUsoAppCr?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionUsuarioPainelGerencial<IUsuarioPainelGerencial> = (
  idUsuario,
  verCronicos,
  verPacientesAtivosCr,
  filtroPacientesAtivosCr,
  verNumHospCr,
  filtroNumHospCr,
  verNumDesospCr,
  filtroNumDesospCr,
  verNumPsCr,
  filtroNumPsCr,
  verNumObitoCr,
  filtroNumObitoCr,
  verIndCliEstaveisCr,
  filtroIndCliEstaveisCr,
  verNumConsMedInternasCr,
  filtroNumConsMedInternasCr,
  verNumConsMedExternasCr,
  filtroNumConsMedExternasCr,
  verNumLaboratorialCr,
  filtroNumLaboratorialCr,
  verNumImagemCr,
  filtroNumImagemCr,
  verNumOutrosCr,
  filtroNumOutrosCr,
  verNumAtCatCr,
  filtroNumAtCatCr,
  verNumCatCompCr,
  filtroNumCatCompCr,
  verAtCmSucessoCr,
  filtroAtCmSucessoCr,
  verMediaPadAbertoCr,
  filtroMediaPadAbertoCr,
  verAtIntercorrenciaCr,
  filtroAtIntercorrenciaCr,
  verTempoMedioAtCr,
  filtroTempoMedioAtCr,
  verMediaPtaCr,
  filtroMediaPtaCr,
  verIndicadorUsoAppCr,
  filtroIndicadorUsoAppCr,
  page,
  size,
  sort
) => {
  const idUsuarioRequest = idUsuario ? `idUsuario.contains=${idUsuario}&` : '';
  const verCronicosRequest = verCronicos ? `verCronicos.contains=${verCronicos}&` : '';
  const verPacientesAtivosCrRequest = verPacientesAtivosCr ? `verPacientesAtivosCr.contains=${verPacientesAtivosCr}&` : '';
  const filtroPacientesAtivosCrRequest = filtroPacientesAtivosCr ? `filtroPacientesAtivosCr.contains=${filtroPacientesAtivosCr}&` : '';
  const verNumHospCrRequest = verNumHospCr ? `verNumHospCr.contains=${verNumHospCr}&` : '';
  const filtroNumHospCrRequest = filtroNumHospCr ? `filtroNumHospCr.contains=${filtroNumHospCr}&` : '';
  const verNumDesospCrRequest = verNumDesospCr ? `verNumDesospCr.contains=${verNumDesospCr}&` : '';
  const filtroNumDesospCrRequest = filtroNumDesospCr ? `filtroNumDesospCr.contains=${filtroNumDesospCr}&` : '';
  const verNumPsCrRequest = verNumPsCr ? `verNumPsCr.contains=${verNumPsCr}&` : '';
  const filtroNumPsCrRequest = filtroNumPsCr ? `filtroNumPsCr.contains=${filtroNumPsCr}&` : '';
  const verNumObitoCrRequest = verNumObitoCr ? `verNumObitoCr.contains=${verNumObitoCr}&` : '';
  const filtroNumObitoCrRequest = filtroNumObitoCr ? `filtroNumObitoCr.contains=${filtroNumObitoCr}&` : '';
  const verIndCliEstaveisCrRequest = verIndCliEstaveisCr ? `verIndCliEstaveisCr.contains=${verIndCliEstaveisCr}&` : '';
  const filtroIndCliEstaveisCrRequest = filtroIndCliEstaveisCr ? `filtroIndCliEstaveisCr.contains=${filtroIndCliEstaveisCr}&` : '';
  const verNumConsMedInternasCrRequest = verNumConsMedInternasCr ? `verNumConsMedInternasCr.contains=${verNumConsMedInternasCr}&` : '';
  const filtroNumConsMedInternasCrRequest = filtroNumConsMedInternasCr
    ? `filtroNumConsMedInternasCr.contains=${filtroNumConsMedInternasCr}&`
    : '';
  const verNumConsMedExternasCrRequest = verNumConsMedExternasCr ? `verNumConsMedExternasCr.contains=${verNumConsMedExternasCr}&` : '';
  const filtroNumConsMedExternasCrRequest = filtroNumConsMedExternasCr
    ? `filtroNumConsMedExternasCr.contains=${filtroNumConsMedExternasCr}&`
    : '';
  const verNumLaboratorialCrRequest = verNumLaboratorialCr ? `verNumLaboratorialCr.contains=${verNumLaboratorialCr}&` : '';
  const filtroNumLaboratorialCrRequest = filtroNumLaboratorialCr ? `filtroNumLaboratorialCr.contains=${filtroNumLaboratorialCr}&` : '';
  const verNumImagemCrRequest = verNumImagemCr ? `verNumImagemCr.contains=${verNumImagemCr}&` : '';
  const filtroNumImagemCrRequest = filtroNumImagemCr ? `filtroNumImagemCr.contains=${filtroNumImagemCr}&` : '';
  const verNumOutrosCrRequest = verNumOutrosCr ? `verNumOutrosCr.contains=${verNumOutrosCr}&` : '';
  const filtroNumOutrosCrRequest = filtroNumOutrosCr ? `filtroNumOutrosCr.contains=${filtroNumOutrosCr}&` : '';
  const verNumAtCatCrRequest = verNumAtCatCr ? `verNumAtCatCr.contains=${verNumAtCatCr}&` : '';
  const filtroNumAtCatCrRequest = filtroNumAtCatCr ? `filtroNumAtCatCr.contains=${filtroNumAtCatCr}&` : '';
  const verNumCatCompCrRequest = verNumCatCompCr ? `verNumCatCompCr.contains=${verNumCatCompCr}&` : '';
  const filtroNumCatCompCrRequest = filtroNumCatCompCr ? `filtroNumCatCompCr.contains=${filtroNumCatCompCr}&` : '';
  const verAtCmSucessoCrRequest = verAtCmSucessoCr ? `verAtCmSucessoCr.contains=${verAtCmSucessoCr}&` : '';
  const filtroAtCmSucessoCrRequest = filtroAtCmSucessoCr ? `filtroAtCmSucessoCr.contains=${filtroAtCmSucessoCr}&` : '';
  const verMediaPadAbertoCrRequest = verMediaPadAbertoCr ? `verMediaPadAbertoCr.contains=${verMediaPadAbertoCr}&` : '';
  const filtroMediaPadAbertoCrRequest = filtroMediaPadAbertoCr ? `filtroMediaPadAbertoCr.contains=${filtroMediaPadAbertoCr}&` : '';
  const verAtIntercorrenciaCrRequest = verAtIntercorrenciaCr ? `verAtIntercorrenciaCr.contains=${verAtIntercorrenciaCr}&` : '';
  const filtroAtIntercorrenciaCrRequest = filtroAtIntercorrenciaCr ? `filtroAtIntercorrenciaCr.contains=${filtroAtIntercorrenciaCr}&` : '';
  const verTempoMedioAtCrRequest = verTempoMedioAtCr ? `verTempoMedioAtCr.contains=${verTempoMedioAtCr}&` : '';
  const filtroTempoMedioAtCrRequest = filtroTempoMedioAtCr ? `filtroTempoMedioAtCr.contains=${filtroTempoMedioAtCr}&` : '';
  const verMediaPtaCrRequest = verMediaPtaCr ? `verMediaPtaCr.contains=${verMediaPtaCr}&` : '';
  const filtroMediaPtaCrRequest = filtroMediaPtaCr ? `filtroMediaPtaCr.contains=${filtroMediaPtaCr}&` : '';
  const verIndicadorUsoAppCrRequest = verIndicadorUsoAppCr ? `verIndicadorUsoAppCr.contains=${verIndicadorUsoAppCr}&` : '';
  const filtroIndicadorUsoAppCrRequest = filtroIndicadorUsoAppCr ? `filtroIndicadorUsoAppCr.contains=${filtroIndicadorUsoAppCr}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_USUARIOPAINELGERENCIAL_LIST,
    payload: axios.get<IUsuarioPainelGerencial>(
      `${requestUrl}${idUsuarioRequest}${verCronicosRequest}${verPacientesAtivosCrRequest}${filtroPacientesAtivosCrRequest}${verNumHospCrRequest}${filtroNumHospCrRequest}${verNumDesospCrRequest}${filtroNumDesospCrRequest}${verNumPsCrRequest}${filtroNumPsCrRequest}${verNumObitoCrRequest}${filtroNumObitoCrRequest}${verIndCliEstaveisCrRequest}${filtroIndCliEstaveisCrRequest}${verNumConsMedInternasCrRequest}${filtroNumConsMedInternasCrRequest}${verNumConsMedExternasCrRequest}${filtroNumConsMedExternasCrRequest}${verNumLaboratorialCrRequest}${filtroNumLaboratorialCrRequest}${verNumImagemCrRequest}${filtroNumImagemCrRequest}${verNumOutrosCrRequest}${filtroNumOutrosCrRequest}${verNumAtCatCrRequest}${filtroNumAtCatCrRequest}${verNumCatCompCrRequest}${filtroNumCatCompCrRequest}${verAtCmSucessoCrRequest}${filtroAtCmSucessoCrRequest}${verMediaPadAbertoCrRequest}${filtroMediaPadAbertoCrRequest}${verAtIntercorrenciaCrRequest}${filtroAtIntercorrenciaCrRequest}${verTempoMedioAtCrRequest}${filtroTempoMedioAtCrRequest}${verMediaPtaCrRequest}${filtroMediaPtaCrRequest}${verIndicadorUsoAppCrRequest}${filtroIndicadorUsoAppCrRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IUsuarioPainelGerencial> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USUARIOPAINELGERENCIAL,
    payload: axios.get<IUsuarioPainelGerencial>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IUsuarioPainelGerencial> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USUARIOPAINELGERENCIAL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUsuarioPainelGerencial> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USUARIOPAINELGERENCIAL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUsuarioPainelGerencial> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USUARIOPAINELGERENCIAL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
