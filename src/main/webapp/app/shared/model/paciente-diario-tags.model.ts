import { Moment } from 'moment';

export interface IPacienteDiarioTags {
  id?: string;
  idPacienteDiario?: number;
  idDiarioTags?: number;
  escalaDePlantao?: number;
  captacaoEdp?: number;
  implantacaoEdp?: number;
  furoDeEscalaEdp?: number;
  solicitacaoDeFolgaEdp?: number;
  trocaDeProfissionalEdp?: number;
  reclamacaoEdp?: number;
  elogioEdp?: number;
  recusaDeAtendimentoEdp?: number;
  duplicidadeEdp?: number;
  monitorarEdp?: number;
  pendenteEdp?: number;
  escalaMultiProfissional?: number;
  captacaoEmp?: number;
  implantacaoEmp?: number;
  solicitacaoDeFolgaEmp?: number;
  trocaDeProfissionalEmp?: number;
  reclamacaoEmp?: number;
  elogioEmp?: number;
  padIncompletoEmp?: number;
  visitaImprodutivaEmp?: number;
  monitorarEmp?: number;
  pendenteEmp?: number;
  intercorrencia?: number;
  clinicaInter?: number;
  aphInter?: number;
  pendenteInter?: number;
  solicitacoes?: number;
  recargaDeOxigenioSolic?: number;
  equipamentosSolic?: number;
  matmedSolic?: number;
  prontuarioSolic?: number;
  prescricoesSolic?: number;
  examesSolic?: number;
  ambulanciaSolic?: number;
  atendimentoDeEquipeSolic?: number;
  monitorarSolic?: number;
  pendenteSolic?: number;
  avaliacao?: number;
  residenciaAval?: number;
  hospitalAval?: number;
  monitorarAval?: number;
  captacaoAtivaAval?: number;
  pendenteAval?: number;
  implantacao?: number;
  monitorarImpl?: number;
  pendenteImpl?: number;
  alta?: number;
  hospitalizacaoAlt?: number;
  migracaoDeEmpresaAlt?: number;
  obitoEmCasaAlt?: number;
  terminoDeAtendimentoAlt?: number;
  atendimentoSuspensoAlt?: number;
  monitorarAlt?: number;
  pendenteAlt?: number;
  eCommerceSegViagem?: number;
  monitorarEcsv?: number;
  pendenteEcsv?: number;
  farmacia?: number;
  matMedFarm?: number;
  receitaFarm?: number;
  prontuarioFarm?: number;
  romaneioManualFarm?: number;
  outrosFarm?: number;
  monitorarFarm?: number;
  pendenteFarm?: number;
  contatoTelefonico?: number;
  ativoContTel?: number;
  receptivoContTel?: number;
  monitorarContTel?: number;
  pendenteContTel?: number;
  dtPost?: Moment;
}

export const defaultValue: Readonly<IPacienteDiarioTags> = {};
