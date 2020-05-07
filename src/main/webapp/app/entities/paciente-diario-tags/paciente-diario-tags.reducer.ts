/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPacienteDiarioTags, defaultValue } from 'app/shared/model/paciente-diario-tags.model';

export const ACTION_TYPES = {
  FETCH_PACIENTEDIARIOTAGS_LIST_EXPORT: 'pacienteDiarioTags/FETCH_PACIENTEDIARIOTAGS_LIST_EXPORT',
  FETCH_PACIENTEDIARIOTAGS_LIST: 'pacienteDiarioTags/FETCH_PACIENTEDIARIOTAGS_LIST',
  FETCH_PACIENTEDIARIOTAGS: 'pacienteDiarioTags/FETCH_PACIENTEDIARIOTAGS',
  CREATE_PACIENTEDIARIOTAGS: 'pacienteDiarioTags/CREATE_PACIENTEDIARIOTAGS',
  UPDATE_PACIENTEDIARIOTAGS: 'pacienteDiarioTags/UPDATE_PACIENTEDIARIOTAGS',
  DELETE_PACIENTEDIARIOTAGS: 'pacienteDiarioTags/DELETE_PACIENTEDIARIOTAGS',
  RESET: 'pacienteDiarioTags/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPacienteDiarioTags>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PacienteDiarioTagsState = Readonly<typeof initialState>;

export interface IPacienteDiarioTagsBaseState {
  baseFilters: any;
  idPacienteDiario: any;
  idDiarioTags: any;
  escalaDePlantao: any;
  captacaoEdp: any;
  implantacaoEdp: any;
  furoDeEscalaEdp: any;
  solicitacaoDeFolgaEdp: any;
  trocaDeProfissionalEdp: any;
  reclamacaoEdp: any;
  elogioEdp: any;
  recusaDeAtendimentoEdp: any;
  duplicidadeEdp: any;
  monitorarEdp: any;
  pendenteEdp: any;
  escalaMultiProfissional: any;
  captacaoEmp: any;
  implantacaoEmp: any;
  solicitacaoDeFolgaEmp: any;
  trocaDeProfissionalEmp: any;
  reclamacaoEmp: any;
  elogioEmp: any;
  padIncompletoEmp: any;
  visitaImprodutivaEmp: any;
  monitorarEmp: any;
  pendenteEmp: any;
  intercorrencia: any;
  clinicaInter: any;
  aphInter: any;
  pendenteInter: any;
  solicitacoes: any;
  recargaDeOxigenioSolic: any;
  equipamentosSolic: any;
  matmedSolic: any;
  prontuarioSolic: any;
  prescricoesSolic: any;
  examesSolic: any;
  ambulanciaSolic: any;
  atendimentoDeEquipeSolic: any;
  monitorarSolic: any;
  pendenteSolic: any;
  avaliacao: any;
  residenciaAval: any;
  hospitalAval: any;
  monitorarAval: any;
  captacaoAtivaAval: any;
  pendenteAval: any;
  implantacao: any;
  monitorarImpl: any;
  pendenteImpl: any;
  alta: any;
  hospitalizacaoAlt: any;
  migracaoDeEmpresaAlt: any;
  obitoEmCasaAlt: any;
  terminoDeAtendimentoAlt: any;
  atendimentoSuspensoAlt: any;
  monitorarAlt: any;
  pendenteAlt: any;
  eCommerceSegViagem: any;
  monitorarEcsv: any;
  pendenteEcsv: any;
  farmacia: any;
  matMedFarm: any;
  receitaFarm: any;
  prontuarioFarm: any;
  romaneioManualFarm: any;
  outrosFarm: any;
  monitorarFarm: any;
  pendenteFarm: any;
  contatoTelefonico: any;
  ativoContTel: any;
  receptivoContTel: any;
  monitorarContTel: any;
  pendenteContTel: any;
  dtPost: any;
}

export interface IPacienteDiarioTagsUpdateState {
  fieldsBase: IPacienteDiarioTagsBaseState;
  isNew: boolean;
}

// Reducer

export default (state: PacienteDiarioTagsState = initialState, action): PacienteDiarioTagsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEDIARIOTAGS_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEDIARIOTAGS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEDIARIOTAGS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PACIENTEDIARIOTAGS):
    case REQUEST(ACTION_TYPES.UPDATE_PACIENTEDIARIOTAGS):
    case REQUEST(ACTION_TYPES.DELETE_PACIENTEDIARIOTAGS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEDIARIOTAGS_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEDIARIOTAGS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEDIARIOTAGS):
    case FAILURE(ACTION_TYPES.CREATE_PACIENTEDIARIOTAGS):
    case FAILURE(ACTION_TYPES.UPDATE_PACIENTEDIARIOTAGS):
    case FAILURE(ACTION_TYPES.DELETE_PACIENTEDIARIOTAGS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEDIARIOTAGS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEDIARIOTAGS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PACIENTEDIARIOTAGS):
    case SUCCESS(ACTION_TYPES.UPDATE_PACIENTEDIARIOTAGS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PACIENTEDIARIOTAGS):
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

const apiUrl = 'api/paciente-diario-tags';

// Actions

// Actions
export type ICrudGetAllActionPacienteDiarioTags<T> = (
  idPacienteDiario?: any,
  idDiarioTags?: any,
  escalaDePlantao?: any,
  captacaoEdp?: any,
  implantacaoEdp?: any,
  furoDeEscalaEdp?: any,
  solicitacaoDeFolgaEdp?: any,
  trocaDeProfissionalEdp?: any,
  reclamacaoEdp?: any,
  elogioEdp?: any,
  recusaDeAtendimentoEdp?: any,
  duplicidadeEdp?: any,
  monitorarEdp?: any,
  pendenteEdp?: any,
  escalaMultiProfissional?: any,
  captacaoEmp?: any,
  implantacaoEmp?: any,
  solicitacaoDeFolgaEmp?: any,
  trocaDeProfissionalEmp?: any,
  reclamacaoEmp?: any,
  elogioEmp?: any,
  padIncompletoEmp?: any,
  visitaImprodutivaEmp?: any,
  monitorarEmp?: any,
  pendenteEmp?: any,
  intercorrencia?: any,
  clinicaInter?: any,
  aphInter?: any,
  pendenteInter?: any,
  solicitacoes?: any,
  recargaDeOxigenioSolic?: any,
  equipamentosSolic?: any,
  matmedSolic?: any,
  prontuarioSolic?: any,
  prescricoesSolic?: any,
  examesSolic?: any,
  ambulanciaSolic?: any,
  atendimentoDeEquipeSolic?: any,
  monitorarSolic?: any,
  pendenteSolic?: any,
  avaliacao?: any,
  residenciaAval?: any,
  hospitalAval?: any,
  monitorarAval?: any,
  captacaoAtivaAval?: any,
  pendenteAval?: any,
  implantacao?: any,
  monitorarImpl?: any,
  pendenteImpl?: any,
  alta?: any,
  hospitalizacaoAlt?: any,
  migracaoDeEmpresaAlt?: any,
  obitoEmCasaAlt?: any,
  terminoDeAtendimentoAlt?: any,
  atendimentoSuspensoAlt?: any,
  monitorarAlt?: any,
  pendenteAlt?: any,
  eCommerceSegViagem?: any,
  monitorarEcsv?: any,
  pendenteEcsv?: any,
  farmacia?: any,
  matMedFarm?: any,
  receitaFarm?: any,
  prontuarioFarm?: any,
  romaneioManualFarm?: any,
  outrosFarm?: any,
  monitorarFarm?: any,
  pendenteFarm?: any,
  contatoTelefonico?: any,
  ativoContTel?: any,
  receptivoContTel?: any,
  monitorarContTel?: any,
  pendenteContTel?: any,
  dtPost?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPacienteDiarioTags<IPacienteDiarioTags> = (
  idPacienteDiario,
  idDiarioTags,
  escalaDePlantao,
  captacaoEdp,
  implantacaoEdp,
  furoDeEscalaEdp,
  solicitacaoDeFolgaEdp,
  trocaDeProfissionalEdp,
  reclamacaoEdp,
  elogioEdp,
  recusaDeAtendimentoEdp,
  duplicidadeEdp,
  monitorarEdp,
  pendenteEdp,
  escalaMultiProfissional,
  captacaoEmp,
  implantacaoEmp,
  solicitacaoDeFolgaEmp,
  trocaDeProfissionalEmp,
  reclamacaoEmp,
  elogioEmp,
  padIncompletoEmp,
  visitaImprodutivaEmp,
  monitorarEmp,
  pendenteEmp,
  intercorrencia,
  clinicaInter,
  aphInter,
  pendenteInter,
  solicitacoes,
  recargaDeOxigenioSolic,
  equipamentosSolic,
  matmedSolic,
  prontuarioSolic,
  prescricoesSolic,
  examesSolic,
  ambulanciaSolic,
  atendimentoDeEquipeSolic,
  monitorarSolic,
  pendenteSolic,
  avaliacao,
  residenciaAval,
  hospitalAval,
  monitorarAval,
  captacaoAtivaAval,
  pendenteAval,
  implantacao,
  monitorarImpl,
  pendenteImpl,
  alta,
  hospitalizacaoAlt,
  migracaoDeEmpresaAlt,
  obitoEmCasaAlt,
  terminoDeAtendimentoAlt,
  atendimentoSuspensoAlt,
  monitorarAlt,
  pendenteAlt,
  eCommerceSegViagem,
  monitorarEcsv,
  pendenteEcsv,
  farmacia,
  matMedFarm,
  receitaFarm,
  prontuarioFarm,
  romaneioManualFarm,
  outrosFarm,
  monitorarFarm,
  pendenteFarm,
  contatoTelefonico,
  ativoContTel,
  receptivoContTel,
  monitorarContTel,
  pendenteContTel,
  dtPost,
  page,
  size,
  sort
) => {
  const idPacienteDiarioRequest = idPacienteDiario ? `idPacienteDiario.contains=${idPacienteDiario}&` : '';
  const idDiarioTagsRequest = idDiarioTags ? `idDiarioTags.contains=${idDiarioTags}&` : '';
  const escalaDePlantaoRequest = escalaDePlantao ? `escalaDePlantao.contains=${escalaDePlantao}&` : '';
  const captacaoEdpRequest = captacaoEdp ? `captacaoEdp.contains=${captacaoEdp}&` : '';
  const implantacaoEdpRequest = implantacaoEdp ? `implantacaoEdp.contains=${implantacaoEdp}&` : '';
  const furoDeEscalaEdpRequest = furoDeEscalaEdp ? `furoDeEscalaEdp.contains=${furoDeEscalaEdp}&` : '';
  const solicitacaoDeFolgaEdpRequest = solicitacaoDeFolgaEdp ? `solicitacaoDeFolgaEdp.contains=${solicitacaoDeFolgaEdp}&` : '';
  const trocaDeProfissionalEdpRequest = trocaDeProfissionalEdp ? `trocaDeProfissionalEdp.contains=${trocaDeProfissionalEdp}&` : '';
  const reclamacaoEdpRequest = reclamacaoEdp ? `reclamacaoEdp.contains=${reclamacaoEdp}&` : '';
  const elogioEdpRequest = elogioEdp ? `elogioEdp.contains=${elogioEdp}&` : '';
  const recusaDeAtendimentoEdpRequest = recusaDeAtendimentoEdp ? `recusaDeAtendimentoEdp.contains=${recusaDeAtendimentoEdp}&` : '';
  const duplicidadeEdpRequest = duplicidadeEdp ? `duplicidadeEdp.contains=${duplicidadeEdp}&` : '';
  const monitorarEdpRequest = monitorarEdp ? `monitorarEdp.contains=${monitorarEdp}&` : '';
  const pendenteEdpRequest = pendenteEdp ? `pendenteEdp.contains=${pendenteEdp}&` : '';
  const escalaMultiProfissionalRequest = escalaMultiProfissional ? `escalaMultiProfissional.contains=${escalaMultiProfissional}&` : '';
  const captacaoEmpRequest = captacaoEmp ? `captacaoEmp.contains=${captacaoEmp}&` : '';
  const implantacaoEmpRequest = implantacaoEmp ? `implantacaoEmp.contains=${implantacaoEmp}&` : '';
  const solicitacaoDeFolgaEmpRequest = solicitacaoDeFolgaEmp ? `solicitacaoDeFolgaEmp.contains=${solicitacaoDeFolgaEmp}&` : '';
  const trocaDeProfissionalEmpRequest = trocaDeProfissionalEmp ? `trocaDeProfissionalEmp.contains=${trocaDeProfissionalEmp}&` : '';
  const reclamacaoEmpRequest = reclamacaoEmp ? `reclamacaoEmp.contains=${reclamacaoEmp}&` : '';
  const elogioEmpRequest = elogioEmp ? `elogioEmp.contains=${elogioEmp}&` : '';
  const padIncompletoEmpRequest = padIncompletoEmp ? `padIncompletoEmp.contains=${padIncompletoEmp}&` : '';
  const visitaImprodutivaEmpRequest = visitaImprodutivaEmp ? `visitaImprodutivaEmp.contains=${visitaImprodutivaEmp}&` : '';
  const monitorarEmpRequest = monitorarEmp ? `monitorarEmp.contains=${monitorarEmp}&` : '';
  const pendenteEmpRequest = pendenteEmp ? `pendenteEmp.contains=${pendenteEmp}&` : '';
  const intercorrenciaRequest = intercorrencia ? `intercorrencia.contains=${intercorrencia}&` : '';
  const clinicaInterRequest = clinicaInter ? `clinicaInter.contains=${clinicaInter}&` : '';
  const aphInterRequest = aphInter ? `aphInter.contains=${aphInter}&` : '';
  const pendenteInterRequest = pendenteInter ? `pendenteInter.contains=${pendenteInter}&` : '';
  const solicitacoesRequest = solicitacoes ? `solicitacoes.contains=${solicitacoes}&` : '';
  const recargaDeOxigenioSolicRequest = recargaDeOxigenioSolic ? `recargaDeOxigenioSolic.contains=${recargaDeOxigenioSolic}&` : '';
  const equipamentosSolicRequest = equipamentosSolic ? `equipamentosSolic.contains=${equipamentosSolic}&` : '';
  const matmedSolicRequest = matmedSolic ? `matmedSolic.contains=${matmedSolic}&` : '';
  const prontuarioSolicRequest = prontuarioSolic ? `prontuarioSolic.contains=${prontuarioSolic}&` : '';
  const prescricoesSolicRequest = prescricoesSolic ? `prescricoesSolic.contains=${prescricoesSolic}&` : '';
  const examesSolicRequest = examesSolic ? `examesSolic.contains=${examesSolic}&` : '';
  const ambulanciaSolicRequest = ambulanciaSolic ? `ambulanciaSolic.contains=${ambulanciaSolic}&` : '';
  const atendimentoDeEquipeSolicRequest = atendimentoDeEquipeSolic ? `atendimentoDeEquipeSolic.contains=${atendimentoDeEquipeSolic}&` : '';
  const monitorarSolicRequest = monitorarSolic ? `monitorarSolic.contains=${monitorarSolic}&` : '';
  const pendenteSolicRequest = pendenteSolic ? `pendenteSolic.contains=${pendenteSolic}&` : '';
  const avaliacaoRequest = avaliacao ? `avaliacao.contains=${avaliacao}&` : '';
  const residenciaAvalRequest = residenciaAval ? `residenciaAval.contains=${residenciaAval}&` : '';
  const hospitalAvalRequest = hospitalAval ? `hospitalAval.contains=${hospitalAval}&` : '';
  const monitorarAvalRequest = monitorarAval ? `monitorarAval.contains=${monitorarAval}&` : '';
  const captacaoAtivaAvalRequest = captacaoAtivaAval ? `captacaoAtivaAval.contains=${captacaoAtivaAval}&` : '';
  const pendenteAvalRequest = pendenteAval ? `pendenteAval.contains=${pendenteAval}&` : '';
  const implantacaoRequest = implantacao ? `implantacao.contains=${implantacao}&` : '';
  const monitorarImplRequest = monitorarImpl ? `monitorarImpl.contains=${monitorarImpl}&` : '';
  const pendenteImplRequest = pendenteImpl ? `pendenteImpl.contains=${pendenteImpl}&` : '';
  const altaRequest = alta ? `alta.contains=${alta}&` : '';
  const hospitalizacaoAltRequest = hospitalizacaoAlt ? `hospitalizacaoAlt.contains=${hospitalizacaoAlt}&` : '';
  const migracaoDeEmpresaAltRequest = migracaoDeEmpresaAlt ? `migracaoDeEmpresaAlt.contains=${migracaoDeEmpresaAlt}&` : '';
  const obitoEmCasaAltRequest = obitoEmCasaAlt ? `obitoEmCasaAlt.contains=${obitoEmCasaAlt}&` : '';
  const terminoDeAtendimentoAltRequest = terminoDeAtendimentoAlt ? `terminoDeAtendimentoAlt.contains=${terminoDeAtendimentoAlt}&` : '';
  const atendimentoSuspensoAltRequest = atendimentoSuspensoAlt ? `atendimentoSuspensoAlt.contains=${atendimentoSuspensoAlt}&` : '';
  const monitorarAltRequest = monitorarAlt ? `monitorarAlt.contains=${monitorarAlt}&` : '';
  const pendenteAltRequest = pendenteAlt ? `pendenteAlt.contains=${pendenteAlt}&` : '';
  const eCommerceSegViagemRequest = eCommerceSegViagem ? `eCommerceSegViagem.contains=${eCommerceSegViagem}&` : '';
  const monitorarEcsvRequest = monitorarEcsv ? `monitorarEcsv.contains=${monitorarEcsv}&` : '';
  const pendenteEcsvRequest = pendenteEcsv ? `pendenteEcsv.contains=${pendenteEcsv}&` : '';
  const farmaciaRequest = farmacia ? `farmacia.contains=${farmacia}&` : '';
  const matMedFarmRequest = matMedFarm ? `matMedFarm.contains=${matMedFarm}&` : '';
  const receitaFarmRequest = receitaFarm ? `receitaFarm.contains=${receitaFarm}&` : '';
  const prontuarioFarmRequest = prontuarioFarm ? `prontuarioFarm.contains=${prontuarioFarm}&` : '';
  const romaneioManualFarmRequest = romaneioManualFarm ? `romaneioManualFarm.contains=${romaneioManualFarm}&` : '';
  const outrosFarmRequest = outrosFarm ? `outrosFarm.contains=${outrosFarm}&` : '';
  const monitorarFarmRequest = monitorarFarm ? `monitorarFarm.contains=${monitorarFarm}&` : '';
  const pendenteFarmRequest = pendenteFarm ? `pendenteFarm.contains=${pendenteFarm}&` : '';
  const contatoTelefonicoRequest = contatoTelefonico ? `contatoTelefonico.contains=${contatoTelefonico}&` : '';
  const ativoContTelRequest = ativoContTel ? `ativoContTel.contains=${ativoContTel}&` : '';
  const receptivoContTelRequest = receptivoContTel ? `receptivoContTel.contains=${receptivoContTel}&` : '';
  const monitorarContTelRequest = monitorarContTel ? `monitorarContTel.contains=${monitorarContTel}&` : '';
  const pendenteContTelRequest = pendenteContTel ? `pendenteContTel.contains=${pendenteContTel}&` : '';
  const dtPostRequest = dtPost ? `dtPost.contains=${dtPost}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEDIARIOTAGS_LIST,
    payload: axios.get<IPacienteDiarioTags>(
      `${requestUrl}${idPacienteDiarioRequest}${idDiarioTagsRequest}${escalaDePlantaoRequest}${captacaoEdpRequest}${implantacaoEdpRequest}${furoDeEscalaEdpRequest}${solicitacaoDeFolgaEdpRequest}${trocaDeProfissionalEdpRequest}${reclamacaoEdpRequest}${elogioEdpRequest}${recusaDeAtendimentoEdpRequest}${duplicidadeEdpRequest}${monitorarEdpRequest}${pendenteEdpRequest}${escalaMultiProfissionalRequest}${captacaoEmpRequest}${implantacaoEmpRequest}${solicitacaoDeFolgaEmpRequest}${trocaDeProfissionalEmpRequest}${reclamacaoEmpRequest}${elogioEmpRequest}${padIncompletoEmpRequest}${visitaImprodutivaEmpRequest}${monitorarEmpRequest}${pendenteEmpRequest}${intercorrenciaRequest}${clinicaInterRequest}${aphInterRequest}${pendenteInterRequest}${solicitacoesRequest}${recargaDeOxigenioSolicRequest}${equipamentosSolicRequest}${matmedSolicRequest}${prontuarioSolicRequest}${prescricoesSolicRequest}${examesSolicRequest}${ambulanciaSolicRequest}${atendimentoDeEquipeSolicRequest}${monitorarSolicRequest}${pendenteSolicRequest}${avaliacaoRequest}${residenciaAvalRequest}${hospitalAvalRequest}${monitorarAvalRequest}${captacaoAtivaAvalRequest}${pendenteAvalRequest}${implantacaoRequest}${monitorarImplRequest}${pendenteImplRequest}${altaRequest}${hospitalizacaoAltRequest}${migracaoDeEmpresaAltRequest}${obitoEmCasaAltRequest}${terminoDeAtendimentoAltRequest}${atendimentoSuspensoAltRequest}${monitorarAltRequest}${pendenteAltRequest}${eCommerceSegViagemRequest}${monitorarEcsvRequest}${pendenteEcsvRequest}${farmaciaRequest}${matMedFarmRequest}${receitaFarmRequest}${prontuarioFarmRequest}${romaneioManualFarmRequest}${outrosFarmRequest}${monitorarFarmRequest}${pendenteFarmRequest}${contatoTelefonicoRequest}${ativoContTelRequest}${receptivoContTelRequest}${monitorarContTelRequest}${pendenteContTelRequest}${dtPostRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPacienteDiarioTags> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEDIARIOTAGS,
    payload: axios.get<IPacienteDiarioTags>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionPacienteDiarioTags<IPacienteDiarioTags> = (
  idPacienteDiario,
  idDiarioTags,
  escalaDePlantao,
  captacaoEdp,
  implantacaoEdp,
  furoDeEscalaEdp,
  solicitacaoDeFolgaEdp,
  trocaDeProfissionalEdp,
  reclamacaoEdp,
  elogioEdp,
  recusaDeAtendimentoEdp,
  duplicidadeEdp,
  monitorarEdp,
  pendenteEdp,
  escalaMultiProfissional,
  captacaoEmp,
  implantacaoEmp,
  solicitacaoDeFolgaEmp,
  trocaDeProfissionalEmp,
  reclamacaoEmp,
  elogioEmp,
  padIncompletoEmp,
  visitaImprodutivaEmp,
  monitorarEmp,
  pendenteEmp,
  intercorrencia,
  clinicaInter,
  aphInter,
  pendenteInter,
  solicitacoes,
  recargaDeOxigenioSolic,
  equipamentosSolic,
  matmedSolic,
  prontuarioSolic,
  prescricoesSolic,
  examesSolic,
  ambulanciaSolic,
  atendimentoDeEquipeSolic,
  monitorarSolic,
  pendenteSolic,
  avaliacao,
  residenciaAval,
  hospitalAval,
  monitorarAval,
  captacaoAtivaAval,
  pendenteAval,
  implantacao,
  monitorarImpl,
  pendenteImpl,
  alta,
  hospitalizacaoAlt,
  migracaoDeEmpresaAlt,
  obitoEmCasaAlt,
  terminoDeAtendimentoAlt,
  atendimentoSuspensoAlt,
  monitorarAlt,
  pendenteAlt,
  eCommerceSegViagem,
  monitorarEcsv,
  pendenteEcsv,
  farmacia,
  matMedFarm,
  receitaFarm,
  prontuarioFarm,
  romaneioManualFarm,
  outrosFarm,
  monitorarFarm,
  pendenteFarm,
  contatoTelefonico,
  ativoContTel,
  receptivoContTel,
  monitorarContTel,
  pendenteContTel,
  dtPost,
  page,
  size,
  sort
) => {
  const idPacienteDiarioRequest = idPacienteDiario ? `idPacienteDiario.contains=${idPacienteDiario}&` : '';
  const idDiarioTagsRequest = idDiarioTags ? `idDiarioTags.contains=${idDiarioTags}&` : '';
  const escalaDePlantaoRequest = escalaDePlantao ? `escalaDePlantao.contains=${escalaDePlantao}&` : '';
  const captacaoEdpRequest = captacaoEdp ? `captacaoEdp.contains=${captacaoEdp}&` : '';
  const implantacaoEdpRequest = implantacaoEdp ? `implantacaoEdp.contains=${implantacaoEdp}&` : '';
  const furoDeEscalaEdpRequest = furoDeEscalaEdp ? `furoDeEscalaEdp.contains=${furoDeEscalaEdp}&` : '';
  const solicitacaoDeFolgaEdpRequest = solicitacaoDeFolgaEdp ? `solicitacaoDeFolgaEdp.contains=${solicitacaoDeFolgaEdp}&` : '';
  const trocaDeProfissionalEdpRequest = trocaDeProfissionalEdp ? `trocaDeProfissionalEdp.contains=${trocaDeProfissionalEdp}&` : '';
  const reclamacaoEdpRequest = reclamacaoEdp ? `reclamacaoEdp.contains=${reclamacaoEdp}&` : '';
  const elogioEdpRequest = elogioEdp ? `elogioEdp.contains=${elogioEdp}&` : '';
  const recusaDeAtendimentoEdpRequest = recusaDeAtendimentoEdp ? `recusaDeAtendimentoEdp.contains=${recusaDeAtendimentoEdp}&` : '';
  const duplicidadeEdpRequest = duplicidadeEdp ? `duplicidadeEdp.contains=${duplicidadeEdp}&` : '';
  const monitorarEdpRequest = monitorarEdp ? `monitorarEdp.contains=${monitorarEdp}&` : '';
  const pendenteEdpRequest = pendenteEdp ? `pendenteEdp.contains=${pendenteEdp}&` : '';
  const escalaMultiProfissionalRequest = escalaMultiProfissional ? `escalaMultiProfissional.contains=${escalaMultiProfissional}&` : '';
  const captacaoEmpRequest = captacaoEmp ? `captacaoEmp.contains=${captacaoEmp}&` : '';
  const implantacaoEmpRequest = implantacaoEmp ? `implantacaoEmp.contains=${implantacaoEmp}&` : '';
  const solicitacaoDeFolgaEmpRequest = solicitacaoDeFolgaEmp ? `solicitacaoDeFolgaEmp.contains=${solicitacaoDeFolgaEmp}&` : '';
  const trocaDeProfissionalEmpRequest = trocaDeProfissionalEmp ? `trocaDeProfissionalEmp.contains=${trocaDeProfissionalEmp}&` : '';
  const reclamacaoEmpRequest = reclamacaoEmp ? `reclamacaoEmp.contains=${reclamacaoEmp}&` : '';
  const elogioEmpRequest = elogioEmp ? `elogioEmp.contains=${elogioEmp}&` : '';
  const padIncompletoEmpRequest = padIncompletoEmp ? `padIncompletoEmp.contains=${padIncompletoEmp}&` : '';
  const visitaImprodutivaEmpRequest = visitaImprodutivaEmp ? `visitaImprodutivaEmp.contains=${visitaImprodutivaEmp}&` : '';
  const monitorarEmpRequest = monitorarEmp ? `monitorarEmp.contains=${monitorarEmp}&` : '';
  const pendenteEmpRequest = pendenteEmp ? `pendenteEmp.contains=${pendenteEmp}&` : '';
  const intercorrenciaRequest = intercorrencia ? `intercorrencia.contains=${intercorrencia}&` : '';
  const clinicaInterRequest = clinicaInter ? `clinicaInter.contains=${clinicaInter}&` : '';
  const aphInterRequest = aphInter ? `aphInter.contains=${aphInter}&` : '';
  const pendenteInterRequest = pendenteInter ? `pendenteInter.contains=${pendenteInter}&` : '';
  const solicitacoesRequest = solicitacoes ? `solicitacoes.contains=${solicitacoes}&` : '';
  const recargaDeOxigenioSolicRequest = recargaDeOxigenioSolic ? `recargaDeOxigenioSolic.contains=${recargaDeOxigenioSolic}&` : '';
  const equipamentosSolicRequest = equipamentosSolic ? `equipamentosSolic.contains=${equipamentosSolic}&` : '';
  const matmedSolicRequest = matmedSolic ? `matmedSolic.contains=${matmedSolic}&` : '';
  const prontuarioSolicRequest = prontuarioSolic ? `prontuarioSolic.contains=${prontuarioSolic}&` : '';
  const prescricoesSolicRequest = prescricoesSolic ? `prescricoesSolic.contains=${prescricoesSolic}&` : '';
  const examesSolicRequest = examesSolic ? `examesSolic.contains=${examesSolic}&` : '';
  const ambulanciaSolicRequest = ambulanciaSolic ? `ambulanciaSolic.contains=${ambulanciaSolic}&` : '';
  const atendimentoDeEquipeSolicRequest = atendimentoDeEquipeSolic ? `atendimentoDeEquipeSolic.contains=${atendimentoDeEquipeSolic}&` : '';
  const monitorarSolicRequest = monitorarSolic ? `monitorarSolic.contains=${monitorarSolic}&` : '';
  const pendenteSolicRequest = pendenteSolic ? `pendenteSolic.contains=${pendenteSolic}&` : '';
  const avaliacaoRequest = avaliacao ? `avaliacao.contains=${avaliacao}&` : '';
  const residenciaAvalRequest = residenciaAval ? `residenciaAval.contains=${residenciaAval}&` : '';
  const hospitalAvalRequest = hospitalAval ? `hospitalAval.contains=${hospitalAval}&` : '';
  const monitorarAvalRequest = monitorarAval ? `monitorarAval.contains=${monitorarAval}&` : '';
  const captacaoAtivaAvalRequest = captacaoAtivaAval ? `captacaoAtivaAval.contains=${captacaoAtivaAval}&` : '';
  const pendenteAvalRequest = pendenteAval ? `pendenteAval.contains=${pendenteAval}&` : '';
  const implantacaoRequest = implantacao ? `implantacao.contains=${implantacao}&` : '';
  const monitorarImplRequest = monitorarImpl ? `monitorarImpl.contains=${monitorarImpl}&` : '';
  const pendenteImplRequest = pendenteImpl ? `pendenteImpl.contains=${pendenteImpl}&` : '';
  const altaRequest = alta ? `alta.contains=${alta}&` : '';
  const hospitalizacaoAltRequest = hospitalizacaoAlt ? `hospitalizacaoAlt.contains=${hospitalizacaoAlt}&` : '';
  const migracaoDeEmpresaAltRequest = migracaoDeEmpresaAlt ? `migracaoDeEmpresaAlt.contains=${migracaoDeEmpresaAlt}&` : '';
  const obitoEmCasaAltRequest = obitoEmCasaAlt ? `obitoEmCasaAlt.contains=${obitoEmCasaAlt}&` : '';
  const terminoDeAtendimentoAltRequest = terminoDeAtendimentoAlt ? `terminoDeAtendimentoAlt.contains=${terminoDeAtendimentoAlt}&` : '';
  const atendimentoSuspensoAltRequest = atendimentoSuspensoAlt ? `atendimentoSuspensoAlt.contains=${atendimentoSuspensoAlt}&` : '';
  const monitorarAltRequest = monitorarAlt ? `monitorarAlt.contains=${monitorarAlt}&` : '';
  const pendenteAltRequest = pendenteAlt ? `pendenteAlt.contains=${pendenteAlt}&` : '';
  const eCommerceSegViagemRequest = eCommerceSegViagem ? `eCommerceSegViagem.contains=${eCommerceSegViagem}&` : '';
  const monitorarEcsvRequest = monitorarEcsv ? `monitorarEcsv.contains=${monitorarEcsv}&` : '';
  const pendenteEcsvRequest = pendenteEcsv ? `pendenteEcsv.contains=${pendenteEcsv}&` : '';
  const farmaciaRequest = farmacia ? `farmacia.contains=${farmacia}&` : '';
  const matMedFarmRequest = matMedFarm ? `matMedFarm.contains=${matMedFarm}&` : '';
  const receitaFarmRequest = receitaFarm ? `receitaFarm.contains=${receitaFarm}&` : '';
  const prontuarioFarmRequest = prontuarioFarm ? `prontuarioFarm.contains=${prontuarioFarm}&` : '';
  const romaneioManualFarmRequest = romaneioManualFarm ? `romaneioManualFarm.contains=${romaneioManualFarm}&` : '';
  const outrosFarmRequest = outrosFarm ? `outrosFarm.contains=${outrosFarm}&` : '';
  const monitorarFarmRequest = monitorarFarm ? `monitorarFarm.contains=${monitorarFarm}&` : '';
  const pendenteFarmRequest = pendenteFarm ? `pendenteFarm.contains=${pendenteFarm}&` : '';
  const contatoTelefonicoRequest = contatoTelefonico ? `contatoTelefonico.contains=${contatoTelefonico}&` : '';
  const ativoContTelRequest = ativoContTel ? `ativoContTel.contains=${ativoContTel}&` : '';
  const receptivoContTelRequest = receptivoContTel ? `receptivoContTel.contains=${receptivoContTel}&` : '';
  const monitorarContTelRequest = monitorarContTel ? `monitorarContTel.contains=${monitorarContTel}&` : '';
  const pendenteContTelRequest = pendenteContTel ? `pendenteContTel.contains=${pendenteContTel}&` : '';
  const dtPostRequest = dtPost ? `dtPost.contains=${dtPost}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEDIARIOTAGS_LIST,
    payload: axios.get<IPacienteDiarioTags>(
      `${requestUrl}${idPacienteDiarioRequest}${idDiarioTagsRequest}${escalaDePlantaoRequest}${captacaoEdpRequest}${implantacaoEdpRequest}${furoDeEscalaEdpRequest}${solicitacaoDeFolgaEdpRequest}${trocaDeProfissionalEdpRequest}${reclamacaoEdpRequest}${elogioEdpRequest}${recusaDeAtendimentoEdpRequest}${duplicidadeEdpRequest}${monitorarEdpRequest}${pendenteEdpRequest}${escalaMultiProfissionalRequest}${captacaoEmpRequest}${implantacaoEmpRequest}${solicitacaoDeFolgaEmpRequest}${trocaDeProfissionalEmpRequest}${reclamacaoEmpRequest}${elogioEmpRequest}${padIncompletoEmpRequest}${visitaImprodutivaEmpRequest}${monitorarEmpRequest}${pendenteEmpRequest}${intercorrenciaRequest}${clinicaInterRequest}${aphInterRequest}${pendenteInterRequest}${solicitacoesRequest}${recargaDeOxigenioSolicRequest}${equipamentosSolicRequest}${matmedSolicRequest}${prontuarioSolicRequest}${prescricoesSolicRequest}${examesSolicRequest}${ambulanciaSolicRequest}${atendimentoDeEquipeSolicRequest}${monitorarSolicRequest}${pendenteSolicRequest}${avaliacaoRequest}${residenciaAvalRequest}${hospitalAvalRequest}${monitorarAvalRequest}${captacaoAtivaAvalRequest}${pendenteAvalRequest}${implantacaoRequest}${monitorarImplRequest}${pendenteImplRequest}${altaRequest}${hospitalizacaoAltRequest}${migracaoDeEmpresaAltRequest}${obitoEmCasaAltRequest}${terminoDeAtendimentoAltRequest}${atendimentoSuspensoAltRequest}${monitorarAltRequest}${pendenteAltRequest}${eCommerceSegViagemRequest}${monitorarEcsvRequest}${pendenteEcsvRequest}${farmaciaRequest}${matMedFarmRequest}${receitaFarmRequest}${prontuarioFarmRequest}${romaneioManualFarmRequest}${outrosFarmRequest}${monitorarFarmRequest}${pendenteFarmRequest}${contatoTelefonicoRequest}${ativoContTelRequest}${receptivoContTelRequest}${monitorarContTelRequest}${pendenteContTelRequest}${dtPostRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IPacienteDiarioTags> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PACIENTEDIARIOTAGS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPacienteDiarioTags> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PACIENTEDIARIOTAGS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPacienteDiarioTags> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PACIENTEDIARIOTAGS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getPacienteDiarioTagsState = (location): IPacienteDiarioTagsBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idPacienteDiario = url.searchParams.get('idPacienteDiario') || '';
  const idDiarioTags = url.searchParams.get('idDiarioTags') || '';
  const escalaDePlantao = url.searchParams.get('escalaDePlantao') || '';
  const captacaoEdp = url.searchParams.get('captacaoEdp') || '';
  const implantacaoEdp = url.searchParams.get('implantacaoEdp') || '';
  const furoDeEscalaEdp = url.searchParams.get('furoDeEscalaEdp') || '';
  const solicitacaoDeFolgaEdp = url.searchParams.get('solicitacaoDeFolgaEdp') || '';
  const trocaDeProfissionalEdp = url.searchParams.get('trocaDeProfissionalEdp') || '';
  const reclamacaoEdp = url.searchParams.get('reclamacaoEdp') || '';
  const elogioEdp = url.searchParams.get('elogioEdp') || '';
  const recusaDeAtendimentoEdp = url.searchParams.get('recusaDeAtendimentoEdp') || '';
  const duplicidadeEdp = url.searchParams.get('duplicidadeEdp') || '';
  const monitorarEdp = url.searchParams.get('monitorarEdp') || '';
  const pendenteEdp = url.searchParams.get('pendenteEdp') || '';
  const escalaMultiProfissional = url.searchParams.get('escalaMultiProfissional') || '';
  const captacaoEmp = url.searchParams.get('captacaoEmp') || '';
  const implantacaoEmp = url.searchParams.get('implantacaoEmp') || '';
  const solicitacaoDeFolgaEmp = url.searchParams.get('solicitacaoDeFolgaEmp') || '';
  const trocaDeProfissionalEmp = url.searchParams.get('trocaDeProfissionalEmp') || '';
  const reclamacaoEmp = url.searchParams.get('reclamacaoEmp') || '';
  const elogioEmp = url.searchParams.get('elogioEmp') || '';
  const padIncompletoEmp = url.searchParams.get('padIncompletoEmp') || '';
  const visitaImprodutivaEmp = url.searchParams.get('visitaImprodutivaEmp') || '';
  const monitorarEmp = url.searchParams.get('monitorarEmp') || '';
  const pendenteEmp = url.searchParams.get('pendenteEmp') || '';
  const intercorrencia = url.searchParams.get('intercorrencia') || '';
  const clinicaInter = url.searchParams.get('clinicaInter') || '';
  const aphInter = url.searchParams.get('aphInter') || '';
  const pendenteInter = url.searchParams.get('pendenteInter') || '';
  const solicitacoes = url.searchParams.get('solicitacoes') || '';
  const recargaDeOxigenioSolic = url.searchParams.get('recargaDeOxigenioSolic') || '';
  const equipamentosSolic = url.searchParams.get('equipamentosSolic') || '';
  const matmedSolic = url.searchParams.get('matmedSolic') || '';
  const prontuarioSolic = url.searchParams.get('prontuarioSolic') || '';
  const prescricoesSolic = url.searchParams.get('prescricoesSolic') || '';
  const examesSolic = url.searchParams.get('examesSolic') || '';
  const ambulanciaSolic = url.searchParams.get('ambulanciaSolic') || '';
  const atendimentoDeEquipeSolic = url.searchParams.get('atendimentoDeEquipeSolic') || '';
  const monitorarSolic = url.searchParams.get('monitorarSolic') || '';
  const pendenteSolic = url.searchParams.get('pendenteSolic') || '';
  const avaliacao = url.searchParams.get('avaliacao') || '';
  const residenciaAval = url.searchParams.get('residenciaAval') || '';
  const hospitalAval = url.searchParams.get('hospitalAval') || '';
  const monitorarAval = url.searchParams.get('monitorarAval') || '';
  const captacaoAtivaAval = url.searchParams.get('captacaoAtivaAval') || '';
  const pendenteAval = url.searchParams.get('pendenteAval') || '';
  const implantacao = url.searchParams.get('implantacao') || '';
  const monitorarImpl = url.searchParams.get('monitorarImpl') || '';
  const pendenteImpl = url.searchParams.get('pendenteImpl') || '';
  const alta = url.searchParams.get('alta') || '';
  const hospitalizacaoAlt = url.searchParams.get('hospitalizacaoAlt') || '';
  const migracaoDeEmpresaAlt = url.searchParams.get('migracaoDeEmpresaAlt') || '';
  const obitoEmCasaAlt = url.searchParams.get('obitoEmCasaAlt') || '';
  const terminoDeAtendimentoAlt = url.searchParams.get('terminoDeAtendimentoAlt') || '';
  const atendimentoSuspensoAlt = url.searchParams.get('atendimentoSuspensoAlt') || '';
  const monitorarAlt = url.searchParams.get('monitorarAlt') || '';
  const pendenteAlt = url.searchParams.get('pendenteAlt') || '';
  const eCommerceSegViagem = url.searchParams.get('eCommerceSegViagem') || '';
  const monitorarEcsv = url.searchParams.get('monitorarEcsv') || '';
  const pendenteEcsv = url.searchParams.get('pendenteEcsv') || '';
  const farmacia = url.searchParams.get('farmacia') || '';
  const matMedFarm = url.searchParams.get('matMedFarm') || '';
  const receitaFarm = url.searchParams.get('receitaFarm') || '';
  const prontuarioFarm = url.searchParams.get('prontuarioFarm') || '';
  const romaneioManualFarm = url.searchParams.get('romaneioManualFarm') || '';
  const outrosFarm = url.searchParams.get('outrosFarm') || '';
  const monitorarFarm = url.searchParams.get('monitorarFarm') || '';
  const pendenteFarm = url.searchParams.get('pendenteFarm') || '';
  const contatoTelefonico = url.searchParams.get('contatoTelefonico') || '';
  const ativoContTel = url.searchParams.get('ativoContTel') || '';
  const receptivoContTel = url.searchParams.get('receptivoContTel') || '';
  const monitorarContTel = url.searchParams.get('monitorarContTel') || '';
  const pendenteContTel = url.searchParams.get('pendenteContTel') || '';
  const dtPost = url.searchParams.get('dtPost') || '';

  return {
    baseFilters,
    idPacienteDiario,
    idDiarioTags,
    escalaDePlantao,
    captacaoEdp,
    implantacaoEdp,
    furoDeEscalaEdp,
    solicitacaoDeFolgaEdp,
    trocaDeProfissionalEdp,
    reclamacaoEdp,
    elogioEdp,
    recusaDeAtendimentoEdp,
    duplicidadeEdp,
    monitorarEdp,
    pendenteEdp,
    escalaMultiProfissional,
    captacaoEmp,
    implantacaoEmp,
    solicitacaoDeFolgaEmp,
    trocaDeProfissionalEmp,
    reclamacaoEmp,
    elogioEmp,
    padIncompletoEmp,
    visitaImprodutivaEmp,
    monitorarEmp,
    pendenteEmp,
    intercorrencia,
    clinicaInter,
    aphInter,
    pendenteInter,
    solicitacoes,
    recargaDeOxigenioSolic,
    equipamentosSolic,
    matmedSolic,
    prontuarioSolic,
    prescricoesSolic,
    examesSolic,
    ambulanciaSolic,
    atendimentoDeEquipeSolic,
    monitorarSolic,
    pendenteSolic,
    avaliacao,
    residenciaAval,
    hospitalAval,
    monitorarAval,
    captacaoAtivaAval,
    pendenteAval,
    implantacao,
    monitorarImpl,
    pendenteImpl,
    alta,
    hospitalizacaoAlt,
    migracaoDeEmpresaAlt,
    obitoEmCasaAlt,
    terminoDeAtendimentoAlt,
    atendimentoSuspensoAlt,
    monitorarAlt,
    pendenteAlt,
    eCommerceSegViagem,
    monitorarEcsv,
    pendenteEcsv,
    farmacia,
    matMedFarm,
    receitaFarm,
    prontuarioFarm,
    romaneioManualFarm,
    outrosFarm,
    monitorarFarm,
    pendenteFarm,
    contatoTelefonico,
    ativoContTel,
    receptivoContTel,
    monitorarContTel,
    pendenteContTel,
    dtPost
  };
};
